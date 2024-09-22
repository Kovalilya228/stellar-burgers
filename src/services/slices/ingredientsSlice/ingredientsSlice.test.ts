import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

describe('ingredients slice', () => {
  const initialState = {
    ingredients: [],
    fetchIngredientsPending: false,
  };

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.fetchIngredientsPending).toBe(true);
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: [{
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
      }],
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.fetchIngredientsPending).toBe(false);
    expect(state.ingredients).toEqual([{
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
      }]);
  });

  it('should handle fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.fetchIngredientsPending).toBe(false);
  });
});