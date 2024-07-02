import { TOrder } from '@utils-types';
import { createOrder, initialState, orderReducer } from './orderSlice';

describe('Тесты слайса newOrder', () => {
  it('Проверка состояния pending запроса на сервер', () => {
    const state = orderReducer(initialState, createOrder.pending('', []));
    expect(state.orderRequest).toBe(true);
  });

  it('Проверка успешно выполненного запроса на сервер', async () => {
    const expectedOrder = {
      order: {
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0948',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa0944'
        ],
        _id: '6615272997ede0001d064e37',
        status: 'done',
        name: 'Флюоресцентный антарианский space астероидный альфа-сахаридный традиционный-галактический бургер',
        createdAt: '2024-04-09T11:31:53.313Z',
        updatedAt: '2024-04-09T11:31:53.313Z',
        number: 37860
      }
    };

    const newOrder: TOrder = {
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa0944'
      ],
      _id: '6615272997ede0001d064e37',
      status: 'done',
      name: 'Флюоресцентный антарианский space астероидный альфа-сахаридный традиционный-галактический бургер',
      createdAt: '2024-04-09T11:31:53.313Z',
      updatedAt: '2024-04-09T11:31:53.313Z',
      number: 37860
    };

    const state = orderReducer(initialState, {
      type: createOrder.fulfilled.type,
      payload: expectedOrder
    });

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(newOrder);
  });

  it('Проверка получения ошибки при отправке запроса', () => {
    const state = orderReducer(initialState, {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка' }
    });
    expect(state.error).toBe('Ошибка');
  });
});
