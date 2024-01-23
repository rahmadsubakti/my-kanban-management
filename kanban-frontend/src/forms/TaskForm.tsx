import {useForm, SubmitHandler, useFieldArray } from 'react-hook-form';

import Label from "@/components/Label/Label";
import TextBox from "@/components/TextBox/TextBox";
import { DeleteItemButton } from "@/components/IconButton/IconButton";
import { PrimaryBtn, SecondaryBtn } from "@/components/Button/Button";
import { useBoardDetail } from '@/utils/stateStore';

import './form.scss';

type TaskInput = {
  title: string,
  description: string,
  subtasks: Array<{
    title: string
  }>
}

type TaskFormType = {
  value?: any,
  columnId: string,
  closeModal: Function,
}

const TaskForm = ({value, columnId, closeModal}:TaskFormType) => {
  const addTask = useBoardDetail((state:any) => state.addTask);
  const editTask = useBoardDetail((state:any) => state.editTask);

  let defaultValues;
  if (value) {
    defaultValues = value;
  } else {
    defaultValues = '';
  }

  const { register, handleSubmit, control, formState: { errors} } = 
    useForm<TaskInput>({defaultValues: defaultValues});

  const { fields, append, remove } = useFieldArray({
    name:'subtasks',
    control
  });

  const onSubmit:SubmitHandler<TaskInput> = data => {
    // for adding new task logic
    // send first to server
    // then get new id from the response
    if (value) {
      editTask(columnId, value.id, data);
    } else {
      data.id = Math.random().toString() //change later
      addTask(columnId, data)
    }
    closeModal();
  };
  
  return (
    <div className="form-container">
      <h2 className="form-title">{value ? "Edit" : "Create New"} Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="input-groups">
          <Label>Title</Label>
          <TextBox
            type="text"
            fieldName="title"
            register={register}
            properties={{required: true}}
            errors={errors} 
          />
        </div>

        <div className="input-groups">
          <Label>Description</Label>
          <TextBox
            type="text"
            fieldName="description"
            register={register}
            properties={{required: false}}
            errors={errors}
          />
        </div>

        <div className="input-groups">
          <Label>Subtasks</Label>
          {fields.map((field, index) => {
            return (
              <div className="input-subtask-groups" key={field.id}>
                <TextBox
                  type="text"
                  fieldName={`subtasks.${index}.title`}
                  register={register}
                  properties={{required: true}}
                  errors={errors}
                />
                <DeleteItemButton type='button' onClick={() => remove(index)}/>
              </div>
            )
          })}
          <SecondaryBtn type='button' onClick={() => append({title: ""})}>
            + Add New Subtask
          </SecondaryBtn>
          {/*<div className="input-subtask-groups">
            <TextBox />
            <DeleteItemButton />
          </div>
          <div className="input-subtask-groups">
            <TextBox />
            <DeleteItemButton />
          </div>
          <SecondaryBtn type="button">+ Add New Subtask</SecondaryBtn>
  */}
        </div>

        <PrimaryBtn type="submit">
          {value ? "Save changes" : "Create Task"}
        </PrimaryBtn>
      </form>
    </div>
  )
}

export default TaskForm;