import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { fetchLogin } from '../../services/slices/profileSlice';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const data = useSelector((store) => store.profile);
  const userData = useSelector((store) => store.profile.data);
  const isLogin = useSelector((store) => store.profile.isLogin);
  const isLoading = useSelector((store) => store.profile.fetchProfilePending);
  const [email, setEmail] = useState(userData?.email || '');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLogin({ email, password }));
  };

  if (isLoading) return <Preloader />;

  return isLogin ? (
    <Navigate to='/' replace />
  ) : (
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
