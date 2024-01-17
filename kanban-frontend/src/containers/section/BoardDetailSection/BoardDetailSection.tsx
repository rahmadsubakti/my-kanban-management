import { useBoardDetail } from "@/utils/stateStore";
import TaskSegment from "@/components/TaskSegment/TaskSegment";
import { EditButton, DeleteButton } from "@/components/IconButton/IconButton";
import Modal from "@/components/Modal/Modal";
import useModal from "@/utils/useModal";
import ColumnForm from "@/forms/ColumnForm";
import DeleteDialog from "@/containers/Dialog/Dialog";

import { ColumnType, TaskType } from "@/utils/types";

import './board-detail-section.scss';
import { PrimaryBtn } from "@/components/Button/Button";

const ColumnSection = ({...column}:ColumnType) => {
  const tasks = column.tasks ? column.tasks : [];
  const value = {id: column.id, name: column.name}

  const deleteColumn = useBoardDetail((state:any) => state.deleteColumn);
  const onDelete = () => deleteColumn(column.id)

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
      <div className="task-list">
        {tasks.map((task:TaskType) => 
          <TaskSegment key={task.id} {...task} />
        )}
        <PrimaryBtn OnClick={() => console.log('nothing')}>Add Task</PrimaryBtn>
      </div>
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
    </section>
  )
}

export default BoardDetailSection;