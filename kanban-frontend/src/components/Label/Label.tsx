import React from "react";
import './label.scss';

const Label:React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({children, ...rest}) => {
  return <label className="Label" {...rest}>{children}</label>
}

export default Label;