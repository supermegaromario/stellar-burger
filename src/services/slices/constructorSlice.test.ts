import {
  burgerConstructorReducer,
  initialState,
  addBurgerIngredient,
  removeBurgerIngredient,
  moveBurgerIngredient
} from './constructorSlice';

describe('Тесты слайса constructorSlice', () => {
  const newBun = {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa093c',
    id: '1'
  };
  const newMain = {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    name: 'Филе Люминесцентного тетраодонтимформа',
    price: 988,
    proteins: 44,
    type: 'main',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa093e',
    id: '2'
  };
  const newMain2 = {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    name: 'Филе Люминесцентного тетраодонтимформа',
    price: 988,
    proteins: 44,
    type: 'main',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa093e',
    id: '3'
  };

  it('Проверка добавления ингредиента', () => {
    const newState = burgerConstructorReducer(
      initialState,
      addBurgerIngredient(newBun)
    );
    const { bun } = newState;
    expect(bun).toEqual({ ...newBun, id: expect.any(String), count: 1 });
  });

  it('Проверка удаления ингредиента', () => {
    let newState = burgerConstructorReducer(
      initialState,
      addBurgerIngredient(newMain)
    );
    newState = burgerConstructorReducer(
      newState,
      removeBurgerIngredient(newState.ingredients[0].id)
    );
    expect(newState.ingredients).toEqual([]);
  });

  it('Проверка изменения порядка ингредиентов', () => {
    let newState = burgerConstructorReducer(
      initialState,
      addBurgerIngredient(newMain)
    );
    newState = burgerConstructorReducer(
      newState,
      addBurgerIngredient(newMain2)
    );
    newState = burgerConstructorReducer(
      newState,
      moveBurgerIngredient({ index: 0, step: 1 })
    );
    expect(newState.ingredients[0].id).toBe(newMain2.id);
    expect(newState.ingredients[1].id).toBe(newMain.id);
  });
});
