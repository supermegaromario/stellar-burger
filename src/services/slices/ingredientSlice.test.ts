import {
  ingredientReducer,
  initialState,
  getIngredients
} from './ingredientSlice';

describe('Тесты слайса ingredientsSlice', () => {
  it('Проверка состояния pending у запроса на сервер', () => {
    const state = ingredientReducer(initialState, getIngredients.pending(''));
    expect(state.loading).toBe(true);
  });

  it('Проверка успешного выполнения запроса', async () => {
    const ingredients = [
      {
        calories: 643,
        carbohydrates: 85,
        fat: 26,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        name: 'Филе Люминесцентного тетраодонтимформа',
        price: 988,
        proteins: 44,
        type: 'main',
        __v: 0,
        _id: '643d69a5c3f7b9001cfa093e'
      },
      {
        calories: 643,
        carbohydrates: 85,
        fat: 26,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        name: 'Филе Люминесцентного тетраодонтимформа',
        price: 988,
        proteins: 44,
        type: 'main',
        __v: 0,
        _id: '643d69a5c3f7b9001cfa093e'
      }
    ];

    const state = ingredientReducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: ingredients
    });

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(ingredients);
  });

  it('Проверка получения ошибки запроса на сервер', () => {
    const state = ingredientReducer(initialState, {
      type: getIngredients.rejected.type
    });
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual([]);
  });
});
