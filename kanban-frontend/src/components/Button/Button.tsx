import { ComponentPropsWithoutRef } from "react";

import './button.scss';

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  typeButton?: string,
  children: any,
}

// FIX THE GODDAMNIT BUTTON TYPE
// Finally, found it :)

const Button = ({typeButton, children, ...rest}:ButtonProps) => {
  return <button className={`btn ${typeButton}`} {...rest}>{children}</button>
}

export const PrimaryBtn = ({children, ...rest}:ButtonProps) => {
  return <Button typeButton="primary" {...rest}>{children}</Button>
}

export const SecondaryBtn = ({children, ...rest}:ButtonProps) => {
  return <Button typeButton="secondary" {...rest}>{children}</Button>
}

export const DangerBtn = ({children, ...rest}:ButtonProps) => {
  return <Button typeButton="danger" {...rest}>{children}</Button>
}