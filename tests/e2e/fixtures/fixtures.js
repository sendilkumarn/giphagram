export function checkImagesHolder (className, isVisible) {
  const imageHolder = cy.get('.image-container')
    .find('.image-holder')
  if (isVisible) {
    imageHolder.should('have.class', className)
  } else {
    imageHolder.should('not.have.class', className)
  }
}

export function doScroll () {
  cy.scrollTo('bottom', { duration: 2000 })
  cy.scrollTo(0, 1000, { duration: 2000 })
}
