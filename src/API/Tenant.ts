import { v4 as uuid } from 'uuid';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import {
  RealEstate, TenantInfoInput, UpdateRealEstateMutation, UpdateRealEstateMutationVariables,
} from '../API';

import * as mutations from '../graphql/mutations';
import { updateRealEstateMutation } from './RealEstate';

const updateRealEstate = updateRealEstateMutation();

export const addTenant = async (bien: RealEstate, newTenant: Omit<TenantInfoInput, 'id'>) => {
  /** *
   * const [updateRealEstate] = useMutation<UpdateRealEstateMutation,
   UpdateRealEstateMutationVariables>(gql(mutations.updateRealEstate), {
    update: (cache, { data: mutationData }) => {
      console.log(mutationData);
    },
  });
   */
  const tenantInfo: TenantInfoInput = {
    ...newTenant,
    id: uuid(),
  };

  const tenants = (<TenantInfoInput[]>bien?.tenants || []);
  tenants.push(tenantInfo);

  if (bien.id) {
    await updateRealEstate({
      variables: {
        input: {
          id: bien.id,
          tenants,
        },
      },
    });
  }
  return updateRealEstate;
};

export const modifyTenant = () => {};
