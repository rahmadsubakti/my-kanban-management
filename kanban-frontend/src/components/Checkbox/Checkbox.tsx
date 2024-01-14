import React from 'react';

import './checkbox.scss';

// add register for react hook form later

const Checkbox = ({children}) => {
  return (
    <label className="checkbox-container">
      <input type="checkbox" defaultChecked/>
      <span className="checkbox-checkmark"></span>
      <div className="text">{children}</div>
    </label>
  )
}

export default Checkbox;