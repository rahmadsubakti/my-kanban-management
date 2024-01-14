import './App.scss';

import { useState } from 'react';
import Modal from 'components/Modal/Modal';

function App() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Show modal</button>
      <Modal 
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      >
        <h1>This is modal</h1>
      </Modal>
    </>
  )
}

export default App
