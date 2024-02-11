import { ComponentPropsWithoutRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarAndCrescent, faSun } from "@fortawesome/free-solid-svg-icons";

import './theme-switcher.scss';

interface TSwitcher extends ComponentPropsWithoutRef<"input"> {}

const Switcher = ({...rest}:TSwitcher) => {
  return (
    <div className="switcher-container">
      <input type="checkbox" {...rest} />
      <span className="toggle"></span>
    </div>
  )
}

const ThemeSwitcher = () => {

  const onChange = () => {
    const htmlSelector = document.querySelector('html')
    const theme = htmlSelector?.getAttribute('data-theme')
    if (theme == 'light') {
      htmlSelector?.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlSelector?.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  return (
    <div className="bg-theme theme-switcher-container">
      <div className="input-groups">
        <FontAwesomeIcon icon={faSun} />
        <Switcher defaultChecked={localStorage.getItem('theme') == 'dark'} onChange={onChange}/>
        <FontAwesomeIcon icon={faStarAndCrescent} />
      </div>
    </div>
  )
}
export default ThemeSwitcher;