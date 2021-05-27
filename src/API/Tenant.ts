import { v4 as uuid } from 'uuid';
import {
  RealEstate, TenantInfoInput,
} from '../API';

import { useUpdateRealEstateMutation } from './RealEstate';
import { removeKey, removeKeyArray } from '../../utils/ObjectHelper';

export const useAddTenant = () => {
  const updateRealEstate = useUpdateRealEstateMutation();

  return async (bien: RealEstate, newTenant: Omit<TenantInfoInput, 'id'>) => {
    const tenantInfo: TenantInfoInput = {
      ...newTenant,
      id: uuid(),
    };

    const tenants = removeKeyArray<TenantInfoInput>((<TenantInfoInput[]>bien?.tenants || []), '__typename');
    tenants.push(tenantInfo);

    if (bien.id) {
      await updateRealEstate({
        variables: {
          input: {
            id: bien.id,
            tenants,
            _version: bien._version,
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
    const tenants = removeKeyArray<TenantInfoInput>((<TenantInfoInput[]>bien?.tenants || []), '__typename');
    const finalTenants = tenants.map((tenant) => {
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
            tenants: finalTenants,
            _version: bien._version,
          },
        },
      });
    }
    return null;
  };
};
