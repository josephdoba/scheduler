// Instead of writing one big test, let's start by writing three smaller tests.

describe("Appointments", () => {
  beforeEach(()=> {
    // Visits the root of our web server
    cy.request("GET", "http://localhost:8000/api/debug/reset")
    cy.visit("http://localhost:8000/");
    cy.contains("Monday");
  });
  
  it("should book an interview", () => {
    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
    .first()
    .click();
    
    // Enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    
    cy.contains("Save").click();
    
    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  
  it("Should edit an interview", () => {
    cy.get("[alt=Edit]")
    .first()
    .click({force: true});

    cy.get("[data-testid=student-name-input]").type("{selectAll}");
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    
    // Chooses an interviewer -- Today I learned that Malcolm has two l's in it
    cy.get("[alt='Tori Malcolm']").click();
    
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });


  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    cy.contains("Confirm").click();
  
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});

