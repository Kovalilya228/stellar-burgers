import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';

import { fetchOrderBurger } from '../../services/slices/ordersSlice';
import { constructorActions } from '../../services/slices/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector((store) => store.profile.isLogin);

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    (store) => store.burgerConstructor.constructorItems
  );

  const orderRequest = useSelector((store) => store.orders.orderRequest);

  const orderModalData = useSelector(
    (store) => store.burgerConstructor.orderModalData
  );

  const orderIngredients = useSelector(
    (store) => store.burgerConstructor.orderIngredients
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    isLogin ? dispatch(fetchOrderBurger(orderIngredients)) : navigate('/login');
  };

  const closeOrderModal = () => {
    dispatch(constructorActions.clearBurgerConstructor());
  };

  useEffect(() => {
    orderRequest && dispatch(constructorActions.clearBurgerConstructor());
  }, [orderRequest]);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
