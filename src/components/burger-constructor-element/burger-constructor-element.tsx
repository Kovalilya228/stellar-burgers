import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

import { useSelector, useDispatch } from '../../services/store';
import { constructorActions } from '../../services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        constructorActions.sortIngredients({
          ingredientDrop: { index, item: ingredient },
          index: index + 1
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        constructorActions.sortIngredients({
          ingredientDrop: { index, item: ingredient },
          index: index - 1
        })
      );
    };

    const handleClose = () => {
      dispatch(constructorActions.removeIngredientForBurger(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
