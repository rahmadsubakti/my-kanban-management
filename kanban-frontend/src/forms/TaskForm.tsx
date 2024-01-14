import Label from "@/components/Label/Label";
import TextBox from "@/components/TextBox/TextBox";
import { DeleteItemButton } from "@/components/IconButton/IconButton";
import { PrimaryBtn, SecondaryBtn } from "@/components/Button/Button";

import './form.scss';

const TaskForm = () => {
  return (
    <div className="form-container">
      <h2 className="form-title">Create New Task</h2>
      <form>

        <div className="input-groups">
          <Label>Title</Label>
          <TextBox />
        </div>

        <div className="input-groups">
          <Label>Description</Label>
          <TextBox />
        </div>

        <div className="input-groups">
          <Label>Subtasks</Label>
          <div className="input-subtask-groups">
            <TextBox />
            <DeleteItemButton />
          </div>
          <div className="input-subtask-groups">
            <TextBox />
            <DeleteItemButton />
          </div>
          <SecondaryBtn type="button">+ Add New Subtask</SecondaryBtn>
        </div>

        <PrimaryBtn type="submit">Create Task</PrimaryBtn>
      </form>
    </div>
  )
}

export default TaskForm;