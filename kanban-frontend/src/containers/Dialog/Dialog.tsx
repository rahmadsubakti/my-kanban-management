import { SecondaryBtn, DangerBtn } from "@/components/Button/Button";

import './dialog.scss';

type DeleteDialog = {
  type: string,
  name: string,
  delAction: Function,
  cancelAction: Function,
}

const DeleteDialog = ({type, name, delAction, cancelAction}:DeleteDialog) => {
  let msg:string = '';

  switch(type) {
    case 'board':
      msg = `Are you sure you want to delete the '${name}' board? This action will remove all columns and tasks and cannot be reversed.`
      break;
    case 'column':
      msg = `Are you sure you want to delete the '${name}' column and remove its tasks and subtasks? This action cannot be reversed.`
      break;
    case 'task':
      msg = `Are you sure you want to delete the '${name}' task and its subtasks? This action cannot be reversed.`
      break;
  }
  return (
    <div className="del-dialog-container">
      <h2 className="dialog-title">Delete this {type}</h2>
      <p className="dialog-msg">{msg}</p>
      <div className="btn-groups">
        <DangerBtn OnClick={delAction}>Delete</DangerBtn>
        <SecondaryBtn OnClick={cancelAction}>Cancel</SecondaryBtn>
      </div>
    </div>
  )
}

export default DeleteDialog;