import {ComponentPropsWithoutRef} from "react";
import './label.scss';

interface LabelType extends ComponentPropsWithoutRef<"label"> {}

const Label= ({children, ...rest}:LabelType) => {
  return <label className="Label" {...rest}>{children}</label>
}

export default Label;