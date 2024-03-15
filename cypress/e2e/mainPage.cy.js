describe("drawer tests", () => {
  it("renders the initial view of screen", () => {
    cy.visit("http://localhost:3000/home");
    cy.get(".MuiToolbar-root > .MuiButtonBase-root").should("not.be.hidden");
  });
  it("the main drawer should open. ", () => {
    cy.visit("http://localhost:3000/home");
    cy.get(
      ":nth-child(3) > :nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root",
    ).should("be.hidden");
    cy.get(".MuiToolbar-root > .MuiButtonBase-root").click();
    cy.get(
      ":nth-child(3) > :nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root",
    ).should("not.be.hidden");
  });
  it("My Courses should open another bar containing my classes over calendar when clicked", () => {
    cy.visit("http://localhost:3000/home");

    cy.get(":nth-child(3) > :nth-child(2) > .MuiButtonBase-root").click();
    cy.get("input").type("cs141").type("{enter}");
    cy.get(":nth-child(4) > .MuiPaper-root").click();
    cy.get(".css-hlnzui-MuiTypography-root > :nth-child(2)").click();

    cy.get(".css-hlnzui-MuiTypography-root > :nth-child(2)").type("{esc}");
    cy.get("body").type("{esc}");

    cy.get(".MuiDrawer-modal > .MuiPaper-root").should("be.hidden");
    cy.get(":nth-child(3) > :nth-child(1) > .MuiButtonBase-root").click();
    cy.get(".MuiDrawer-modal > .MuiPaper-root").should("not.be.hidden");
    cy.get(".css-0 > .MuiBox-root > .MuiPaper-root").should("exist");
    // cy.log("still needs implementing");
    //  test if classes are contained in the bar
  });
  it("all courses should open another bar containing all classes over calendar when clicked", () => {
    cy.visit("http://localhost:3000/home");
    cy.get(".MuiDrawer-modal > .MuiPaper-root").should("be.hidden");
    cy.get("input").should("not.exist");
    cy.get(":nth-child(3) > :nth-child(2) > .MuiButtonBase-root").click();
    cy.get(".MuiDrawer-modal > .MuiPaper-root").should("not.be.hidden");
    cy.get("input").should("exist");
    cy.get("input").type("cs111").type("{enter}");
    cy.get(":nth-child(2) > .MuiPaper-root").should("exist");
    cy.get("input").clear();
    cy.get("input").type("cs141").type("{enter}");
    cy.get(":nth-child(2) > .MuiPaper-root").should("exist");
    //  test if classes are contained in the bar
  });
  it("be able to add multiple classes at once", () => {
    cy.visit("http://localhost:3000/home");
  });
  it("Add / delete should add the event to the calendar", () => {
    cy.visit("http://localhost:3000/home");
    cy.get(":nth-child(3) > :nth-child(2) > .MuiButtonBase-root").click();
    cy.get("input").type("cs111").type("{enter}");
    cy.get(":nth-child(4) > .MuiPaper-root").click();
    cy.get(".css-hlnzui-MuiTypography-root > :nth-child(2)").should("exist");
    cy.get(".css-hlnzui-MuiTypography-root > :nth-child(2)").click();
    // cy.get(".css-hlnzui-MuiTypography-root > :nth-child(2)").type("{esc}");
    cy.get(
      ".fc-day-fri > .fc-timegrid-col-frame > :nth-child(2) > .fc-timegrid-event-harness ",
    ).should("exist");
    // cy.get(":nth-child(3) > :nth-child(2) > .MuiButtonBase-root").click();
    // cy.get("input").type("cs111").type("{enter}");
    // cy.get(":nth-child(4) > .MuiPaper-root").click();
    // cy.get(".css-hlnzui-MuiTypography-root > :nth-child(1)").should("exist");
    cy.get(".css-hlnzui-MuiTypography-root > :nth-child(1)").click();
    cy.get(
      ".fc-day-fri > .fc-timegrid-col-frame > :nth-child(2) > .fc-timegrid-event-harness >.fc-event > .fc-event-main > .fc-event-main-frame > .fc-event-time",
    ).should("not.exist");
    cy.log("Hello");
    // test if event is added
    //test if event is repeating correctly
  });
  it("you should be able to remove or re-add from the event on the calendar", () => {
    cy.visit("http://localhost:3000/home");
    cy.get(":nth-child(3) > :nth-child(2) > .MuiButtonBase-root").click();
    cy.get("input").type("cs111").type("{enter}");
    cy.get(":nth-child(4) > .MuiPaper-root").click();
    cy.get(".css-hlnzui-MuiTypography-root > :nth-child(2)").click();

    cy.get(".css-hlnzui-MuiTypography-root > :nth-child(2)").type("{esc}");
    cy.get("body").type("{esc}");
    cy.get(
      ".fc-day-fri > .fc-timegrid-col-frame > :nth-child(2) > .fc-timegrid-event-harness >.fc-event > .fc-event-main > .fc-event-main-frame > .fc-event-time ",
    ).click();
    cy.get(".css-hlnzui-MuiTypography-root > :nth-child(1)").should("exist");
    cy.get(".css-hlnzui-MuiTypography-root > :nth-child(1)").click();
    cy.get(
      ".fc-day-fri > .fc-timegrid-col-frame > :nth-child(2) > .fc-timegrid-event-harness >.fc-event > .fc-event-main  ",
    ).should("not.exist");
    cy.get(".css-hlnzui-MuiTypography-root > :nth-child(2)").click();
    cy.get(
      ".fc-day-fri > .fc-timegrid-col-frame > :nth-child(2) > .fc-timegrid-event-harness ",
    ).should("exist");
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
});
