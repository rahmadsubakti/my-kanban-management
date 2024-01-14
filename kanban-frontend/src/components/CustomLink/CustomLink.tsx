
import './custom-link.scss';
import './fontello.css';

const CustomLink = ({children}) => {

  // include active classname if link is active
  return (
    <a href="#" className='custom-link' >
      <i className="icon-shape"></i>
      <h3>{children}</h3>
    </a>
  )
}

export default CustomLink;