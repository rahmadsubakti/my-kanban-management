import {IconLink, CustomLink} from "@/components/CustomLink/CustomLink";

import { useBoardList } from "@/utils/stateStore";
import { BoardType } from "@/utils/types";

import './board-list-section.scss';

const BoardListSection = () => {
  const boards = useBoardList((state:any) => state.boards)

  return (
    <div className="board-list-containers">
      <h4 className="num-boards">ALL BOARDS ({boards.length})</h4>
      <div className="board-list">
        {boards.map((board:BoardType) => 
          <CustomLink key={board.id}>{board.name}</CustomLink>
        )}
      </div>
      
      <button className="btn-new-board">
        <IconLink />+ Create New Board
      </button>
    </div>
  )
}

export default BoardListSection;