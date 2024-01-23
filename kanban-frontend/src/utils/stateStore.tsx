import { create } from "zustand";
import { produce } from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";

import { BoardType, ColumnType, TaskType, SubTaskType } from "./types";

import dummyData from "./dummyData";

type Actions = {
  editBoard: (name:string) => void,
  addColumn: (id:string, name:string) => void,
  editColumn: (id:string, name:string) => void,
  deleteColumn: (id:string) => void,
  moveTask: (taskId:string, prevColumnId:string, targetColumnId:string) => void,
  changeSubTaskIsDone: (subTaskId:string, taskId:string, columnId:string) => void,
  addTask: (columnId:string, data:TaskType) => void,
  editTask: (columnId:string, taskId:string, data:TaskType) => void,
  deleteTask: (columnId:string, taskId:string) => void,
} 

export const useBoardDetail = create<BoardType & Actions>((set) => ({
  id: dummyData.id,
  name: dummyData.name,
  columns: dummyData.columns,
  editBoard: name => set({name: name}),
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
      subtask.isDone = !subtask.isDone;
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

// chngeboardname
// createcolumn
// edit column
// delete column
// add task
// edit task
// change task's column
// delete task
// add subtask
// edit subtask
// del subtask

const boards = [
  {id: Math.random().toString(), name: 'Platform Launch'},
  {id: Math.random().toString(), name: 'Marketing Plan'},
  {id: Math.random().toString(), name: 'Sleeping'}
]

export const useBoardList = create((set) => ({
  boards: boards
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('board detail', useBoardDetail);
  mountStoreDevtool('boards', useBoardList);
}