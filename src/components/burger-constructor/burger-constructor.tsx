import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';

import { fetchOrderBurger } from '../../services/slices/ordersSlice';
import { constructorActions } from '../../services/slices/constructorSlice';
import { Navigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

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

  const orderBurger = useSelector((store) => store.orders.orderBurger);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (isLogin) dispatch(fetchOrderBurger(orderIngredients));
  };

  if (orderBurger) dispatch(constructorActions.clearBurgerConstructor());

  // if (orderRequest && !isLogin) return <Navigate to='/login' replace/>

  const closeOrderModal = () => {};

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
// import { FC, useMemo } from 'react';
// import { TConstructorIngredient } from '@utils-types';
// import { BurgerConstructorUI } from '@ui';
// import { useSelector } from '../../services/store';

// export const BurgerConstructor: FC = () => {
//   const constructorItems = useSelector(
//     (store) => store.burgerConstructor.constructorItems
//   );

//   const orderRequest = useSelector(
//     (store) => store.burgerConstructor.orderRequest
//   );

//   const orderModalData = useSelector(
//     (store) => store.burgerConstructor.orderModalData
//   );

//   const onOrderClick = () => {
//     if (!constructorItems.bun || orderRequest) return;
//     // Добавьте логику для обработки заказа
//   };

//   const closeOrderModal = () => {
//     // Добавьте логику для закрытия модального окна заказа
//   };

//   const price = useMemo(
//     () =>
//       (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
//       constructorItems.ingredients.reduce(
//         (s: number, v: TConstructorIngredient) => s + v.price,
//         0
//       ),
//     [constructorItems]
//   );

//   return (
//     <BurgerConstructorUI
//       price={price}
//       orderRequest={orderRequest}
//       constructorItems={constructorItems}
//       orderModalData={orderModalData}
//       onOrderClick={onOrderClick}
//       closeOrderModal={closeOrderModal}
//     />
//   );
// };
