describe('displayLayout', function () {
  it('change the layout button text on click', () => {
    cy.visit('/')
    cy.contains('button', 'Switch to 3-column')
    cy.get('#toggle-display').click()
    cy.contains('button', 'Switch to 1-column')
    cy.get('#toggle-display').click()
    cy.contains('button', 'Switch to 3-column')
  })
})
