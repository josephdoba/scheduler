import React from "react";
import { render, cleanup } from "@testing-library/react";

// We import the component that we are testing
import Application from "components/Application";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });
  it("renders without crashing", () => {
    console.log("Great Success 1")
  });
  it("renders without crashing", () => {
    console.log("Great Success 2")
  });

// xit is used to skip tests:
xit("Does something its suppose to do", () => {
  //
});

// . skip also works:

test.skip("something else its suppose to do", () => {
  // some code
})

});

