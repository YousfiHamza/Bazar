import Link from 'next/link'
import { CurrentUserModel } from '../models/CurrentUserModel'

interface Props {
  currentUser: CurrentUserModel
}

const Header = ({ currentUser }: Props) => {

  const links = [
    !currentUser && {label: 'Sign Up', href: '/auth/signup'},
    
    !currentUser && {label: 'Sign In', href: '/auth/signin'},
    
    currentUser && {label: 'Sign Out', href: '/auth/signout'}
  ]
  .filter(linkObject => linkObject)
  .map(link => (
    <li key={link.href}>
      <Link href={link.href}>
        <a className="nav-link">
          {link.label}
        </a>
      </Link>
    </li>
  ))

  return (
    <nav className="navbar nav-light bg-light">
      <Link href="/">
        <a className="navbar-brand">BAZAR</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links}
        </ul>
      </div>
    </nav>
  )
}

export default Header
