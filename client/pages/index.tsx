import { NextPageContext } from 'next'
import Head from 'next/head'
import buildClient from '../api-utils/build-client'

const Home = ({ currentUser }) => {
  console.log(currentUser.email)
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

Home.getInitialProps = async (ctx: NextPageContext) => {
  const client = buildClient(ctx)
  const { data } = await client.get('/api/users/currentuser')
  return data
}

export default Home
