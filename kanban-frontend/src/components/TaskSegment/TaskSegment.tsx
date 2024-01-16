import { TaskType, SubTaskType } from '@/utils/types';

import './task-segment.scss';

const TaskSegment = ({title, subtasks}:TaskType) => {
  const numSubTasksDone = subtasks 
    ? subtasks.filter((subtask:SubTaskType) => subtask.isDone == true).length 
    : 0;

  const totalSubTasks = subtasks ? subtasks.length : 0;

  return (
    <div className="task-segment">
      <h3>{title}</h3>
      <p className='subtask-num'>
        {numSubTasksDone} of {totalSubTasks} subtasks
      </p>
    </div>
  )
}

export default TaskSegment;