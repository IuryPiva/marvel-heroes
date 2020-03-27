import React from "react";
import { render } from "@testing-library/react";
import CharacterPreview from "./index";
import { character } from "../../mocks";

test("renders without crashing", () => {
  render(<CharacterPreview character={character}/>);
});
