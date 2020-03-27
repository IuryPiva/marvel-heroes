import React from "react";
import { render } from "@testing-library/react";
import Logo from "./index";
import { MemoryRouter } from "react-router-dom";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <Logo />
    </MemoryRouter>
  );
});
