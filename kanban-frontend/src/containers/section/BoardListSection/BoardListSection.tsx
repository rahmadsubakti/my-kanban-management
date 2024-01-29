import { useEffect } from "react";

import {IconLink, CustomLink} from "@/components/CustomLink/CustomLink";
import BoardForm from "@/forms/BoardForm";
import Modal from "@/components/Modal/Modal";
import useModal from "@/utils/useModal";
import { useBoardList } from "@/utils/stateStore";
import { BoardType } from "@/utils/types";

import './board-list-section.scss';

const BoardListSection = () => {
  const {boards, setBoards} = useBoardList();
  const [showModalBoardForm, openModalBoardForm, closeModalBoardForm] = useModal();

  useEffect(() => {
    setBoards();
  }, [])

  return (
    <div className="board-list-containers">
      <h4 className="num-boards">ALL BOARDS ({boards.length})</h4>
      <div className="board-list">
        {boards.map((board:BoardType) => 
          <CustomLink key={board.id} href={`/board/${board.id}`}>{board.name}</CustomLink>
        )}
      </div>
      
      <button className="btn-new-board" onClick={openModalBoardForm}>
        <IconLink />+ Create New Board
      </button>

      <Modal
        showModal={showModalBoardForm}
        closeModal={closeModalBoardForm}
      >
        <BoardForm  closeModalAction={closeModalBoardForm} />
      </Modal>
    </div>
  )
}

export default BoardListSection;