import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SignIn from '../../pages/auth/signin'

const myEmail = 'myEmail@test.com'
const myPassword = 'password'

describe('Normal Display', () => {
  it('should display form completely', () => {
    const { getByRole, getByTestId } = render(<SignIn />)

    const title = screen.getByRole('heading')
    const button = getByRole('button')

    const email = getByTestId('input-email')
    const password = getByTestId('input-password')

    expect(title).toHaveTextContent('Sign In')
    expect(button).toHaveTextContent('Submit')
    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
  })

  it('should be able to type in the email input', () => {
    const { getByTestId } = render(<SignIn />)

    const email = getByTestId('input-email') as HTMLInputElement

    fireEvent.change(email, { target: { value: myEmail } })
    expect(email.value).toBe(myEmail)
  })

  it('should be able to type in the password input', () => {
    const { getByTestId } = render(<SignIn />)

    const password = getByTestId('input-password') as HTMLInputElement

    fireEvent.change(password, { target: { value: myPassword } })
    expect(password.value).toBe(myPassword)
  })
})

// describe('Error Display', () => {
//   it('should display Error Block', async () => {
//     render(<SignIn />)
//     const button = screen.getByRole('button')

//     fireEvent.click(button)

//     const oops = await screen.findByText('Ooopps ... ')

//     expect(oops).toBeInTheDocument()
//   })
// })
