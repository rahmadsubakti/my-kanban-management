import { useState } from 'react';
import { useDrag } from 'react-dnd';

import TaskInfo from '@/containers/TaskInfo/TaskInfo';
import Modal from '../Modal/Modal';
import useModal from '@/utils/useModal';
import { useBoardDetail } from '@/utils/stateStore';

import { TaskType, SubTaskType } from '@/utils/types';

import './task-segment.scss';

interface ExtendedTaskType extends TaskType  {
  columnId: string
}

const TaskSegment = ({columnId, ...task}:ExtendedTaskType) => {
  const numSubTasksDone = task.subtasks 
    ? task.subtasks.filter((subtask:SubTaskType) => subtask.isDone == true).length 
    : 0;

  const totalSubTasks = task.subtasks ? task.subtasks.length : 0;

  const [showModalTask, openModalTask, closeModalTask] = useModal();

  // define drag item
  const [{isDragging}, drag] = useDrag(() => ({
    type: 'task',
    item: {'id': task.id, 'prevColumnId': columnId},
    collect: (monitor) => ({
      item: monitor.getItem(),
      isDragging: monitor.isDragging()
    })
  }))

  const style = {opacity: isDragging ? 0.5 : 1}

  return (
    <>
    <div className="task-segment" ref={drag} style={style} onClick={openModalTask}>
      <h3>{task.title}</h3>
      <p className='subtask-num'>
        {numSubTasksDone} of {totalSubTasks} subtasks
      </p>
    </div>
    <Modal
      showModal={showModalTask}
      closeModal={closeModalTask}
    >
      <TaskInfo columnId={columnId} {...task}/>
    </Modal>
    </>
  )
}

export default TaskSegment;