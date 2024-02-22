describe('template spec', () => {
  it('renders the initial view of screen', () => {
    cy.visit('http://localhost:3000');
    cy.get('[id=testButton]').should("exist").should('have.text', "Quarters");
    cy.get('[id=winter').should("not.exist");
    cy.get('[id=spring]').should("not.exist");
    cy.get('[id=testButton]').click();
    cy.get('[id=winter').should("exist");
    cy.get('[id=spring]').should("exist");
  })

})