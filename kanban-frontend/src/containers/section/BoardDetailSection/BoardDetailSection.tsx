import { useEffect } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";

import { useQuery } from "@tanstack/react-query";

import { ring } from 'ldrs'

import { useBoardDetail } from "@/utils/stateStore";
import TaskSegment from "@/components/TaskSegment/TaskSegment";
import { EditButton, DeleteButton } from "@/components/IconButton/IconButton";
import Modal from "@/components/Modal/Modal";
import { PrimaryBtn } from "@/components/Button/Button";
import useModal from "@/utils/useModal";
import ColumnForm from "@/forms/ColumnForm";
import TaskForm from "@/forms/TaskForm";
import DeleteDialog from "@/containers/Dialog/Dialog";
import { BoardDetailRoute } from "@/utils/route";

import { ColumnType, TaskType } from "@/utils/types";
import { 
  fetchBoardDetail,
  sendColumnDelete,
  sendTaskMove
} from "@/utils/request";

import "./board-detail-section.scss";

ring.register()

const EmptyColumn = () => {
  const [showModalCreateColumn, openModalCreateColumn, closeModalCreateColumn] = useModal();

  return (
    <div className="empty-column-container">
      <h2 className="empty-column-title">
        This board is empty. Create a new column to get started
      </h2>
      <PrimaryBtn onClick={openModalCreateColumn}>+ Add New Column</PrimaryBtn>

      <Modal
        showModal={showModalCreateColumn}
        closeModal={closeModalCreateColumn}
      >
        <ColumnForm closeModalAction={closeModalCreateColumn} />
      </Modal>
    </div>
  )
}

const ColumnSection = ({ ...column }: ColumnType) => {
  const tasks = column.tasks ? column.tasks : [];
  const value = { id: column.id, name: column.name };

  // define drop zone for task
  const moveTask = useBoardDetail((state: any) => state.moveTask);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (monitor: any) =>
        sendTaskMove(column.id, monitor.task).then(() =>
          moveTask(monitor.task.id, monitor.prevColumnId, column.id)
        ),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    []
  );

  const style = { outline: isOver ? "1px solid white" : "none" };

  const deleteColumn = useBoardDetail((state: any) => state.deleteColumn);
  const onDelete = () =>
    sendColumnDelete(column.id).then(() => deleteColumn(column.id));

  const [showModalTaskForm, openModalTaskForm, closeModalTaskForm] = useModal();
  const [showModalEdit, openModalEdit, closeModalEdit] = useModal();
  const [showModalDeleteColumn, openModalDeleteColumn, closeModalDeleteColumn] =
    useModal();

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
        {tasks.map((task: TaskType) => (
          <TaskSegment key={task.id} columnId={column.id} {...task} />
        ))}
        <PrimaryBtn onClick={openModalTaskForm}>Add Task</PrimaryBtn>
      </div>

      <Modal showModal={showModalTaskForm} closeModal={closeModalTaskForm}>
        <TaskForm columnId={column.id} closeModal={closeModalTaskForm} />
      </Modal>

      <Modal showModal={showModalEdit} closeModal={closeModalEdit}>
        <ColumnForm value={value} closeModalAction={closeModalEdit} />
      </Modal>

      <Modal
        showModal={showModalDeleteColumn}
        closeModal={closeModalDeleteColumn}
      >
        <DeleteDialog
          type="column"
          name={column.name}
          onDelete={onDelete}
          onCancel={closeModalDeleteColumn}
        />
      </Modal>
    </div>
  );
};

const BoardDetailContent = () => {
  const columns = useBoardDetail((state: any) => state.columns);
  const [showModalCreateColumn, openModalCreateColumn, closeModalCreateColumn] = useModal();

  if (columns.length == 0) {
    return <EmptyColumn />
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {columns.map((column: ColumnType) => (
          <ColumnSection key={column.id} {...column} />
        ))}

        <button className="secondary-bg-theme add-column" onClick={openModalCreateColumn}>
          + New Column
        </button>

        <Modal
          showModal={showModalCreateColumn}
          closeModal={closeModalCreateColumn}
        >
          <ColumnForm closeModalAction={closeModalCreateColumn} />
        </Modal>
      </DndProvider>
    </>
  );
};

const BoardDetailSection = () => {
  const { setBoard, resetBoard } = useBoardDetail();
  const boardId = BoardDetailRoute.useLoaderData();

  /*useEffect(() => {
    fetchBoardDetail(boardId).then(res => setBoard(res.data));
    return () => resetBoard();
  }, [boardId])*/

  const { data, isLoading, error } = useQuery({
    queryKey: [boardId],
    queryFn: () => fetchBoardDetail(boardId)
  })

  useEffect(() => {
    if (!isLoading) {
      setBoard(data?.data)
    }
    return () => resetBoard();
  }, [isLoading, data])

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'calc(100vw - 300px)',
        height: 'calc(100vh - 94px)'
      }}>
        <l-ring size="60" color="#635FC7"></l-ring>
      </div>
    )
  }

  return (
    <section className="board-detail">
      <BoardDetailContent />
    </section>
  );
};

export default BoardDetailSection;
