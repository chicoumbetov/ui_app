/**
 * Context User, implemente les fonctions basique du user
 *
 * @author:
 */

import React from 'react';
import { Auth, DataStore, API } from 'aws-amplify';

export enum Permissions {
  Lead,
  Client,
  Notification,
}

type UserContextProps = {
  user?: any;
  loadingUser?: boolean;
  login?: (email: string, motDePasse: string) => Promise<any>;
  logout?: () => Promise<any>;
  changeMotDePasse?: (motDePasse: string) => Promise<any>;
  forgottenMotDePasse?: (email: string) => Promise<any>;
  userCan: (permission: Permissions) => boolean;
  forgotMotDePasseSubmit?: (email: string, code: string, motDePasse: string) => Promise<any>;
  signUp?: (
    nom: string,
    prenom: string,
    email: AWSEmail,
    motDePasse: string,
    numeroTel: string,
    groups: PermissionMappingType
  ) => Promise<any>;
};

export const UserContext = React.createContext<UserContextProps>({
  userCan: () => false,
});

export const UserProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [user, setUser] = React.useState(null);
  const [allowedScreen, setAllowedScreen] = React.useState<Permissions[]>([]);
  const [loadingUser, setLoadingUser] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setScreenAllowed(user);
        setUser(user);
        setLoadingUser(false);
      } catch (error) {
        console.log(error);
        setUser(null);
        setLoadingUser(false);
      }
    })();
  }, []);

  const login = async (email: string, motDePasse: string) => {
    const cognitoUser = await Auth.signIn(email, motDePasse);
    setScreenAllowed(cognitoUser);
    setUser(cognitoUser);
  };

  const setScreenAllowed = async (cognitoUser: any) => {
    const tab: Permissions[] = [];
    cognitoUser?.signInUserSession.idToken.payload['cognito:groups'].map(
      // eslint-disable-next-line array-callback-return
      (value: PermissionMappingType) => {
        // eslint-disable-next-line array-callback-return
        permissionMapping[value].screenAllowed.map((value1) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          tab.indexOf(value1) === -1 && tab.push(value1);
        });
      },
    );
    setAllowedScreen(tab);
  };

  const logout = async () => {
    await DataStore.clear();
    await Auth.signOut();
    setUser(null);
  };

  const signUp = async (
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    numeroTel: string,
    group: PermissionMappingType,
  ) => {
    const { user } = await Auth.signUp({
      nom,
      prenom,
      email,
      motDePasse,
      numeroTel,
      attributes: {
        // optional - E.164 number convention
        optIn,
        // other custom attributes
        avatarUri,
        dateNaissance,
        abonnement,
      },
    });

    const apiName = 'AdminQueries';
    const path = '/addUserToGroup';
    await Promise.all(
      permissionMapping[group].permissions.map(async (v) => {
        const myInit = {
          body: {
            nom,
            groupname: v,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
          },
        };
        await API.post(apiName, path, myInit);
      }),
    );
    return user;
  };

  const changeMotDePasse = (motDePasse: string) => Auth.completeNewPassword(user, motDePasse);

  const forgottenMotDePasse = (email: string) => Auth.forgotPassword(email);

  // eslint-disable-next-line max-len
  const forgotMotDePasseSubmit = (email: string, code: string, motDePasse: string) => Auth.forgotPasswordSubmit(email, code, motDePasse);

  const userCan = (permission: Permissions) => allowedScreen.indexOf(permission) !== -1;
  const values = React.useMemo(
    () => ({
      user,
      loadingUser,
      login,
      logout,
      signUp,
      changeMotDePasse,
      userCan,
      forgottenMotDePasse,
      forgotMotDePasseSubmit,
    }),
    [user, loadingUser],
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
type MappedPermission = {
  label: string;
  permissions: string[];
  screenAllowed: Permissions[];
};

interface PermissionMappingInterface {
  administration: MappedPermission;
  client: MappedPermission;
}

export const permissionMapping: PermissionMappingInterface = {
  administration: {
    label: 'Administration',
    permissions: ['client', 'administration'],
    screenAllowed: [
      Permissions.Client,
    ],
  },
  client: {
    label: 'Client',
    permissions: ['client'],
    screenAllowed: [Permissions.Client],
  },
};

export type PermissionMappingType = keyof PermissionMappingInterface;

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('`useUser` hook must be used within a `UserProvider` component');
  }
  return context;
};
