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

    expect(container).toMatchSnapshot()
  });
});
