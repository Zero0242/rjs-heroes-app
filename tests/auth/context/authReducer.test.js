import { authReducer, types } from "../../../src/auth/";

describe("Pruebas en auth reducer", () => {
  test("retorna el estado x defecto al iniciar", () => {
    const estadoInicial = {};

    const estadoReducer = authReducer(estadoInicial, {});

    expect(estadoInicial).toEqual(estadoReducer);
  });

  test("al llamar el login, establece un usuario", () => {
    const loginForm = { user: "Juanito" };
    const action = { type: types.login, payload: loginForm };

    const newState = authReducer({}, action);

    expect(newState).toEqual({
      logged: true,
      user: loginForm,
    });
  });

  test("al llamar el logout, borra el usuario y el logged queda en false", () => {
    const initialAction = { type: types.login, payload: { user: "Juanito" } };

    const initialState = authReducer({}, initialAction);

    const newAction = { type: types.logout };

    const newState = authReducer(initialState, newAction);

    expect(newState.user).toBeNull();
    expect(newState.logged).toBeFalsy();
  });
});
