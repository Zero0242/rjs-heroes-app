import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PrivateRouter } from "../../src/router/";

describe("Pruebas en <PrivateRouter />", () => {
  test("debe de mostrar el children, si esta autenticado", () => {
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        name: "Pedro",
      },
    };

    const childrenText = "Ruta Privada";
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/private"]}>
          <PrivateRouter>
            <h1>{childrenText}</h1>
          </PrivateRouter>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getAllByText(childrenText)).toBeTruthy();

    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/private");
  });

  test("no debe de mostrar el children si no esta autenticado", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/private"]}>
          <Routes>
            <Route
              path='private'
              element={
                <PrivateRouter>
                  <h1>Ruta privada</h1>
                </PrivateRouter>
              }
            />
            <Route path='login' element={<h1>Autenticacion</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // screen.debug();

    expect(screen.getByText("Autenticacion")).toBeTruthy();
  });
});
