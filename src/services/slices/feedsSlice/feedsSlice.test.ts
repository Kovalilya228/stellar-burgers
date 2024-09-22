import feedsReducer, {
  fetchFeeds,
  feedsInitialState as initialState
} from './feedsSlice';

describe('feeds slice', () => {
  const orders = [
    {
      _id: '123123123',
      status: 'ready',
      name: 'Space Burger',
      createdAt: '22.09.2024',
      updatedAt: '22.09.2024',
      number: 12345,
      ingredients: [
        {
          id: '1',
          _id: '60d3b41abdacab0026a733c6',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        {
          id: '2',
          _id: '60d3b41abdacab0026a733c7',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
        }
      ]
    }
  ];

  it('should handle fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedsReducer(initialState, action);

    expect(state.fetchFeedsPending).toBe(true);
  });

  it('should handle fetchFeeds.fulfilled', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: orders,
        total: 10,
        totalToday: 5
      }
    };
    const state = feedsReducer(initialState, action);

    expect(state.fetchFeedsPending).toBe(false);
    expect(state.orders).toEqual(orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(5);
  });

  it('should handle fetchFeeds.rejected', () => {
    const action = { type: fetchFeeds.rejected.type, payload: 'Error' };
    const state = feedsReducer(initialState, action);

    expect(state.fetchFeedsPending).toBe(false);
  });
});
