import { useEffect, useState } from 'react';
import { useGetRealEstate } from '../src/API/RealEstate';
import { RealEstate } from '../src/API';
import { useUser } from '../src/API/UserContext';

const readOnly = (idBien: string) => {
  const user = useUser();
  const { bienget } = useGetRealEstate(idBien);
  const [bienCharger, setBienCharger] = useState<RealEstate>();
  useEffect(() => {
    setBienCharger(bienget);
  }, [bienget]);

  if (bienCharger && user.user && bienCharger.shared?.includes(user.user.id)) {
    return true;
  }

  return false;
};

export default { readOnly };
