import Checkbox from "@/components/Checkbox/Checkbox";
import { EditButton, DeleteButton } from "@/components/IconButton/IconButton";
import TaskForm from "@/forms/TaskForm";
import Modal from "@/components/Modal/Modal";
import useModal from "@/utils/useModal";
import DeleteDialog from "../Dialog/Dialog";
import { TaskType, SubTaskType } from "@/utils/types";
import { useBoardDetail } from "@/utils/stateStore";
import { sendTaskDelete } from "@/utils/request";

import './task-info.scss';

interface TaskView extends TaskType {
  columnId: string
}

const TaskInfo = ({columnId, ...task}:TaskView) => {
  const numSubTasksDone = task.subtasks 
    ? task.subtasks.filter((subtask:SubTaskType) => subtask.is_done == true).length 
    : 0;

  const totalSubTasks = task.subtasks ? task.subtasks.length : 0;

  // modal for task
  const [showModalEditTask, openModalEditTask, closeModalEditTask] = useModal();
  const [showModalDeleteTask, openModalDeleteTask, closeModalDeleteTask] = useModal();

  const deleteTask = useBoardDetail((state:any) => state.deleteTask);
  const OnDelete = () => 
    sendTaskDelete(task.id).then(() => deleteTask(columnId, task.id));
  
  // for when you click the checkbox
  const changeSubTaskIsDone = useBoardDetail(state => state.changeSubTaskIsDone);
  const OnChange = (e) => {
    const subTaskId = e.target.value;
    changeSubTaskIsDone(subTaskId, task.id, columnId);
    // send new data to server
  }

  return (
    <>
    <div className="task-info-container">
      <div className="task-title-container">
        <h2 className="task-title">{task.title}</h2>
        <div className="btn-groups">
          <EditButton title="Edit this task" onClick={openModalEditTask}/>
          <DeleteButton title="Delete this task" onClick={openModalDeleteTask}/>
        </div>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="subtasks-container">
        <h5 className="subtask-info">Subtasks ( {numSubTasksDone} of {totalSubTasks})</h5>
        <div className="subtasks">
          {task.subtasks?.map(subtask => <Checkbox key={subtask.id} checked={subtask.is_done} onChange={OnChange} value={subtask.id}>{subtask.title}</Checkbox>)}
        </div>
      </div>
    </div>
    <Modal
      showModal={showModalEditTask}
      closeModal={closeModalEditTask}
    >
      <TaskForm
        value={task}
        columnId={columnId}
        closeModal={closeModalEditTask}
      />
    </Modal>

    <Modal
      showModal={showModalDeleteTask}
      closeModal={closeModalDeleteTask}
    >
      <DeleteDialog 
        type="task" 
        name={task.title} 
        onDelete={OnDelete} 
        onCancel={closeModalDeleteTask} 
      />
    </Modal>
    </>
  )
}

export default TaskInfo;