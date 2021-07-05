import { useEffect, useState } from 'react';
import { useGetRealEstate } from '../src/API/RealEstate';
import { RealEstate } from '../src/API';
import { useUser } from '../src/API/UserContext';

const readOnly = (idBien: string) => {
  const user = useUser();
  const { bienget } = useGetRealEstate(idBien);

  if (bienget && user.user && bienget.shared?.includes(user.user.id)) {
    return true;
  }

  return false;
};

export default { readOnly };
