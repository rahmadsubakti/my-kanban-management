import { create } from "zustand";
import { produce } from "immer";

import { BoardType, ColumnType, TaskType, SubTaskType } from "./types";

import dummyData from "./dummyData";

export const useBoardDetail = create((set) => ({
  id: dummyData.id,
  name: dummyData.name,
  columns: dummyData.columns,
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
}))