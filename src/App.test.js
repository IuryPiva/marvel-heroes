import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";

import App from "./App";
import { CHARACTERS } from "./pages/MainPage";
import { character } from "./mocks";

const mocks = [
  {
    request: {
      query: CHARACTERS,
      variables: {
        offset: 0,
        limit: 12
      }
    },
    result: {
      data: {
        offset: 0,
        limit: 12,
        total: 12,
        count: 12,
        results: [character]
      }
    }
  }
];

test("renders without crashing", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
});
