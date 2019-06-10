Cypress.Commands.add('search', query => {
  cy.visit('/')
  if (query) {
    cy.get('#search-input').type(query)
  }
  cy.get('#search-button').click()
})

Cypress.Commands.add('toggleDisplay', () => {
  cy.get('#toggle-display').click()
})
