import React from 'react';

import './checkbox.scss';

type CheckboxType = {
  checked: boolean,
  children: string,
}

const Checkbox = ({checked, children}:CheckboxType) => {
  return (
    <label className="checkbox-container">
      <input type="checkbox" defaultChecked={checked}/>
      <span className="checkbox-checkmark"></span>
      <div className="text">{children}</div>
    </label>
  )
}

export default Checkbox;