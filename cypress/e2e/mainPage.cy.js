describe("drawer tests", () => {
  // it('renders the initial view of screen', () => {
  //   cy.visit('http://localhost:3000/home');
  //   cy.get('.MuiToolbar-root > .MuiButtonBase-root').should("not.be.hidden");
  // })
  // it('opens drawer', () => {
  //   cy.visit('http://localhost:3000/home');
  //   cy.get(':nth-child(3) > :nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').should('be.hidden')
  //   cy.get('.MuiToolbar-root > .MuiButtonBase-root').click();
  //   cy.get(':nth-child(3) > :nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').should('not.be.hidden')
  // })
  it("My Courses should open another bar containing my classes over calendar when clicked", () => {
    cy.visit("http://localhost:3000/home");
    cy.log("still needs implementing");
    // test if event is added
    //test if event is repeating correctly
  });
  it("all courses should open another bar containing all classes over calendar when clicked", () => {
    cy.visit("http://localhost:3000/home");
    cy.log("still needs implementing");
    // test if event is added
    //test if event is repeating correctly
  });
  it("Add / delete should open another bar containing list view of added classesover calendar when clicked", () => {
    cy.visit("http://localhost:3000/home");
    cy.log("still needs implementing");
    // test if event is added
    //test if event is repeating correctly
  });
  it("logout should redirect back to quarter", () => {
    cy.visit("http://localhost:3000/home");
    cy.log("still needs implementing");
    // test if event is added
    //test if event is repeating correctly
  });
});

describe("calendar", () => {
  it("loads calendar", () => {
    cy.visit("http://localhost:3000/home");
    cy.get(".fc").should("exist");
  });
  it("adds events to the calendar correctly", () => {
    cy.visit("http://localhost:3000/home");
    cy.log("still needs implementing");
    // test if event is added
    //test if event is repeating correctly
  });
  it("able to create a custom event", () => {
    cy.visit("http://localhost:3000/home");
    cy.log("still needs implementing");
    // test if event is added
    //test if event is repeating correctly
  });
  describe("css", () => {
    it("The buttons remain in place when the sidebar is in place", () => {
      cy.visit("http://localhost:3000/home");
      let initPosition;
      cy.get(".fc-next-button").then(($button) => {
        cy.log($button.position());
        initPosition = $button.position();
      });
      cy.get(":nth-child(3) > :nth-child(2) > .MuiButtonBase-root").click();
      cy.get(".fc-next-button").should(($button) => {
        expect($button.position()).deep.equal(initPosition);
      });
    });
    it("changes from light to dark correctly and vice versa", () => {
      cy.visit("http://localhost:3000/home");
      cy.log("still needs implementing");
      // test if event is added
      //test if event is repeating correctly
    });
  });
});
