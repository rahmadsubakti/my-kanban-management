import {ComponentPropsWithoutRef} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faX } from "@fortawesome/free-solid-svg-icons";

import './icon-button.scss';

interface buttonProps extends ComponentPropsWithoutRef<"button"> {}

export const EditButton = ({...rest}:buttonProps) => {
  return (
    <button className="btn-icon btn-edit" {...rest}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  )
}

export const DeleteButton= ({...rest}:buttonProps) => {
  return (
    <button className="btn-icon btn-del" {...rest}>
      <FontAwesomeIcon  icon={faTrash} />
    </button>
  )
}

export const DeleteItemButton = ({...rest}:buttonProps) => {
  return (
    <button className="btn-icon btn-del-item" {...rest}>
      <FontAwesomeIcon  icon={faX} />
    </button>
  )
}