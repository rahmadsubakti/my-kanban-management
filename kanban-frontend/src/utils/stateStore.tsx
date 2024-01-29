import { create } from "zustand";
import { produce } from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";

import { BoardType, ColumnType, TaskType, SubTaskType } from "./types";
import { fetchBoardDetail } from "./request";

type Actions = {
  getBoardDetail: (id:string) => void
  editBoard: (name:string) => void,
  resetBoard: () => void,
  addColumn: (id:string, name:string) => void,
  editColumn: (id:string, name:string) => void,
  deleteColumn: (id:string) => void,
  moveTask: (taskId:string, prevColumnId:string, targetColumnId:string) => void,
  changeSubTaskIsDone: (subTaskId:string, taskId:string, columnId:string) => void,
  addTask: (columnId:string, data:TaskType) => void,
  editTask: (columnId:string, taskId:string, data:TaskType) => void,
  deleteTask: (columnId:string, taskId:string) => void,
} 

const initialState : BoardType = {
  id: '',
  name: '',
  columns: []
}

export const useBoardDetail = create<BoardType & Actions>((set) => ({
  ...initialState,
  getBoardDetail: (id) => {
    if (id != "") {
      fetchBoardDetail(id)
        .then(res => set({
          id: res.id,
          name: res.name,
          columns: res.columns
        }))
    }
  },
  editBoard: name => set({name: name}),
  resetBoard: () => set(initialState),
  addColumn: (id, name) => set(
    produce((draft) => {
      const column = {id: id, name: name, tasks: []};
      draft.columns.push(column);
    })
  ),
  editColumn: (id, name) => set(
    produce((draft) => {
      // find the edited
      const column = draft.columns.find((column:ColumnType) => column.id == id);
      column.name = name;
    })
  ),
  deleteColumn: id => set(
    produce((draft) => {
      // find the column that you want to delete
      const columnIndex = draft.columns.findIndex((column:ColumnType) => column.id == id);
      draft.columns.splice(columnIndex, 1)
    })
  ),
  moveTask: (taskId, prevColumnId, targetColumnId) => set(
    produce((draft) => {
      // wish i could find a better approach
      const prevColumn = draft.columns.find((column:ColumnType) => column.id == prevColumnId);
      const targetColumn = draft.columns.find((column:ColumnType) => column.id == targetColumnId);
      const task = prevColumn.tasks.find((task:TaskType) => task.id == taskId)
      const taskIndex = prevColumn.tasks.findIndex((task:TaskType) => task.id == taskId);

      prevColumn.tasks.splice(taskIndex, 1);
      targetColumn.tasks.push(task);
    })
  ),
  changeSubTaskIsDone: (subTaskId, taskId, columnId) => set(
    produce((draft) => {
      // wish i could find a better approach
      const column = draft.columns.find((column:ColumnType) => column.id == columnId);
      const task = column.tasks.find((task:TaskType) => task.id == taskId);
      const subtask = task.subtasks.find((subtask:SubTaskType) => subtask.id == subTaskId);
      subtask.is_done = !subtask.is_done;
    })
  ),
  addTask: (columnId, data) => set(
    produce((draft) => {
      const column = draft.columns.find((column:ColumnType) => column.id == columnId);
      column.tasks.push(data)
    })
  ),
  editTask: (columnId, taskId, data) => set(
    produce((draft) => {
      // wish i can find a better approach so that i can update state without explicit all
      const column = draft.columns.find((column:ColumnType) => column.id == columnId);
      const task = column.tasks.find((task:TaskType) => task.id == taskId);
      task.title = data.title;
      task.description = data.description;
      task.subtasks = data.subtasks;
    })
  ),
  deleteTask: (columnId, taskId) => set(
    produce((draft) => {
      const column = draft.columns.find((column:ColumnType) => column.id == columnId);
      const taskIndex = column.tasks.findIndex((task:TaskType) => task.id == taskId);
      column.tasks.splice(taskIndex, 1);
    })
  )
}))

import { fetchBoardList } from "./request";

type BoardListState = {
  boards: Array<any>,
}

type BoardListAction = {
  setBoards: () => void,
  addBoard: (id:string, name:string) => void,
  deleteBoard: (id:string) => void,
}

export const useBoardList = create<BoardListState & BoardListAction>((set) => ({
  boards: [],
  setBoards: () =>  {
    fetchBoardList().then(res => set({boards: res}))
  },
  addBoard: (id, name) => set(
    produce((draft) => {
      const newBoard = {id: id, name: name};
      draft.boards.push(newBoard)
    })
  ),
  deleteBoard: (id) => set(
    produce((draft) => {
      const targetBoardIndex = draft.boards.findIndex((board:BoardType) => board.id == id);
      draft.boards.splice(targetBoardIndex, 1);
    })
  )
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('board detail', useBoardDetail);
  mountStoreDevtool('boards', useBoardList);
}