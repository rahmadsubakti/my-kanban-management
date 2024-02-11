import { ComponentPropsWithoutRef } from 'react';

import './textarea.scss';

interface TTextArea extends ComponentPropsWithoutRef<"textarea"> {
  fieldName: string,
  register: Function,
}

const TextArea = ({fieldName, register, ...rest}:TTextArea) => {
  return (
    <div className="text-theme textarea-container">
      <textarea {...rest} {...register(fieldName)} />
    </div>
  )
}

export default TextArea;