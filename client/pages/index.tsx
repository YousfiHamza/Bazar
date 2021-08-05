import { NextPageContext } from 'next'
import Head from 'next/head'
import buildClient from '../api-utils/build-client'

const Home = ({ currentUser }) => {
  console.log(currentUser)
  return (
    <>
      <Head>
        <title>Bazar</title>
      </Head>
      <div className="homePage container">
        {currentUser ? <h1>Hello From The Other Side</h1> : <h1>You need to Login first</h1>}
      </div>
    </>
  )
}

Home.getInitialProps = async ({ req }: NextPageContext) => {
  const client = buildClient({ req })
  const data = await client.get('/api/users/currentuser')
  return data.data
}

export default Home
