export type SubTaskType = {
  title: string,
  is_done: boolean,
}

export type TaskType = {
  id: string,
  title: string,
  description?: string,
  subtasks?: Array<SubTaskType>
}

export type ColumnType = {
  id: string,
  name: string,
  tasks?: Array<TaskType>
}

export type BoardType = {
  id: string,
  name: string,
  columns?: Array<ColumnType>
}