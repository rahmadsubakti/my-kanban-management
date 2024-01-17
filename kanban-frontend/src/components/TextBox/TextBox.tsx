import React from 'react';

import './textbox.scss';

const TextBox = ({fieldName, register, properties, errors}) => {
  return (
    <div className="textbox-container">
      <input type="text" {...register(fieldName, properties)}/>
      {errors[fieldName] && <span className="text-error">Can't be empty</span>}
    </div>
  )
}

export default TextBox;