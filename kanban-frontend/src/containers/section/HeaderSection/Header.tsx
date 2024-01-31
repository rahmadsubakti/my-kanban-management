import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { useBoardList, useBoardDetail } from "@/utils/stateStore";
import useModal from "@/utils/useModal";
import { getUserInfoRequest, logoutRequest, sendBoardDelete } from "@/utils/request";
import router from "@/utils/route";
import { EditButton, DeleteButton } from "@/components/IconButton/IconButton";
import Modal from "@/components/Modal/Modal";
import BoardForm from "@/forms/BoardForm";
import DeleteDialog from "@/containers/Dialog/Dialog";

import "./header.scss";

const HeaderContent = ({ id, name }) => {
  const [showModalEdit, openModalEdit, closeModalEdit] = useModal();
  const [showModalDel, openModalDel, closeModalDel] = useModal();

  const { deleteBoard } = useBoardList();
  //const { resetBoard } = useBoardDetail();
  const OnDelete = async (id) => {
    const response = await sendBoardDelete(id);
    deleteBoard(id);
    router.history.push('/');
  }

  return (
    <>
      <div className="board-title-container">
        <h1 className="board-title">{name}</h1>
        <div className="btn-groups">
          <EditButton title="Edit this board" onClick={openModalEdit} />
          <DeleteButton title="Delete this board" onClick={openModalDel} />
        </div>
      </div>
      <Modal showModal={showModalEdit} closeModal={closeModalEdit}>
        <BoardForm
          value={{ id: id, name: name }}
          closeModalAction={closeModalEdit}
        />
      </Modal>
      <Modal showModal={showModalDel} closeModal={closeModalDel}>
        <DeleteDialog
          type="board"
          name={name}
          onDelete={() => OnDelete(id)}
          onCancel={closeModalDel}
        />
      </Modal>
    </>
  );
};

const UserInfo = () => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    getUserInfoRequest()
      .then(res => setUserName(res.data.username))
  })

  const onLogout = () => {
    logoutRequest()
      .then(() => Cookies.remove('token'))
      .then(() => router.history.push('/'))
  }
  return (
    <div className="user-info">
      <h4>Hi, {userName}</h4>
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </div>
  )
}

const Header = () => {
  const { id, name } = useBoardDetail();
  
  useEffect(() => {
    document.title = name;
  }, [name])
  
  return (
    <header>
      {id && <HeaderContent id={id} name={name} />}
      <UserInfo />
    </header>
  );
};

export default Header;
