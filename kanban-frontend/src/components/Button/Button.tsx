import React, { PropsWithoutRef } from "react";

import './button.scss';

type ButtonProps = {
  typeButton?: String,
  OnClick: Function,
  children: any
}

// FIX THE GODDAMNIT BUTTON TYPE

const Button = ({typeButton, children, OnClick}:ButtonProps) => {
  return <button className={`btn ${typeButton}`} onClick={OnClick}>{children}</button>
}

export const PrimaryBtn = ({children, OnClick}:ButtonProps) => {
  return <Button typeButton="primary" OnClick={OnClick}>{children}</Button>
}

export const SecondaryBtn = ({children, OnClick}:ButtonProps) => {
  return <Button typeButton="secondary" OnClick={OnClick}>{children}</Button>
}

export const DangerBtn = ({children, OnClick}:ButtonProps) => {
  return <Button typeButton="danger" OnClick={OnClick}>{children}</Button>
}