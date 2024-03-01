import Calendar from '../../src/components/Calendar'
describe('Calendar.cy.js', () => {
  it('mounting the Calendar', () => {
    // cy.mount()
    cy.mount(<Calendar />)
  });
  let text;
  it('changes date when clicking next', () =>{
    cy.mount(<Calendar />)
    cy.get('#fc-dom-16').then( ($date) =>{
       text = $date.text();
       cy.log(text)
       cy.get('.fc-next-button > .fc-icon').click();
      // need to change the 
      cy.get('#fc-dom-16').should('not.have.value', text);
    });
  })
  it('changes date when clicking prev', () =>{
    cy.mount(<Calendar />)
    cy.get('#fc-dom-45').then( ($date) =>{
       text = $date.text();
       cy.log(text)
       cy.get('.fc-prev-button > .fc-icon').click();
      // need to change the 
      cy.get('#fc-dom-45').should('not.have.value', text);
    });
  })
})