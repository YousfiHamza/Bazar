// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Sign In Page Normal display', () => {

  const myEmail = 'myEmail@test.com'
  const myPassword = 'password'

  beforeEach(() => {
    cy.visit('https://bazar.dev/auth/signin')
  })

  it('should display form completely', () => {
    cy.get('.title')
    .should('be.visible')

    cy.get('[data-testid=input-email]')
    .should('be.visible')

    cy.get('[data-testid=input-password]')
    .should('be.visible') 

    cy.get('button')
    .should('have.class', 'btn btn-primary')
    .should('be.visible')
  })

  it('should change value when typing in inputs', () => {

    cy.get('[data-testid=input-email]')
    .type(myEmail)
    .should('have.value', myEmail)

    cy.get('[data-testid=input-password]')
    .type(myPassword)
    .should('have.value', myPassword)
  })

  
})

describe('Sign In Page Error Display',() => {
  

  const myEmail = 'myEmail@test.com'
  const myPassword = 'password'

  const wrongEmail = 'myEmail'
  const wrongPassword = '123'

  beforeEach(() => {
    cy.visit('https://bazar.dev/auth/signin')
  })


  it('should show error block when inputs are empty', () => {

    cy.get('button')
    .should('have.class', 'btn btn-primary')
    .click()

    cy.get('.alert.alert-danger')
    .should('be.visible')

    cy.get('[data-testid=input-email]')
    .type(myEmail)

    cy.get('button')
    .click()

    cy.get('.alert.alert-danger')
    .should('be.visible')

    cy.visit('https://bazar.dev/auth/signin')
    
    cy.get('[data-testid=input-password]')
    .type(myPassword)
    
    cy.get('button')
    .click()

    cy.get('.alert.alert-danger')
    .should('be.visible')

  })

  it('should show error block when password is valid but the email is not', () => {

    // wrong email correct password
    cy.get('[data-testid=input-email]')
    .type(wrongEmail)

    cy.get('[data-testid=input-password]')
    .type(myPassword)

    cy.get('button')
    .click()

    cy.get('.alert.alert-danger')
    .should('be.visible')
  })

  it('should show error block when email is valid but the password is not', () => {

    // wrong email correct password
    cy.get('[data-testid=input-password]')
    .type(wrongPassword)

    cy.get('[data-testid=input-email]')
    .type(myEmail)

    cy.get('button')
    .click()

    cy.get('.alert.alert-danger')
    .should('be.visible')
  })

})
