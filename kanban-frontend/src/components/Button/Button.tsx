import React from "react";

import './button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  typeButton: string
}

const Button:React.FC<ButtonProps> = ({typeButton, children, ...rest}) => {
  return <button className={`btn ${typeButton}`} {...rest}>{children}</button>
}

export const PrimaryBtn:React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > = ({children, ...rest}) => {
  return <Button typeButton="primary" {...rest}>{children}</Button>
}

export const SecondaryBtn:React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > = ({children, ...rest}) => {
  return <Button typeButton="secondary" {...rest}>{children}</Button>
}

export const DangerBtn:React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > = ({children, ...rest}) => {
  return <Button typeButton="danger" {...rest}>{children}</Button>
}