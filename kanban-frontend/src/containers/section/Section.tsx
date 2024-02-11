import { Link } from '@tanstack/react-router';

import logo from '@/logo.svg';
import './section.scss';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';

type sectionType = {
  children: any
}

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src={logo} />
      <h1 className='text-theme'>kanban</h1>
    </Link>
  )
}

export const SideSection = ({children}:sectionType) => {
  return (
    <section className="secondary-bg-theme side-section">
      <Logo />
      {children}
      <ThemeSwitcher />
    </section>
  )
}

export const MainSection = ({children}:sectionType) => {
  return (
    <section className="bg-theme">{children}</section>
  )
}