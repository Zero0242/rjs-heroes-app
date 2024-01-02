import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PublicRouter } from "../../src/router/";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Pruebas en <PublicRouter />", () => {
  test("debe de mostrar el children, si no esta autenticado", () => {
    const contextValue = {
      logged: false,
    };

    const childrenText = "Ruta Abierta";
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRouter>
          <h1>{childrenText}</h1>
        </PublicRouter>
      </AuthContext.Provider>
    );

    expect(screen.getAllByText(childrenText)).toBeTruthy();
  });

  test("no debe de mostrar el children si ya esta autenticado", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Pedro",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path='login'
              element={
                <PublicRouter>
                  <h1>Ruta publica</h1>
                </PublicRouter>
              }
            />
            <Route path='marvel' element={<h1>Pagina Marvel</h1>} />
            <Route path='/*' element={<h1>Pagina Marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    
    // screen.debug();
    
    expect(screen.getByText("Pagina Marvel")).toBeTruthy()
  });
});
