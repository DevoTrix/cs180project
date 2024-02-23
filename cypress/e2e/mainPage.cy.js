describe('drawer', () =>{
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
  it('My Courses should open another bar containing classes over calendar when clicked', () => {
    cy.visit('http://localhost:3000/home');
    cy.log('still needs implementing')
    // test if event is added
    //test if event is repeating correctly
  })
  it('Add / delete should open another bar containing list view of added classesover calendar when clicked', () => {
    cy.visit('http://localhost:3000/home');
    cy.log('still needs implementing')
    // test if event is added
    //test if event is repeating correctly
  })
  it('logout should redirect back to quarter', () => {
    cy.visit('http://localhost:3000/home');
    cy.log('still needs implementing')
    // test if event is added
    //test if event is repeating correctly
  })
})
describe('calendar', () => {
    it('loads calendar', () => {
      cy.visit('http://localhost:3000/home');
      cy.get('.fc').should('exist');
    })
    it('adds events to the calendar correctly', () => {
      cy.visit('http://localhost:3000/home');
      cy.log('still needs implementing')
      // test if event is added
      //test if event is repeating correctly
    })
    it('able to create a custom event', () => {
      cy.visit('http://localhost:3000/home');
      cy.log('still needs implementing')
      // test if event is added
      //test if event is repeating correctly
    })
  describe('css', ()=>{
    it('changes from light to dark correctly and vice versa', () => {
      cy.visit('http://localhost:3000/home');
      cy.log('still needs implementing')
      // test if event is added
      //test if event is repeating correctly
    })
  })
})