import React from 'react';

import './checkbox.scss';

type CheckboxType = {
  checked: boolean,
  value: string,
  onChange: any, // replace with appropriate type later
  children: string,
}

const Checkbox = ({checked, value, onChange, children}:CheckboxType) => {
  return (
    <label className="checkbox-container">
      <input type="checkbox" defaultChecked={checked} value={value} onChange={onChange}/>
      <span className="checkbox-checkmark"></span>
      <div className="text">{children}</div>
    </label>
  )
}

export default Checkbox;