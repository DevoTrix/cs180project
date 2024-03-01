describe('functionality', () => {
  it('renders the initial view of screen', () => {
    cy.visit('http://localhost:3000');
    cy.get('.base-MenuButton-root').should("exist").should('have.text', "Quarters");
    cy.get('[name = "selection"]').should("not.exist");
  })

  it('tests quarter button', () => {
    cy.visit('http://localhost:3000');

    cy.get('.base-MenuButton-root').click();
    cy.get('[name = "selection"]').should("exist");
  })
  
  it('redirects when winter button is clicked', () =>{
    cy.visit('http://localhost:3000');
    cy.get('.base-MenuButton-root').click();
    cy.get('[name = "selection"]').should("exist");
    cy.get('[name = "button1"]').click();
    cy.location().should((loc) => {
      expect(loc.pathname.toString()).to.contain('/home');
    });
  })
  it('redirects when spring button is clicked', () =>{
    cy.visit('http://localhost:3000');
    cy.get('.base-MenuButton-root').click();
    cy.get('[name = "selection"]').should("exist");
    cy.get('[name = "button2"]').click();
    cy.location().should((loc) => {
      expect(loc.pathname.toString()).to.contain('/home');
    });
  })
  
})

describe('css', ()=>{
  it('has the right background gif',()=>{
    cy.visit('http://localhost:3000');
    cy.get('[class="quarter"]').then(($background) => {
      const backgroundImageUrl = $background.css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      cy.request(backgroundImageUrl).then((response) => {
        expect(response.headers['content-type']).to.include('gif');
      })
    });
  })
  it('check if logo is printed', ()=>{
    cy.visit('http://localhost:3000');
    cy.get('[name="imagelogo"]').should('be.visible');
  })
  
})