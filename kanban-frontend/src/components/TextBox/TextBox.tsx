import {ComponentPropsWithoutRef} from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import './textbox.scss';

interface TextBoxType extends ComponentPropsWithoutRef<"input"> {
  fieldName: string,
  register: Function,
  properties: any, // temporary
  errors: any, // temporary
}

const TextBox = ({fieldName, register, properties, errors, ...rest}:TextBoxType) => {
  return (
    <div className="textbox-container">
      <input id={fieldName} {...rest} {...register(fieldName, properties)}/>
      {errors[fieldName] && <span className="text-error">Can't be empty</span>}
    </div>
  )
}

export default TextBox;