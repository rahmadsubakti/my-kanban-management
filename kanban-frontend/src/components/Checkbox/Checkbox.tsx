import {ComponentPropsWithoutRef} from 'react';

import './checkbox.scss';

/*type CheckboxType = {
  checked: boolean,
  value: string,
  onChange: any, // replace with appropriate type later
  children: string,
}*/

interface CheckboxType extends ComponentPropsWithoutRef<"input"> {

}

const Checkbox = ({children, ...rest}:CheckboxType) => {
  return (
    <label className="checkbox-container">
      {/*<input type="checkbox" defaultChecked={checked} value={value} onChange={onChange}/>*/}
      <input type="checkbox" {...rest} />
      <span className="checkbox-checkmark"></span>
      <div className="text">{children}</div>
    </label>
  )
}

export default Checkbox;