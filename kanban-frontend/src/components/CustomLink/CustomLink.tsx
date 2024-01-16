
import './custom-link.scss';
import './fontello.css';

export const IconLink = () => <i className="icon-shape"></i>

type LinkType = {
  children: string,
}
export const CustomLink = ({children}:LinkType) => {

  // include active classname if link is active
  return (
    <a href="#" className='custom-link' >
      <IconLink />
      <h3>{children}</h3>
    </a>
  )
}