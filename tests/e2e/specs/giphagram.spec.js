describe('General UI tests', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('button', 'Search')
    cy.contains('button', 'Switch to 3-column')
    cy.get('#app').find('input')
  })
})
