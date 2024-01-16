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

function App() {

  return (
    <>
      <Main />
    </>
  )
}

export default App
