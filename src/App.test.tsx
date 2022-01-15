import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { isFalsy } from "./utils/index";

test("isFalsyFun", () => {
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument()
  expect(isFalsy(0)).toBe(false);
});
