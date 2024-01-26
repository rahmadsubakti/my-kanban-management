import { useRef } from 'react';
import { useDrag } from 'react-dnd';

import TaskInfo from '@/containers/TaskInfo/TaskInfo';
import Modal from '../Modal/Modal';
import useModal from '@/utils/useModal';
import { useBoardDetail } from '@/utils/stateStore';

import { TaskType, SubTaskType } from '@/utils/types';
import { sendTaskEdit } from '@/utils/request';

import './task-segment.scss';

interface ExtendedTaskType extends TaskType  {
  columnId: string
}

const TaskSegment = ({columnId, ...task}:ExtendedTaskType) => {
  const numSubTasksDone = task.subtasks 
    ? task.subtasks.filter((subtask:SubTaskType) => subtask.is_done == true).length 
    : 0;

  const totalSubTasks = task.subtasks ? task.subtasks.length : 0;

  const subtasksRef = useRef()
  const state = useBoardDetail.getState()

  const [showModalTask, openModalTask, closeModalTask] = useModal();
  const onOpenModalTask = () => {
    const currentSubtasks = state.columns.find(column => column.id == columnId).tasks.find(taskObj => taskObj.id == task.id).subtasks;
    subtasksRef.current = currentSubtasks;
    openModalTask()
  }
  const onCloseModalTask = () => {
    const taskState = state.columns.find(column => column.id == columnId).tasks.find(taskObj => taskObj.id == task.id);
    const currentSubtasks = task.subtasks;
    const isSubTasksUpdated = JSON.stringify(currentSubtasks) != JSON.stringify(subtasksRef.current)
    if (isSubTasksUpdated) {
      sendTaskEdit(taskState.id, taskState);
    }
    closeModalTask();
  }

  // define drag item
  const [{isDragging}, drag] = useDrag(() => ({
    type: 'task',
    item: {'prevColumnId': columnId, 'task': task},
    collect: (monitor) => ({
      item: monitor.getItem(),
      isDragging: monitor.isDragging()
    })
  }))

  const style = {opacity: isDragging ? 0.5 : 1}

  return (
    <>
    <div className="task-segment" ref={drag} style={style} onClick={onOpenModalTask}>
      <h3>{task.title}</h3>
      <p className='subtask-num'>
        {numSubTasksDone} of {totalSubTasks} subtasks
      </p>
    </div>
    <Modal
      showModal={showModalTask}
      closeModal={onCloseModalTask}
    >
      <TaskInfo columnId={columnId} {...task}/>
    </Modal>
    </>
  )
}

export default TaskSegment;