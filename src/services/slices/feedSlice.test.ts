import { feedsReducer, getAllFeeds, initialState } from './feedSlice';

describe('Тесты слайса ordersSlice', () => {
  const expectedOrder = [
    {
      _id: '6615272997ede0001d064e37',
      createdAt: '2024-04-09T11:31:53.313Z',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa0944'
      ],
      name: 'Флюоресцентный антарианский space астероидный альфа-сахаридный традиционный-галактический бургер',
      number: 37860,
      status: 'done',
      updatedAt: '2024-04-09T11:31:53.313Z'
    }
  ];

  it('Проверка успешного прохождения запроса', () => {
    const state = feedsReducer(initialState, {
      type: getAllFeeds.fulfilled.type,
      payload: { orders: expectedOrder, total: 1, totalToday: 1 }
    });
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(expectedOrder);
  });

  it('Проверка получения ошибки при отправке запроса', () => {
    const state = feedsReducer(initialState, {
      type: getAllFeeds.rejected.type,
      error: { message: 'Ошибка' }
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
