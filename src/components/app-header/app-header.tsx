import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/hooks';
import { selectUserName } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const name = useAppSelector(selectUserName);
  return <AppHeaderUI userName='' />;
};
