import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useNavigate } from 'react-router-dom';
import { registerUser, selectError } from '../../services/slices/userSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        email: email,
        password: password,
        name: userName
      })
    )
      .unwrap()
      .then(() => navigate('/login'))
      .catch(() => {});
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
