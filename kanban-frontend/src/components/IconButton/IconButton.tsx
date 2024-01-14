import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import './icon-button.scss';

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const EditButton:React.FC<buttonProps> = ({...rest}) => {
  return (
    <button className="btn-icon btn-edit" {...rest}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  )
}

export const DeleteButton:React.FC<buttonProps> = ({...rest}) => {
  return (
    <button className="btn-icon btn-del" {...rest}>
      <FontAwesomeIcon  icon={faTrash} />
    </button>
  )
}