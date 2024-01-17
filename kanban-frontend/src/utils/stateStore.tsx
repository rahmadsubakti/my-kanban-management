import { create } from "zustand";
import { produce } from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";

import { BoardType, ColumnType, TaskType, SubTaskType } from "./types";

import dummyData from "./dummyData";

export const useBoardDetail = create((set) => ({
  id: dummyData.id,
  name: dummyData.name,
  columns: dummyData.columns,
  editBoard: (name:String) => set({name: name}),
  addColumn: (id:String, name:String) => set(
    produce((draft) => {
      const column = {id: id, name: name, tasks: []};
      draft.columns.push(column);
    })
  ),
  editColumn: (id:String, name:String) => set(
    produce((draft) => {
      // find the edited
      const column = draft.columns.find(column => column.id == id);
      column.name = name;
    })
  ),
  deleteColumn: (id:String) => set(
    produce((draft) => {
      // find the column that you want to delete
      const columnIndex = draft.columns.findIndex(column => column.id == id);
      draft.columns.splice(columnIndex, 1)
    })
  ),
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