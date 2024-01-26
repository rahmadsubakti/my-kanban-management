import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";

import { useBoardDetail } from "@/utils/stateStore";
import TaskSegment from "@/components/TaskSegment/TaskSegment";
import { EditButton, DeleteButton } from "@/components/IconButton/IconButton";
import Modal from "@/components/Modal/Modal";
import useModal from "@/utils/useModal";
import ColumnForm from "@/forms/ColumnForm";
import TaskForm from "@/forms/TaskForm";
import DeleteDialog from "@/containers/Dialog/Dialog";

import { ColumnType, TaskType } from "@/utils/types";
import { sendColumnDelete } from "@/utils/request";
import { sendTaskMove } from "@/utils/request";

import './board-detail-section.scss';
import { PrimaryBtn } from "@/components/Button/Button";

const ColumnSection = ({...column}:ColumnType) => {
  const tasks = column.tasks ? column.tasks : [];
  const value = {id: column.id, name: column.name}

  // define drop zone for task
  const moveTask = useBoardDetail((state:any) => state.moveTask);

  const [ {isOver},drop] = useDrop(() => ({
    accept: 'task',
    drop: (monitor:any) => 
      sendTaskMove(column.id, monitor.task)
        .then(() => moveTask(monitor.task.id, monitor.prevColumnId, column.id)),
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  }), []
  )

  const style = {outline: isOver ? "1px solid white" : "none"};

  const deleteColumn = useBoardDetail((state:any) => state.deleteColumn);
  const onDelete = () => sendColumnDelete(column.id).then(res => deleteColumn(column.id));

  const [showModalTaskForm, openModalTaskForm, closeModalTaskForm] = useModal();
  const [showModalEdit, openModalEdit, closeModalEdit] = useModal();
  const [showModalDeleteColumn, openModalDeleteColumn, closeModalDeleteColumn] = useModal();

  return (
    <div className="column">
      <div className="column-title-container">
        <h4 className="column-title">
          {column.name.toUpperCase()} ({tasks.length})
        </h4>

        <div className="btn-groups">
          <EditButton onClick={openModalEdit} />
          <DeleteButton onClick={openModalDeleteColumn} />
        </div>

      </div>

      <div className="task-list" ref={drop} style={style}>
        {tasks.map((task:TaskType) => 
          <TaskSegment key={task.id} columnId={column.id} {...task} />
        )}
        <PrimaryBtn onClick={openModalTaskForm}>Add Task</PrimaryBtn>
      </div>

      <Modal showModal={showModalTaskForm} closeModal={closeModalTaskForm}>
        <TaskForm columnId={column.id} closeModal={closeModalTaskForm}/>
      </Modal>

      <Modal showModal={showModalEdit} closeModal={closeModalEdit}>
        <ColumnForm value={value} closeModalAction={closeModalEdit} />
      </Modal>

      <Modal showModal={showModalDeleteColumn} closeModal={closeModalDeleteColumn}>
        <DeleteDialog
          type='column'
          name={column.name}
          onDelete={onDelete}
          onCancel={closeModalDeleteColumn}
        />
      </Modal>

    </div>
  )
}
const BoardDetailSection = () => {
  const columns = useBoardDetail((state:any) => state.columns);
  const [showModalCreateColumn, openModalCreateColumn, closeModalCreateColumn] = useModal();

  return (
    <section className="board-detail">
      <DndProvider backend={HTML5Backend}>

      {columns.map((column:ColumnType) => <ColumnSection key={column.id} {...column} />)}
      <button className="add-column" onClick={openModalCreateColumn}>
        + New Column
      </button>

      <Modal
        showModal={showModalCreateColumn}
        closeModal={closeModalCreateColumn}
      >
        <ColumnForm closeModalAction={closeModalCreateColumn}/>
      </Modal>
      
      </DndProvider>
    </section>
  )
}

export default BoardDetailSection;