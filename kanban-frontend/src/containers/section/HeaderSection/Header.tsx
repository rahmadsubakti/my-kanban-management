import { useBoardDetail } from "@/utils/stateStore";

import { EditButton, DeleteButton } from "@/components/IconButton/IconButton";

import './header.scss';

const Header = () => {
  const name = useBoardDetail((state:any) => state.name)
  return (
    <header>
      <div className="board-title-container">
        <h1 className="board-title">{name}</h1>
        <div className="btn-groups">
          <EditButton />
          <DeleteButton />
        </div>
      </div>
    </header>
  )
}

export default Header;