import app, { AppContext, AppProps } from 'next/app'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api-utils/build-client'
import Header from '../components/header'

interface myProps extends AppProps {
  currentUser: {
    id: string
    email: string
  }
}

const App = ({ Component, pageProps, currentUser }: myProps) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  )
}

// context in this component is different from context in other normal component appContext.ctx instead of directly ctx in other components
App.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')
  let pageProps = {}
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }
  return {
    pageProps,
    ...data,
  }
}

export default App
