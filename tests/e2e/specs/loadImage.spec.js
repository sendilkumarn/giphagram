import { LIMIT } from '../../../src/services/constants'
import { checkImagesHolder, doScroll } from '../fixtures/fixtures'

describe('search images', function () {
  it('search for the image', function () {
    cy.search('cat')
    checkImagesHolder('single', true)
  })

  it('throws error when the query is empty', function () {
    cy.search('')
    checkImagesHolder('single', false)
    cy.get('.error-msg')
      .contains('Enter valid query')
  })

  it('toggles layout when the toggle display is clicked', function () {
    cy.search('cat')
    checkImagesHolder('single', true)
    cy.toggleDisplay()
    checkImagesHolder('triple', true)
  })

  it('throws error when the result is empty', function () {
    cy.search('asdasdadasdadaadadad')
    checkImagesHolder('single', false)
    cy.get('.error-msg')
      .contains('Error loading images try searching other.')
  })

  it('scroll will load more images', function () {
    cy.search('cat')
    checkImagesHolder('single', true)
    cy.get('.image-container').find('img').should('have.length', LIMIT)

    doScroll()

    cy.get('.image-container').find('img').should('have.length', 2 * LIMIT)

    doScroll()

    cy.get('.image-container').find('img').should('have.length', 3 * LIMIT)
  })

  it('lazy loads the images', function () {
    cy.search('cat')
    cy.get('.image-container').find('.image-spinner').should('have.length', LIMIT)
    cy.get('.image-wrapper').find('.image-item').should('have.length', LIMIT)
  })
})
