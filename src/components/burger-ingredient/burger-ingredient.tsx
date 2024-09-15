import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { constructorActions } from '../../services/slices/constructorSlice';
import { useDispatch } from '../../services/store';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (ingredient && ingredient.type === 'bun') {
        dispatch(
          constructorActions.setBuns({ id: ingredient._id, ...ingredient })
        );
      } else {
        dispatch(
          constructorActions.addIngredient({
            id: ingredient._id,
            ...ingredient
          })
        );
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
