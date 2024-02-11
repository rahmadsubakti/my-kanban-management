import {ComponentPropsWithoutRef} from "react";
//import '@/App.scss';
import './label.scss';

interface LabelType extends ComponentPropsWithoutRef<"label"> {}

const Label= ({children, ...rest}:LabelType) => {
  return <label className="text-theme Label" {...rest}>{children}</label>
}

export default Label;