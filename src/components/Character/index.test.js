import React from "react";
import { render } from "@testing-library/react";
import Character from "./index";
import { character } from "../../mocks";

test("renders without crashing", () => {
  render(<Character character={character} />);
});
