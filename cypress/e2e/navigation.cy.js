describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("http://localhost:8000/");
  });
});

it("should navigate to Tuesday", () => {
  cy.visit("http://localhost:8000/");
  cy.contains("li", "Tuesday")
  .click()
  .should("have.css", "background-color", "rgba(242, 242, 242)");
});
