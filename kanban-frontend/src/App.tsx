import './App.scss';

import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import TaskForm from './forms/TaskForm';

function App() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Show modal</button>
      <Modal 
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      >
        <TaskForm />
      </Modal>
    </>
  )
}

export default App
