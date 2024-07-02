import {
  userReducer,
  initialState,
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile
} from './userSlice';

describe('Тесты слайса userSlice', () => {
  const user = {
    email: 'qwe@qwe.org',
    name: 'qwe'
  };

  it('Проверка получения ошибки запроса регистрации пользователя', () => {
    const newState = userReducer(initialState, {
      type: registerUser.rejected.type
    });
    expect(newState.user).toEqual({ email: '', name: '' });
  });

  it('Проверка успешно выполненного запроса о регистрации пользователя', () => {
    const newState = userReducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: { user }
    });
    expect(newState.user).toEqual(user);
    expect(newState.isAuthChecked).toEqual(true);
  });

  it('Проверка получения ошибки запроса на вход пользователя', () => {
    const newState = userReducer(initialState, {
      type: loginUser.rejected.type
    });
    expect(newState.user).toEqual({ email: '', name: '' });
  });

  it('Проверка успешного выполнения входа пользователя', () => {
    const newState = userReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: { user }
    });
    expect(newState.user).toStrictEqual(user);
    expect(newState.isAuthChecked).toEqual(true);
  });

  it('Проверка успешного выхода пользователя', () => {
    const newState = userReducer(
      { ...initialState, user },
      {
        type: logoutUser.fulfilled.type
      }
    );
    expect(newState.user).toEqual({ email: '', name: '' });
  });

  it('Проверка получения ошибки при запросе на выход пользователя', () => {
    const newState = userReducer(initialState, {
      type: updateUserProfile.rejected.type
    });
    expect(newState.isAuthChecked).toEqual(true);
  });

  it('Проверка успешного обновления данных пользователя', () => {
    const newState = userReducer(initialState, {
      type: updateUserProfile.fulfilled.type,
      payload: { user }
    });
    expect(newState.user).toStrictEqual(user);
    expect(newState.isAuthChecked).toEqual(true);
  });
});
