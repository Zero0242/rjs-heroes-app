import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en <AppRouter/ >", () => {
  test("debe mostrar el login si no esta autenticado", () => {
    const contextValue = { logged: false };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // screen.debug();

    expect(screen.getAllByText('Login')).toBeTruthy()
  });

  test("debe mostrar la pantalla marvel si esta autenticado", () => {
    const contextValue = { logged: true, user: { name: "Juanito" } };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // screen.debug();
    expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1)
  });
});
