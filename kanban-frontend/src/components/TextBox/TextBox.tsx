import React from 'react';

import './textbox.scss';

const TextBox = () => {
  return (
    <div className="textbox-container">
      <input type="text"/>
      <span className="text-error">Can't be empty</span>
    </div>
  )
}

export default TextBox;