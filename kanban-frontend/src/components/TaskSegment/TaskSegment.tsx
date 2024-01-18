import { useDrag } from 'react-dnd';

import { TaskType, SubTaskType } from '@/utils/types';

import './task-segment.scss';

interface ExtendedTaskType extends TaskType  {
  columnId: String
}

const TaskSegment = ({id, title, subtasks, columnId}:ExtendedTaskType) => {
  const numSubTasksDone = subtasks 
    ? subtasks.filter((subtask:SubTaskType) => subtask.isDone == true).length 
    : 0;

  const totalSubTasks = subtasks ? subtasks.length : 0;

  // define drag item
  const [{isDragging}, drag] = useDrag(() => ({
    type: 'task',
    item: {'id': id, 'prevColumnId': columnId},
    collect: (monitor) => ({
      item: monitor.getItem(),
      isDragging: monitor.isDragging()
    })
  }))

  const style = {opacity: isDragging ? 0.5 : 1}

  return (
    <div className="task-segment" ref={drag} style={style}>
      <h3>{title}</h3>
      <p className='subtask-num'>
        {numSubTasksDone} of {totalSubTasks} subtasks
      </p>
    </div>
  )
}

export default TaskSegment;