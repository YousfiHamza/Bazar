// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('HomePage Normal display', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('show the hello', () => {
    cy.fixture('data').then((data) => {
      cy.get('.homePage')
      cy.contains(data.hello)
    })
  })
})
