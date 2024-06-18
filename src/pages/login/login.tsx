import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUser, selectError } from '../../services/slices/userSlice';
import { AppDispatch } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(selectError);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.state ? location.state.from.pathname : '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: email,
        password: password
      })
    )
      .unwrap()
      .then(() => {
        navigate(path);
      })
      .catch(() => {});
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
