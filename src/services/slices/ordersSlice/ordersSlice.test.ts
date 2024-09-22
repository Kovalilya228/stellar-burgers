import ordersReducer, { fetchOrders, fetchOrderByNumber, fetchOrderBurger } from './ordersSlice';

describe('orders slice', () => {
  const initialState = {
    orders: [],
    fetchOrdersPending: false,
    orderByNumber: null,
    orderBurger: null,
    orderRequest: false
  };

  it('should handle fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const state = ordersReducer(initialState, action);

    expect(state.fetchOrdersPending).toBe(true);
  });

  it('should handle fetchOrders.fulfilled', () => {
    const action = {
      type: fetchOrders.fulfilled.type,
      payload: [{
        "_id": "123123123",
        "status": "ready",
        "name": "Space Burger",
        "createdAt": "22.09.2024",
        "updatedAt": "22.09.2024",
        "number": 12345,
        "ingredients": [{
            "id": "1",
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
          },
          {
            "id": "2",
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
          }]
      }]
    };
    const state = ordersReducer(initialState, action);

    expect(state.fetchOrdersPending).toBe(false);
    expect(state.orders).toEqual([{
        "_id": "123123123",
        "status": "ready",
        "name": "Space Burger",
        "createdAt": "22.09.2024",
        "updatedAt": "22.09.2024",
        "number": 12345,
        "ingredients": [{
            "id": "1",
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
          },
          {
            "id": "2",
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
          }]
      }]);
  });

  it('should handle fetchOrders.rejected', () => {
    const action = { type: fetchOrders.rejected.type, payload: 'Error' };
    const state = ordersReducer(initialState, action);

    expect(state.fetchOrdersPending).toBe(false);
  });

  it('should handle fetchOrderByNumber.pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = ordersReducer(initialState, action);

    expect(state.fetchOrdersPending).toBe(true);
  });

  it('should handle fetchOrderByNumber.fulfilled', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: { orders: [{
        "_id": "123123123",
        "status": "ready",
        "name": "Space Burger",
        "createdAt": "22.09.2024",
        "updatedAt": "22.09.2024",
        "number": 12345,
        "ingredients": [{
            "id": "1",
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
          },
          {
            "id": "2",
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
          }]
      }] }
    };
    const state = ordersReducer(initialState, action);

    expect(state.fetchOrdersPending).toBe(false);
    expect(state.orderByNumber).toEqual({
        "_id": "123123123",
        "status": "ready",
        "name": "Space Burger",
        "createdAt": "22.09.2024",
        "updatedAt": "22.09.2024",
        "number": 12345,
        "ingredients": [{
            "id": "1",
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
          },
          {
            "id": "2",
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
          }]
      });
  });

  it('should handle fetchOrderByNumber.rejected', () => {
    const action = { type: fetchOrderByNumber.rejected.type, payload: 'Error' };
    const state = ordersReducer(initialState, action);

    expect(state.fetchOrdersPending).toBe(false);
  });

  it('should handle fetchOrderBurger.pending', () => {
    const action = { type: fetchOrderBurger.pending.type };
    const state = ordersReducer(initialState, action);

    expect(state.fetchOrdersPending).toBe(true);
    expect(state.orderRequest).toBe(true);
  });

  it('should handle fetchOrderBurger.fulfilled', () => {
    const action = {
      type: fetchOrderBurger.fulfilled.type,
      payload: { order: {
        "_id": "123123123",
        "status": "ready",
        "name": "Space Burger",
        "createdAt": "22.09.2024",
        "updatedAt": "22.09.2024",
        "number": 12345,
        "ingredients": [{
            "id": "1",
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
          },
          {
            "id": "2",
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
          }]
      }, name: 'Burger' }
    };
    const state = ordersReducer(initialState, action);

    expect(state.fetchOrdersPending).toBe(false);
    expect(state.orderBurger).toEqual({ order: {
        "_id": "123123123",
        "status": "ready",
        "name": "Space Burger",
        "createdAt": "22.09.2024",
        "updatedAt": "22.09.2024",
        "number": 12345,
        "ingredients": [{
            "id": "1",
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
          },
          {
            "id": "2",
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
          }]
      }, name: 'Burger' });
    expect(state.orderRequest).toBe(false);
  });

  it('should handle fetchOrderBurger.rejected', () => {
    const action = { type: fetchOrderBurger.rejected.type, payload: 'Error' };
    const state = ordersReducer(initialState, action);

    expect(state.fetchOrdersPending).toBe(false);
    expect(state.orderRequest).toBe(false);
  });
});