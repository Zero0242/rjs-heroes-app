import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui/components/";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter, useNavigate } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en el <NavBar/>", () => {
  const contextValues = {
    logged: true,
    user: "Juanito",
    userLogout: jest.fn(),
  };

  beforeEach(() => jest.resetAllMocks());

  test("Al logearse, deberia estar el nombre de usuario en algun lugar", () => {
    render(
      <AuthContext.Provider value={contextValues}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    // screen.debug();

    expect(screen.getByText(contextValues.user)).toBeTruthy();
  });

  test("debe de llamar al logout, y el navigate hacia el login", () => {
    render(
      <AuthContext.Provider value={contextValues}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    //screen.debug();

    const logoutBtn = screen.getByRole("button", { name: "Logout" });

    fireEvent.click(logoutBtn);

    expect(contextValues.userLogout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
