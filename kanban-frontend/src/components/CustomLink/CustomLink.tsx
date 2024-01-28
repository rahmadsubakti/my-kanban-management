import { Link } from '@tanstack/react-router';

import './custom-link.scss';
import './fontello.css';

export const IconLink = () => <i className="icon-shape"></i>

type LinkType = {
  href: string,
  children: string,
}
export const CustomLink = ({href, children}:LinkType) => {

  // include active classname if link is active
  return (
    <Link to={href} className='custom-link' activeOptions={{exact: true}}>
      <IconLink />
      <h3>{children}</h3>
    </Link>
  )
}