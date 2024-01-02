import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en <SearchPage />", () => {
  beforeEach(() => jest.clearAllMocks());

  test("debe de mostar correctamente al estar con los valores por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    //screen.debug();

    expect(container).toMatchSnapshot();
  });
  test("debe de mostar un heroe cuando el query tiene ?q=heroe", () => {
    const heroe = "batman";
    render(
      <MemoryRouter initialEntries={[`/search?q=${heroe}`]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    expect(input.value).toBe(heroe);

    const image = screen.getByRole("img");
    expect(image.src).toContain(heroe);

    // screen.debug();
    const alertDiv = screen.getByLabelText("alert-danger");

    expect(alertDiv.style.display).toBe("none");
  });

  test("debe de mostrar un error si no se encuentra el hero", () => {
    const heroe = "HomeLander";
    render(
      <MemoryRouter initialEntries={[`/search?q=${heroe}`]}>
        <SearchPage />
      </MemoryRouter>
    );

    // screen.debug();
    const alertDiv = screen.getByLabelText("alert-danger");

    expect(alertDiv.style.display).not.toBe("none");
  });

  test("debe de llamar el navigate a la pantalla nueva", () => {
    render(
      <MemoryRouter initialEntries={[`/search}`]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");

    fireEvent.change(input, {
      target: {
        value: "superman",
        name: "searchQuery",
      },
    });

    const form = screen.getByRole("form");

    fireEvent.submit(form);



    expect(mockedUseNavigate).toHaveBeenCalledWith("?q=superman")
  });
});
