import { Link } from '@tanstack/react-router';

import logo from '@/logo.svg';
import './section.scss';

type sectionType = {
  children: any
}

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src={logo} />
      <h1>kanban</h1>
    </Link>
  )
}

export const SideSection = ({children}:sectionType) => {
  return (
    <section className="side-section">
      <Logo />
      {children}
    </section>
  )
}

export const MainSection = ({children}:sectionType) => {
  return (
    <section className="main-section">{children}</section>
  )
}