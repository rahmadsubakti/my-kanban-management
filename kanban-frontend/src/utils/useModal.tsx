import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return {
    showModal: showModal,
    openModal: openModal,
    closeModal: closeModal,
  }
}

export default useModal;