import { useBoardDetail } from "@/utils/stateStore";
import useModal from "@/utils/useModal";
import { EditButton, DeleteButton } from "@/components/IconButton/IconButton";
import Modal from "@/components/Modal/Modal";
import BoardForm from "@/forms/BoardForm";

import './header.scss';

const Header = () => {
  const name = useBoardDetail((state:any) => state.name)
  const [showModalEdit, openModalEdit, closeModalEdit] = useModal();
  const [showModalDel, openModalDel, closeModalDel] = useModal();

  return (
    <header>
      <div className="board-title-container">
        <h1 className="board-title">{name}</h1>
        <div className="btn-groups">
          <EditButton 
            title="Edit this board"
            onClick={openModalEdit}
          />
          <DeleteButton 
            title="Delete this board"
            onClick={openModalDel}
          />
        </div>
      </div>
      <Modal showModal={showModalEdit} closeModal={closeModalEdit}><BoardForm /></Modal>
    </header>
  )
}

export default Header;