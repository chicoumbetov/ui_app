import { v4 as uuid } from 'uuid';
import {
  RealEstate, TenantInfoInput,
} from '../API';

import { useUpdateRealEstateMutation } from './RealEstate';

export const useAddTenant = () => {
  const updateRealEstate = useUpdateRealEstateMutation();

  return async (bien: RealEstate, newTenant: Omit<TenantInfoInput, 'id'>) => {
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
      return tenantInfo.id;
    }
    return null;
  };
};

export const useUpdateTenant = () => {
  const updateRealEstate = useUpdateRealEstateMutation();

  return async (bien: RealEstate, updatedTenant: TenantInfoInput) => {
    const tenants = (<TenantInfoInput[]>bien?.tenants || []);
    tenants.map((tenant) => {
      if (tenant.id === updatedTenant.id) {
        return updatedTenant;
      }
      return tenant;
    });

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
};
