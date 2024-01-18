import Checkbox from "@/components/Checkbox/Checkbox";

import { TaskType, SubTaskType } from "@/utils/types";

import './task-info.scss';

const TaskInfo = ({...task}:TaskType) => {
  const numSubTasksDone = task.subtasks 
    ? task.subtasks.filter((subtask:SubTaskType) => subtask.isDone == true).length 
    : 0;

  const totalSubTasks = task.subtasks ? task.subtasks.length : 0;

  return (
    <div className="task-info-container">
      <h2 className="task-title">{task.title}</h2>
      <p className="task-description">{task.description}</p>
      <div className="subtasks-container">
        <h5 className="subtask-info">Subtasks ( {numSubTasksDone} of {totalSubTasks})</h5>
        <div className="subtasks">
          {task.subtasks?.map(subtask => <Checkbox key={subtask.id} checked={subtask.isDone}>{subtask.title}</Checkbox>)}
        </div>
      </div>
    </div>
  )
}

export default TaskInfo;