import axios from 'axios'
import { NextPageContext } from 'next/dist/next-server/lib/utils'

const buildClient = ({ req }: NextPageContext) => {
  if (typeof window === 'undefined') {
    // we are on the server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    })
  }
  // we are on the client
  return axios.create({
    baseURL: '/',
  })
}

export default buildClient
