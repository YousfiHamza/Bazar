import next from 'next'
import { credentialsModel } from '../models/userModel'
import Link from 'next/link'

interface Props {
  currentUser: credentialsModel
}

const Header = ({ currentUser }: Props) => {
  return (
    <nav className="navbar nav-light bg-light">
      <Link href="/">
        <a className="navbar-brand">BAZAR</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          <li>Sign in</li>
          <li>Sign up</li>
          <li>Sign out</li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
