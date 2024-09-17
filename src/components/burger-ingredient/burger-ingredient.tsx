import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { constructorActions } from '../../services/slices/constructorSlice';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const ingredients = useSelector((store) => store.ingredients.ingredients);

    let isAdded = ingredients.filter((item) => item._id === ingredient._id);

    const handleAdd = () => {
      if (ingredient && ingredient.type === 'bun') {
        dispatch(constructorActions.setBuns({ id: uuidv4(), ...ingredient }));
      } else {
        dispatch(constructorActions.addIngredient(ingredient));
      }
      dispatch(constructorActions.setOrderIngredients());
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
