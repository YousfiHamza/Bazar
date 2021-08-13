// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe.only('Sign Up Page Normal display', () => {

  const myEmail = 'myEmail3@test.com'
  const myPassword = 'password2'

  beforeEach(() => {
    cy.visit('https://bazar.dev/auth/signup')
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

  it.only('should sign us up and take us to the home page if inputs are valid', () => {

    cy.intercept('POST', '/api/users/signup', {
      statusCode: 201,
    }).as('signup')

    cy.get('[data-testid=input-email]')
    .type(myEmail)
    .should('have.value', myEmail)

    cy.get('[data-testid=input-password]')
    .type(myPassword)
    .should('have.value', myPassword)

    cy.get('button')
    .should('have.class', 'btn btn-primary')
    .click()

    cy.wait('@signup')

    cy.location('pathname')
    .should('eq', '/')
  })

})

describe('Sign Up Page Error Display',() => {
  

  const myEmail = 'myEmail@test.com'
  const myPassword = 'password'

  const wrongEmail = 'myEmail'
  const wrongPassword = '123'

  beforeEach(() => {
    cy.visit('https://bazar.dev/auth/signup')
  })


  it('should show error block when inputs are empty', () => {

    cy.intercept('POST', '/api/users/signup', {
      statusCode: 400,
      body: {
      errors: [
        {
          message: 'Email Must Be Provided !'
        },
        {
          message: 'Password must be between 4 and 20 caracters !'
        }
      ]
      }
    }).as('emptyy') 

    cy.get('button')
    .should('have.class', 'btn btn-primary')
    .click()

    cy.wait('@emptyy')

    cy.get('.alert.alert-danger')
    .should('be.visible')

    cy.get('.alert.alert-danger ul li')
    .should('have.length', 2)

    cy.get('[data-testid=input-email]')
    .type(myEmail)

    cy.intercept('POST', '/api/users/signup', {
      statusCode: 400,
      body: {
      errors: [
        {
          message: 'Password must be between 4 and 20 caracters !'
        }
      ]
      }
    }).as('emaili') 

    cy.get('button')
    .click()

    cy.wait('@emaili')

    cy.get('.alert.alert-danger')
    .should('be.visible')

    cy.get('.alert.alert-danger ul li')
    .should('have.length', 1)

    cy.visit('https://bazar.dev/auth/signup')
    
    cy.get('[data-testid=input-password]')
    .type(myPassword)
    
    cy.intercept('POST', '/api/users/signup', {
      statusCode: 400,
      body: {
      errors: [
        {
          message: 'Email Must Be Provided !'
        }
      ]
      }
    }).as('ipass') 

    cy.get('button')
    .click()

    cy.wait('@ipass')

    cy.get('.alert.alert-danger')
    .should('be.visible')

    cy.get('.alert.alert-danger ul li')
    .should('have.length', 1)

  })

  it('should show error block when password is valid but the email is not', () => {

    // wrong email correct password
    cy.get('[data-testid=input-email]')
    .type(wrongEmail)

    cy.get('[data-testid=input-password]')
    .type(myPassword)

    cy.intercept('POST', '/api/users/signup', {
      statusCode: 400,
      body: {
      errors: [
        {
          message: 'Email Must Be Provided !'
        }
      ]
      }
    }).as('ipass') 

    cy.get('button')
    .click()

    cy.wait('@ipass')

    cy.get('.alert.alert-danger')
    .should('be.visible')

    cy.get('.alert.alert-danger ul li')
    .should('have.length', 1)
  })

  it('should show error block when email is valid but the password is not', () => {

    // wrong email correct password

    cy.get('[data-testid=input-email]')
    .type(myEmail)
    
    cy.get('[data-testid=input-password]')
    .type(wrongPassword)

    cy.intercept('POST', '/api/users/signup', {
      statusCode: 400,
      body: {
      errors: [
        {
          message: 'Password must be between 4 and 20 caracters !'
        }
      ]
      }
    }).as('emaili') 

    cy.get('button')
    .click()

    cy.wait('@emaili')

    cy.get('.alert.alert-danger')
    .should('be.visible')

    cy.get('.alert.alert-danger ul li')
    .should('have.length', 1)
  })

})
