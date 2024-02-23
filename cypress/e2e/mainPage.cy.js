describe('functionality', () => {
    it('renders the initial view of screen', () => {
      cy.visit('http://localhost:3000/home');
      cy.get('.MuiToolbar-root > .MuiButtonBase-root').should("not.be.hidden");
    })
    it('opens drawer', () => {
      cy.visit('http://localhost:3000/home');
      cy.get(':nth-child(3) > :nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').should('be.hidden')
      cy.get('.MuiToolbar-root > .MuiButtonBase-root').click();
      cy.get(':nth-child(3) > :nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').should('not.be.hidden')
    })
    
  describe('css', ()=>{

  })
})