import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/";

describe("Pruebas en <SearchPage />", () => {
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
});
