import { ChangeEvent, FormEvent, useState } from 'react'
import { ErrorModel } from '../models/error.model'
import useRequest from '../../hooks/useRequest'
import Router from 'next/router'

interface InputForm {
  email: string
  password: string
}

const SignUp = () => {
  const [inputForm, setInputForm] = useState<InputForm>({
    email: '',
    password: '',
  })
  let { errors, doRequest } = useRequest({
    url: '/api/users/signup',
    methode: 'post',
    body: inputForm,
    onSuccess: () => Router.push('/'),
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    doRequest()
  }

  const displayErrors = () =>
    errors.map((myError: ErrorModel, index: number) => <li key={index}> {myError.message} </li>)

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Email Address :</label>
          <input
            onChange={handleChange}
            value={inputForm.email}
            name="email"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Password :</label>
          <input
            onChange={handleChange}
            value={inputForm.password}
            name="password"
            className="form-control"
            type="password"
          />
        </div>
        <button className="btn btn-primary">Sign Up</button>
      </form>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h4>Ooopps ... </h4>
          <ul className="my-0">{displayErrors()}</ul>
        </div>
      )}
    </div>
  )
}

export default SignUp
