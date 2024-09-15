import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { OnlyAuth, OnlyUnAuth } from '../ProtectedRoute/ProtectedRoute';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { useSelector, useDispatch } from '../../services/store';
import { fetchGetUser } from '../../services/slices/profileSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchGetUser());
  }, [dispatch]);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal
              title='Заказ'
              onClose={handleCloseModal}
              children={<OrderInfo />}
            />
          }
        />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyAuth component={<ResetPassword />} />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Ингредиент'
              onClose={handleCloseModal}
              children={<IngredientDetails />}
            />
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title='Заказ'
              onClose={handleCloseModal}
              children={<OnlyAuth component={<OrderInfo />} />}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
