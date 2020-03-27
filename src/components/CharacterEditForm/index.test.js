import React from "react";
import { render } from "@testing-library/react";
import CharacterEditForm from "./index";

test("renders without crashing", () => {
  render(<CharacterEditForm />);
});
