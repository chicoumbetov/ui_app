import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { DocumentNode } from 'apollo-link';

import { WatchQueryFetchPolicy } from 'apollo-client/core/watchQueryOptions';
import { useMemo } from 'react';
import moment from 'moment';
import {
  BankAccount, BankMovementStatus, BudgetLineDeadline,
  BudgetLineType,
  CompanyType,
  CreateRealEstateMutation,
  CreateRealEstateMutationVariables,
  DeleteRealEstateMutation,
  DeleteRealEstateMutationVariables,
  Frequency,
  GetRealEstateQueryVariables, InvitationType,
  ListRealEstatesQueryVariables, MortgageLoanDeadlineInfo,
  RealEstate,
  RealEstateType, RentalType,
  TaxType,
  UpdateRealEstateMutation,
  UpdateRealEstateMutationVariables,
} from '../API';
import * as mutations from '../graphql/mutations';

export type RealEstateItem = {
  __typename: 'RealEstate',
  id: string,
  name: string,
  iconUri: string,
  purchaseYear?: number | null,
  type?: RealEstateType | null,
  ownName?: boolean | null,
  company?: CompanyType | null,
  address?: {
    __typename: 'Address',
    address: string,
    additionalAddress?: string | null,
    postalCode: string,
    city: string,
    country: string,
  } | null,
  detentionPart?: number | null,
  typeImpot?: TaxType | null,
  purchasePrice?: number| null,
  notaryFee?: number| null,
  admins: Array< string >,
  shared?: Array< string > | null,
  tenants?: Array< {
    __typename: 'TenantInfo',
    id: string,
    amount: number,
    lastname: string,
    firstname: string,
    rentalType?: RentalType | null,
    email: string,
    startDate: string,
    endDate?: string | null,
  } | null > | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  pendingInvitations?: {
    __typename: 'ModelPendingInvitationConnection',
    items?: Array< {
      __typename: 'PendingInvitation',
      id: string,
      realEstateId: string,
      email: string,
      type: InvitationType,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
  documents?: {
    __typename: 'ModelDocumentConnection',
    items?: Array< {
      __typename: 'Document',
      id: string,
      realEstateId: string,
      name: string,
      key?: string | null,
      s3file: string,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
  budgetLines?: {
    __typename: 'ModelBudgetLineConnection',
    items?: Array< {
      __typename: 'BudgetLine',
      id: string,
      realEstateId: string,
      type: BudgetLineType,
      category: string,
      amount: number,
      rentalCharges?: number | null,
      managementFees?: number | null,
      householdWaste?: number | null,
      frequency: Frequency,
      nextDueDate: string,
      tenantId?: string | null,
      rentalType?: RentalType | null,
      infoCredit?: {
        __typename: 'MortgageLoanInfo',
        borrowedCapital: number,
        loanStartDate?: string | null,
        duration?: number | null,
        interestRate?: number | null,
        assuranceRate?: number | null,
        amortizationTable?: Array< {
          __typename: 'AmortizationTable',
          dueDate?: string | null,
          amount?: number | null,
          interest?: number | null,
          assurance?: number | null,
          amortizedCapital?: number | null,
        } | null > | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
  budgetLineDeadlines?: {
    __typename: 'ModelBudgetLineDeadlineConnection',
    items?: Array< {
      __typename: 'BudgetLineDeadline',
      id: string,
      realEstateId: string,
      bankMouvementId?: string | null,
      budgetLineId: string,
      type: BudgetLineType,
      category: string,
      amount: number,
      rentalCharges?: number | null,
      managementFees?: number | null,
      householdWaste?: number | null,
      rentalType?: RentalType | null,
      frequency: Frequency,
      infoCredit?: MortgageLoanDeadlineInfo | null,
      date?: string | null,
      tenantId?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
  bankAccounts?: {
    __typename: 'ModelRealEstateBankAccountConnection',
    items?: Array< {
      __typename: 'RealEstateBankAccount',
      id: string,
      realEstateId: string,
      bankAccountId: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      bankAccount: BankAccount,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
  bankMovements?: {
    __typename: 'ModelBankMovementConnection',
    items?: Array< {
      __typename: 'BankMovement',
      id: string,
      bankAccountId: string,
      realEstateId?: string | null,
      biId: number,
      description?: string | null,
      amount: number,
      status?: BankMovementStatus | null,
      date?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
} | null;

export type GetRealEstateQuery = {
  getRealEstate?: RealEstateItem
};

export type ListRealEstatesQuery = {
  listRealEstates?: {
    __typename: 'ModelRealEstateConnection',
    items?: Array< RealEstateItem > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export const getRealEstateQuery = <DocumentNode>gql(`
  query GetRealEstate($id: ID!) {
    getRealEstate(id: $id) {
      id
      name
      iconUri
      purchaseYear
      type
      ownName
      company
      detentionPart
      typeImpot
      purchasePrice
      notaryFee
      admins
      shared
      address {
        address
        additionalAddress
        postalCode
        city
        country
      }
      tenants {
        id
        amount
        lastname
        firstname
        rentalType
        email
        startDate
        endDate
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      pendingInvitations {
        items {
          id
          realEstateId
          email
          type
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      documents(sortDirection: DESC) {
        items {
          id
          realEstateId
          name
          key
          s3file
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      budgetLines(sortDirection: ASC) {
        items {
          id
          realEstateId
          type
          category
          amount
          rentalCharges
          managementFees
          householdWaste
          frequency
          nextDueDate
          tenantId
          rentalType
          infoCredit {
            borrowedCapital
            loanStartDate
            duration
            interestRate
            assuranceRate
            amortizationTable {
              dueDate
              amount
              interest
              assurance
              amortizedCapital
            }
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      budgetLineDeadlines(sortDirection: DESC, limit:1000) {
        items {
          id
          realEstateId
          bankMouvementId
          budgetLineId
          type
          category
          amount
          rentalCharges
          rentalType
          managementFees
          householdWaste
          frequency
          date
          infoCredit {
            amount
            interest
            assurance
          }
          tenantId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          bankMouvement {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            status
            date
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
        }
        nextToken
        startedAt
      }
      bankAccounts {
        items {
          id
          realEstateId
          bankAccountId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          bankAccount {
            id
            bank
            accountOwner
            name
            iban
            bic
            balance
            biId
            biConnectionId
            biState
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
        }
        nextToken
        startedAt
      }
      bankMovements(sortDirection: DESC) {
        items {
          id
          bankAccountId
          realEstateId
          biId
          description
          amount
          status
          date
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }`);

const listRealEstatesQuery = <DocumentNode>gql(`query ListRealEstates(
    $filter: ModelRealEstateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRealEstates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        iconUri
        purchaseYear
        type
        ownName
        company
        detentionPart
        typeImpot
        purchasePrice
        notaryFee
        admins
        shared
        address {
          address
          additionalAddress
          postalCode
          city
          country
        }
        tenants {
          id
          amount
          lastname
          firstname
          rentalType
          email
          startDate
          endDate
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        pendingInvitations {
          items {
            id
            realEstateId
            email
            type
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
        documents(sortDirection: DESC) {
          items {
            id
            realEstateId
            name
            key
            s3file
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
        budgetLines(sortDirection: ASC) {
          items {
            id
            realEstateId
            type
            category
            amount
            rentalCharges
            managementFees
            householdWaste
            frequency
            nextDueDate
            tenantId
            rentalType
            infoCredit {
              borrowedCapital
              loanStartDate
              duration
              interestRate
              assuranceRate
              amortizationTable {
                dueDate
                amount
                interest
                assurance
                amortizedCapital
              }
            }
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
        budgetLineDeadlines(sortDirection: DESC, limit:1000) {
          items {
            id
            realEstateId
            bankMouvementId
            budgetLineId
            type
            category
            amount
            rentalCharges
            rentalType
            managementFees
            householdWaste
            frequency
            date
            infoCredit {
              amount
              interest
              assurance
            }
            tenantId
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            bankMouvement {
              id
              bankAccountId
              realEstateId
              biId
              description
              amount
              status
              date
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
          }
          nextToken
          startedAt
        }
        bankAccounts {
          items {
            id
            realEstateId
            bankAccountId
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            bankAccount {
              id
              bank
              accountOwner
              name
              iban
              bic
              balance
              biId
              biConnectionId
              biState
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
          }
          nextToken
          startedAt
        }
        bankMovements(sortDirection: DESC) {
          items {
            id
            bankAccountId
            realEstateId
            biId
            description
            amount
            status
            date
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`);

export function useRealEstateList(fetchPolicy: WatchQueryFetchPolicy = 'cache-first') {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<ListRealEstatesQuery, ListRealEstatesQueryVariables>(listRealEstatesQuery, {
    fetchPolicy,
  });
  /* const { user } = useUser();

  useEffect(() => {
    let unsubscribe = () => {};
    if (user?.id) {
      const subscribe = () => subscribeToMore<OnCreateRealEstateSubscription,
      OnCreateRealEstateSubscriptionVariables>({
        document: gql(subscriptions.onCreateRealEstate),
        variables: {
          admins: user?.id,
        },
        fetchPolicy: 'cache-and-network',
        /* updateQuery: (prev, { subscriptionData }) => {
          console.log(prev);
          console.log(subscriptionData);
        }, *
      });
      unsubscribe = subscribe();
    }
    return () => {
      unsubscribe();
    };
  }, [user]);
  useEffect(() => {
    let unsubscribe = () => {};
    if (user?.id) {
      const subscribe = () => subscribeToMore<OnUpdateRealEstateSubscription,
      OnUpdateRealEstateSubscriptionVariables>({
        document: gql(subscriptions.onUpdateRealEstate),
        variables: {
          admins: user?.id,
        },
        fetchPolicy: 'cache-and-network',
        updateQuery: (prev, { subscriptionData }) => {
          console.log(prev);
          console.log(subscriptionData);
        },
      });
      unsubscribe = subscribe();
    }
    return () => {
      unsubscribe();
    };
  }, [user]); */
  return {
    loading, data, fetchMore, refetch,
  };
}

export function useCreateRealEstateMutation() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [createRealEstate, { loading: mutationLoading }] = useMutation<
  CreateRealEstateMutation,
  CreateRealEstateMutationVariables
  >(gql(mutations.createRealEstate), {
    update: (cache, { data: mutationData }) => {
      if (mutationData) {
        const { createRealEstate: newData } = mutationData;
        if (newData) {
          // Read query from cache
          const cacheData = cache.readQuery<
          ListRealEstatesQuery,
          ListRealEstatesQueryVariables>({
            query: listRealEstatesQuery,
          });

          // Add newly created item to the cache copy
          if (cacheData && cacheData.listRealEstates
              && cacheData.listRealEstates.items) {
            cacheData.listRealEstates.items.push(newData);

            // Overwrite the cache with the new results
            cache.writeQuery<
            ListRealEstatesQuery,
            ListRealEstatesQueryVariables>({
              query: listRealEstatesQuery,
              data: cacheData,
            });
          }
        }
      }
    },
  });
  return { createRealEstate, mutationLoading };
}

export function useUpdateRealEstateMutation() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [updateRealEstate, { loading: mutationLoading }] = useMutation<UpdateRealEstateMutation,
  UpdateRealEstateMutationVariables>(gql(mutations.updateRealEstate), {
    update: (cache, { data: mutationData }) => {
      if (mutationData) {
        const { updateRealEstate: newData } = mutationData;
        if (newData) {
          // Read query from cache
          const cacheData = cache.readQuery<GetRealEstateQuery, GetRealEstateQueryVariables>({
            query: getRealEstateQuery,
            variables: {
              id: newData.id,
            },
          });

          // Add newly created item to the cache copy
          if (cacheData && cacheData.getRealEstate) {
            cacheData.getRealEstate = newData;

            // Overwrite the cache with the new results
            cache.writeQuery<GetRealEstateQuery, GetRealEstateQueryVariables>({
              query: getRealEstateQuery,
              variables: {
                id: newData.id,
              },
              data: cacheData,
            });
          }
        }
      }
    },
  });
  return { updateRealEstate, mutationLoading };
}

export function useGetRealEstate(id: string, fetchPolicy: WatchQueryFetchPolicy = 'cache-first') {
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<GetRealEstateQuery, GetRealEstateQueryVariables>(getRealEstateQuery, {
    variables: {
      id,
    },
    fetchPolicy,
  });

  return {
    loading, bienget: <RealEstate>data?.getRealEstate, fetchMore, refetch,
  };
}

export function useDeleteRealEstateMutation() {
  const [deleteRealEstate] = useMutation<DeleteRealEstateMutation,
  DeleteRealEstateMutationVariables>(gql(mutations.deleteBudgetLine));
  return deleteRealEstate;
}

export function useRentability(
  budgetLineDeadlines: (BudgetLineDeadline | null)[] | null | undefined,
  totalPrice: number,
) {
  const { totalExpenses, totalIncomes } = useMemo(() => {
    const currentYear = new Date().getFullYear();

    const startDate = new Date();
    startDate.setFullYear(currentYear - 1);
    const endDate = new Date();
    // budgetLineDeadlines of last 12 months
    const result2 = budgetLineDeadlines?.filter((o) => moment(o?.date, 'YYYY-MM-DD')
      .isBetween(moment(startDate), moment(endDate), undefined, '[]'));

    /**
     *
     *
     * EXPENSE calculations for rentability
     *
     *
     */
    const usedExpenseCategories = [
      'assurance',
      'charges_copropriete',
      'frais_de_gestion',
      'frais_comptable',
      'frais_dpe',
      'remuneration_autre',
      'taxes_foncieres',
      'assurance_bien',
      'loyer_impaye',
      'mensualite_credit',
      'vacances_locatives',
    ];

    const expenses = result2?.filter((u) => {
      if (u && u.type === BudgetLineType.Expense
          // eslint-disable-next-line no-underscore-dangle
          && !u._deleted
          // check if current item is one of category in usedExpenseCategories
          && usedExpenseCategories.indexOf(u.category) > -1
          // && u.bankMouvementId
      ) {
        return true;
      }
      return false;
    });

    const allExpensesByCategory : {
      [key: string]: { count: number, total: number, freqExpense:number }
    } = {};

    /**
     *
     *
     * INCOME calculations for rentability
     *
     *
     */
    const usedIncomeCategories = [
      'loyer',
      'caf',
    ];

    const incomes = result2?.filter((u) => {
      if (u && u.type === BudgetLineType.Income
          // eslint-disable-next-line no-underscore-dangle
          && !u._deleted
          // check if current item is loyer or caf
          && usedIncomeCategories.indexOf(u.category) > -1
          && u.bankMouvementId
      ) {
        return true;
      }
      return false;
    });

    const allIncomesByCategory : {
      [key: string]: { count: number, total: number, freqIncome:number }
    } = {};

    if (incomes) {
      incomes.forEach((item) => {
        if (item) {
          /** If any expense doesnt exist */
          if (allIncomesByCategory[item?.category] === undefined) {
            /**
             * initial values and then calculate percentage starting from 0
             */
            let freqIncome = 12;
            switch (item?.frequency) {
              case 'quarterly':
                freqIncome = 4;
                break;
              case 'biannually':
                freqIncome = 2;
                break;
              case 'annual':
                freqIncome = 1;
                break;
              default:
                break;
            }
            allIncomesByCategory[item?.category] = {
              total: item?.amount - (item?.category === 'loyer' ? ((item?.managementFees || 0) + (item?.rentalCharges || 0)) : 0) || 0,
              count: 1,
              freqIncome,
            };
          } else {
            /** else If any expense exist then we add to allCurrentCategories variable */
            allIncomesByCategory[item?.category].total += item?.amount - (item?.category === 'loyer' ? ((item?.managementFees || 0) + (item?.rentalCharges || 0)) : 0) || 0;
            allIncomesByCategory[item?.category].count += 1;
          }
          if (item?.category === 'loyer') {
            // frais déduits du loyer
            if (allExpensesByCategory[`frais_${item?.category}`] === undefined) {
              /**
               * initial values and then calculate percentage starting from 0
               */
              let freqExpense = 12;
              switch (item?.frequency) {
                case 'quarterly':
                  freqExpense = 4;
                  break;
                case 'biannually':
                  freqExpense = 2;
                  break;
                case 'annual':
                  freqExpense = 1;
                  break;
                default:
                  break;
              }
              allExpensesByCategory[`frais_${item?.category}`] = {
                total: item?.managementFees || 0,
                count: 1,
                freqExpense,
              };
            } else {
              /** else If any expense exist then we add to allCurrentCategories variable */
              allExpensesByCategory[`frais_${item?.category}`].total += item?.managementFees || 0;
              allExpensesByCategory[`frais_${item?.category}`].count += 1;
            }
          }
        }
      });
    }
    const totalIncomesInternal = Object.values(allIncomesByCategory).reduce(
      (total, category) => total + category.total * (category.freqIncome / category.count),
      0,
    );

    if (expenses) {
      expenses.forEach((item) => {
        if (item) {
          /** If any expense doesnt exist */
          if (allExpensesByCategory[item?.category] === undefined) {
            /**
             * initial values and then calculate percentage starting from 0
             */
            let freqExpense = 12;
            switch (item?.frequency) {
              case 'quarterly':
                freqExpense = 4;
                break;
              case 'biannually':
                freqExpense = 2;
                break;
              case 'annual':
                freqExpense = 1;
                break;
              default:
                break;
            }
            allExpensesByCategory[item?.category] = {
              total: (item?.category === 'mensualite_credit' ? item?.infoCredit?.assurance : item?.amount) || 0,
              count: 1,
              freqExpense,
            };
          } else {
            /** else If any expense exist then we add to allCurrentCategories variable */
            allExpensesByCategory[item?.category].total += item?.amount || 0;
            allExpensesByCategory[item?.category].count += 1;
          }
        }
      });
    }
    const totalExpensesInternal = Object.values(allExpensesByCategory).reduce(
      (total, category) => total + category.total * (category.freqExpense / category.count),
      0,
    );

    // if we need to use outside of useMemo
    return {
      totalExpenses: totalExpensesInternal,
      totalIncomes: totalIncomesInternal,
    };
  }, [budgetLineDeadlines]);

  return Math.round(((totalIncomes - totalExpenses) / totalPrice) * 10000) / 100;
}
