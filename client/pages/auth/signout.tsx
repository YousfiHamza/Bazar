import Router from 'next/router'
import { useEffect } from 'react'
import useRequest from '../../hooks/useRequest'

const SignOut = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    methode: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  })

  useEffect(() => {
    doRequest()
  }, [])

  return <div>Signing You Out ... !</div>
}

export default SignOut
