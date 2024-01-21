import Checkbox from "@/components/Checkbox/Checkbox";
import { EditButton, DeleteButton } from "@/components/IconButton/IconButton";
import { TaskType, SubTaskType } from "@/utils/types";
import { useBoardDetail } from "@/utils/stateStore";

import './task-info.scss';

interface TaskView extends TaskType {
  columnId: string
}

const TaskInfo = ({columnId, ...task}:TaskView) => {
  const numSubTasksDone = task.subtasks 
    ? task.subtasks.filter((subtask:SubTaskType) => subtask.isDone == true).length 
    : 0;

  const totalSubTasks = task.subtasks ? task.subtasks.length : 0;
  
  // for when you click the checkbox
  const changeSubTaskIsDone = useBoardDetail(state => state.changeSubTaskIsDone);
  const OnChange = (e) => {
    const subTaskId = e.target.value;
    changeSubTaskIsDone(subTaskId, task.id, columnId);
    // send new data to server
  }

  return (
    <div className="task-info-container">
      <div className="task-title-container">
        <h2 className="task-title">{task.title}</h2>
        <div className="btn-groups">
          <EditButton title="Edit this task" />
          <DeleteButton title="Delete this task" />
        </div>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="subtasks-container">
        <h5 className="subtask-info">Subtasks ( {numSubTasksDone} of {totalSubTasks})</h5>
        <div className="subtasks">
          {task.subtasks?.map(subtask => <Checkbox key={subtask.id} checked={subtask.isDone} onChange={OnChange} value={subtask.id}>{subtask.title}</Checkbox>)}
        </div>
      </div>
    </div>
  )
}

export default TaskInfo;