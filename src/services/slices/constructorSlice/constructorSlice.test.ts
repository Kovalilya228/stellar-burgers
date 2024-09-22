import constructorReducer, { constructorActions } from './constructorSlice';

describe('constructorSlice', () => {
  const initialState = {
    constructorItems: {
      bun: {
        price: 0,
        _id: ''
      },
      ingredients: []
    },
    orderModalData: null,
    orderIngredients: []
  };

  it('should handle addIngredient action', () => {
    const ingredient = {
        "_id": "60d3b41abdacab0026a733c6",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png"
    };
    const action = constructorActions.addIngredient(ingredient);
    const newState = constructorReducer(initialState, action);

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toMatchObject(ingredient);
  });

  it('should handle removeIngredientForBurger action', () => {
    const ingredient = {
        "_id": "60d3b41abdacab0026a733c6",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png"
    };
    let state = constructorReducer(initialState, constructorActions.addIngredient(ingredient));
    const action = constructorActions.removeIngredientForBurger(0);
    state = constructorReducer(state, action);

    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  it('should handle sortIngredients action', () => {
    const ingredient1 = {
        "_id": "60d3b41abdacab0026a733c8",
        "name": "Космический терияки-соус",
        "type": "sauce",
        "proteins": 1,
        "fat": 2,
        "carbohydrates": 3,
        "calories": 4,
        "price": 55,
        "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png"
    };
    const ingredient2 = {
        "_id": "60d3b41abdacab0026a733c7",
        "name": "Филе Люминесцентного тетраодонтимформа",
        "type": "main",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/meat-03.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png"
      };
    let state = constructorReducer(initialState, constructorActions.addIngredient(ingredient1));
    state = constructorReducer(state, constructorActions.addIngredient(ingredient2));
    const action = constructorActions.sortIngredients({
      ingredientDrop: { index: 0, item: ingredient1 },
      index: 1
    });
    state = constructorReducer(state, action);

    expect(state.constructorItems.ingredients[0]).toMatchObject(ingredient2);
    expect(state.constructorItems.ingredients[1]).toMatchObject(ingredient1);
  });
});