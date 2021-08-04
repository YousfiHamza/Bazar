import axios, { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { ErrorModel } from '../pages/models/error.model'

const useRequest = ({ url, methode, body, onSuccess }) => {
  const [errors, setErrors] = useState<ErrorModel[]>([])

  const doRequest = async () => {
    try {
      setErrors([])
      const response: AxiosResponse = await axios[methode](url, body)
      if (onSuccess) onSuccess(response.data)
      return response.data
    } catch (err) {
      const myError: AxiosError = err
      setErrors(myError.response.data.errors)
    }
  }

  return { errors, doRequest }
}

export default useRequest
