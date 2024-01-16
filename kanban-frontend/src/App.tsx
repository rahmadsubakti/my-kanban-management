import './App.scss';

import { SideSection, MainSection } from './containers/section/Section';
import BoardListSection from './containers/section/BoardListSection/BoardListSection';
import Header from './containers/section/HeaderSection/Header';
import BoardDetailSection from './containers/section/BoardDetailSection/BoardDetailSection';
import Modal from './components/Modal/Modal';

const Main = () => {
  return (
    <main>
      <SideSection><BoardListSection /></SideSection>
      <MainSection>
        <Header />
        <BoardDetailSection />
      </MainSection>
    </main>
  )
}


import TaskInfo from './containers/TaskInfo/TaskInfo';

import useModal from './utils/useModal';

function App() {
  const { showModal, openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={openModal}>Show modal</button>
      <Modal showModal={showModal} closeModal={closeModal}><TaskInfo /></Modal>  
    </>
  )
}

export default App;
