import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import './modal.scss';

type ModalContainerType = {
  closeModal: Function,
  children: any
}

const ModalContainer = ({closeModal, children}: ModalContainerType) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e:MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (ref.current && ref.current.className == e.target.className) {
          closeModal();
        }
      }
    }
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, [closeModal])

  return (
    <div className="modal" ref={ref}>
      <div className="modal-container">
        {children}
      </div>
    </div>
  )
}

interface ModalType extends ModalContainerType  {
  showModal: boolean,
}

const Modal = ({showModal, closeModal, children}:ModalType) => {
  return (
    <>
      {showModal && createPortal(
        <ModalContainer closeModal={closeModal}>{children}</ModalContainer>, 
        document.body
      )}
    </>
  )
}

export default Modal;