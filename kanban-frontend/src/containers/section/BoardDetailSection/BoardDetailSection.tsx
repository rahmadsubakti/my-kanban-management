import { useBoardDetail } from "@/utils/stateStore";
import TaskSegment from "@/components/TaskSegment/TaskSegment";
import { EditButton, DeleteButton } from "@/components/IconButton/IconButton";

import { ColumnType, TaskType } from "@/utils/types";

import './board-detail-section.scss';

const ColumnSection = ({...column}:ColumnType) => {
  const tasks = column.tasks ? column.tasks : [];

  return (
    <div className="column">
      <div className="column-title-container">
        <h4 className="column-title">
          {column.name.toUpperCase()} ({tasks.length})
        </h4>
        <div className="btn-groups">
          <EditButton />
          <DeleteButton />
        </div>
      </div>
      <div className="task-list">
        {tasks.map((task:TaskType) => 
          <TaskSegment key={task.id} {...task} />
        )}
      </div>
    </div>
  )
}
const BoardDetailSection = () => {
  const columns = useBoardDetail((state:any) => state.columns)

  return (
    <section className="board-detail">
      {columns.map((column:ColumnType) => <ColumnSection key={column.id} {...column} />)}
      <button className="add-column">
        + New Column
      </button>
    </section>
  )
}

export default BoardDetailSection;