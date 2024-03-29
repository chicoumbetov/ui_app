import React, {
  createContext,
  useContext,
  useEffect,
  useMemo, useRef,
  useState,
} from 'react';

import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { HubCapsule } from 'aws-amplify-react-native/types';
import PropTypes from 'prop-types';
import { useApolloClient, useLazyQuery } from 'react-apollo';
import { gql } from 'graphql-tag';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FetchResult } from 'apollo-link';
import _ from 'lodash';
import {
  CreateUserInput,
  CreateUserMutation,
  CreateUserMutationVariables, GetUserQueryVariables,
  GetUserQuery,
  SubscriptionType, UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../API';
import * as mutations from '../graphql/mutations';
import { removeKey, removeNull } from '../../utils/ObjectHelper';
import { getUser } from '../graphql/queries';
import { onUpdateUser } from '../graphql/subscriptions';

type SimpleCreateUserInput = Omit<CreateUserInput, 'lastname' | 'firstname'>;
type SimpleUpdateUserInput = Omit<UpdateUserInput, 'id'>;

export type UserItem = {
  __typename: 'User',
  id: string,
  lastname?: string | null,
  firstname?: string | null,
  avatarUri?: string | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  email?: string | null,
  privateProfile?: {
    __typename: 'ProfileInfo',
    phoneNumber?: string | null,
    optIn?: boolean | null,
    address?: {
      __typename: 'Address',
      address: string,
      additionalAddress?: string | null,
      postalCode: string,
      city: string,
      country: string,
    } | null,
    birthDate?: string | null,
    notificationParams?: {
      __typename: 'NotificationParams',
      echeanceFacture?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      loyer?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      debitBancaire?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      creditBancaire?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      soldeNegatif?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      retardLoyer?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      mauvaiseRenta?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
      autre?: {
        __typename: 'NotificationParam',
        push?: boolean | null,
        email?: boolean | null,
      } | null,
    } | null,
    notificationLastSeenAt?: string | null,
  } | null,
  expoToken?: Array< string > | null,
  biUser?: string | null,
  biToken?: string | null,
};

export interface CognitoUserInterface {
  Session?: string | null;
  authenticationFlowType?: string;
  client?: {
    endpoint?: string;
    userAgent?: string;
  };
  keyPrefix?: string;
  pool?: {
    advancedSecurityDataCollectionFlag?: boolean;
    clientId?: string;
    userPoolId?: string;
  };
  username?: string;
  userConfirmed?: boolean;
  userSub?: string;
  challengeName: string;
  challengeParam: { [key: string]: any };
  unverified?: {
    email?: string;
    phone_number?: string;
  };
  [attributes: string]: any;
}

type UserContextProps = {
  user: UserItem;
  cognitoUser: CognitoUserInterface;
  userIsLoading: boolean;
  userIsCreating: boolean;
  updateUser: (inputVars: SimpleUpdateUserInput) =>
  Promise<FetchResult<UpdateUserMutation>>;
  createUser: (inputVars: SimpleCreateUserInput) =>
  Promise<FetchResult<CreateUserMutation>>;
};

const UserContext = createContext<Partial<UserContextProps>>({});

const getUserAuthenticatedAST = gql(getUser);

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserItem | undefined>();
  const unsubscribe = useRef(() => {});
  const [getUserFromDataBase, { subscribeToMore, refetch }] = useLazyQuery<
  GetUserQuery,
  GetUserQueryVariables
  >(
    getUserAuthenticatedAST,
    {
      onCompleted: (data) => {
        console.log(`data${data}`);
        setUser(data?.getUser || undefined);
        if (loading) {
          // on vient de se reconnecter, donc il faut relancer la souscription
          setRefresh(!refresh);
        }
        setLoading(false);
      },
      fetchPolicy: 'network-only',
    },
  );
  const [cognitoUser, setCognitoUser] = useState<CognitoUserInterface | undefined>();
  const [loading, setLoading] = useState(true);
  const [userIsCreating, setUserIsCreating] = useState(false);
  const client = useApolloClient();

  const currentUser = async () => {
    console.log('loading current user');
    try {
      setLoading(true);
      const authUser = await Auth.currentAuthenticatedUser();
      setCognitoUser(authUser);
      getUserFromDataBase({ variables: { id: authUser.attributes.sub } });
      setRefresh(!refresh);
      if (authUser?.attributes.given_name) {
        AsyncStorage.setItem('lastFirstname', authUser?.attributes.given_name);
      }
      authUser.getCachedDeviceKeyAndPassword();
      const stayConnected = await AsyncStorage.getItem('stayConnected');
      if (stayConnected === 'true') {
        authUser.setDeviceStatusRemembered({
          onSuccess: () => {},
          onFailure: () => {},
        });
      } else {
        authUser.setDeviceStatusNotRemembered({
          onSuccess: () => {},
          onFailure: () => {},
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setUser(undefined);
      setCognitoUser(undefined);
    }
  };

  const authListener = ({ payload: { event } }: HubCapsule) => {
    switch (event) {
      case 'signIn':
        currentUser();
        break;
      case 'signOut':
        setLoading(true);
        setUser(undefined);
        setCognitoUser(undefined);
        unsubscribe.current();
        client.clearStore();
        /* if (Platform.OS === 'web') {
          // hack pour couper le websocket car je n'ai rien trouvé d'autre
          document.location.reload();
        } */
        setLoading(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    currentUser();
    const listener = Hub.listen('auth', authListener);
    return () => listener();
  }, []);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let unsubscribeLocaly = () => {};
    if (user?.id) {
      unsubscribeLocaly = subscribeToMore({
        document: gql(onUpdateUser),
        variables: { id: user.id },
        updateQuery: (prev) => {
          // on doit refetch, car les champs ne sont pas tous accessibles
          console.log(prev);
          refetch({ id: cognitoUser?.attributes.sub });
          return prev;
        },
        onError: (e) => {
          console.log(e);
          setRefresh(!refresh);
        },
      });
      unsubscribe.current = unsubscribeLocaly;
    }

    return () => {
      if (unsubscribeLocaly) {
        unsubscribeLocaly();
      }
    };
  }, [refresh]);

  const values = useMemo(() => {
    const createUser = (inputVars: SimpleCreateUserInput) => {
      const finalInputVars = {
        id: cognitoUser?.attributes.sub,
        lastname: cognitoUser?.attributes.family_name,
        firstname: cognitoUser?.attributes.given_name,
        email: cognitoUser?.attributes.email,
        privateProfile: {
          phoneNumber: cognitoUser?.attributes.phone_number,
          optIn: cognitoUser?.attributes['custom:optIn'] === 'true',
        },
      };
      _.merge(finalInputVars, inputVars);

      setUserIsCreating(true);
      return client.mutate<
      CreateUserMutation,
      CreateUserMutationVariables
      >({
        mutation: gql(mutations.createUser),
        // @ts-ignore
        optimisticResponse: (vars) => ({
          createUser: {
            __typename: 'User',
            id: cognitoUser?.attributes.sub,
            ...user,
            ...vars.input,
            // eslint-disable-next-line no-underscore-dangle
            _version: (vars.input?._version ?? 0) + 1,
          },
        }),
        variables: {
          input: finalInputVars,
        },
        update: () => {
          getUserFromDataBase({ variables: { id: cognitoUser?.attributes.sub } });
        },
      });
    };

    const updateUser = (inputVars: SimpleUpdateUserInput) => {
      if (user) {
        console.log(removeKey(_.merge(user,
          inputVars), ['_deleted', '_lastChangedAt', 'createdAt', 'updatedAt', '__typename', '_version']));
        return client.mutate<
        UpdateUserMutation,
        UpdateUserMutationVariables
        >({
          mutation: gql(mutations.updateUser),
          // @ts-ignore
          optimisticResponse: (vars) => ({
            updateUser: _.merge(user, {
              ...vars.input,
              // eslint-disable-next-line no-underscore-dangle
              _version: (vars.input?._version ?? 0) + 1,
            }),
          }),
          variables: {
            input: {
              ...(removeKey(_.merge(user,
                inputVars), ['_deleted', '_lastChangedAt', 'createdAt', 'updatedAt', '__typename', '_version'])),
              // eslint-disable-next-line no-underscore-dangle
              _version: user._version,
            },
          },
          update: (cache, { data: mutationData }) => {
            console.log(mutationData);
            setUserIsCreating(false);
            if (mutationData) {
              const { updateUser: mutationUpdateUser } = mutationData;
              if (mutationUpdateUser) {
                // Read query from cache
                const cacheData = cache.readQuery<GetUserQuery,
                GetUserQueryVariables>({
                  query: getUserAuthenticatedAST,
                  variables: {
                    id: cognitoUser?.attributes.sub,
                  },
                });

                // Add newly created item to the cache copy
                if (cacheData && cacheData.getUser) {
                  cacheData.getUser = _.merge(user, {
                    // eslint-disable-next-line no-underscore-dangle
                    _version: mutationUpdateUser._version + 1,
                    ...inputVars,
                    ...(removeNull(mutationUpdateUser) as UpdateUserMutation),
                  });

                  // Overwrite the cache with the new results
                  cache.writeQuery({
                    query: getUserAuthenticatedAST,
                    variables: {
                      id: cognitoUser?.attributes.sub,
                    },
                    data: cacheData,
                  });
                }
              }
            }
          },
        });
      }
      throw new Error("User doesn't exist, cannot be updated");
    };

    return {
      user,
      cognitoUser,
      userIsLoading: loading,
      updateUser,
      createUser,
      userIsCreating,
    };
  }, [user, loading, cognitoUser, userIsCreating]);

  return (
    <UserContext.Provider
      value={values}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export { useUser, UserContext, UserProvider };
