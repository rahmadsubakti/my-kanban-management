import { useForm, SubmitHandler } from "react-hook-form";

import Label from "@/components/Label/Label";
import TextBox from "@/components/TextBox/TextBox";
import { PrimaryBtn } from "@/components/Button/Button";

import { useBoardDetail } from "@/utils/stateStore";
import { sendColumnAdd, sendColumnEdit } from "@/utils/request";

import './form.scss';

type ColumnInput = {
  name: String,
}

type ColumnFormType = {
  value?: any,
  closeModalAction: any
}

const ColumnForm = ({value, closeModalAction}:ColumnFormType) => {
  const boardId = useBoardDetail((state:any) => state.id);
  const addColumn = useBoardDetail((state:any) => state.addColumn)
  const editColumn = useBoardDetail((state:any) => state.editColumn);
  
  let defaultValues;
  if (value) {
    defaultValues = value;
  } else {
    defaultValues = '';
  }
  
  const {register, handleSubmit, formState: {errors}} = useForm<ColumnInput>({defaultValues: defaultValues})
  const onSubmit:SubmitHandler<ColumnInput> = data => {
    if (value) {
      // edit column
      data.board = boardId;
      sendColumnEdit(value.id, data).then(res => editColumn(value.id, data.name))
      //editColumn(value.id, data.name)
    } else {
      // create new column
      data.board = boardId;
      sendColumnAdd(data).then(res => addColumn(res.data.id, data.name))
    }
    closeModalAction();
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Create New Column</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-groups">
          <Label>Column Name</Label>
          <TextBox
            type="text"
            fieldName='name'
            register={register}
            properties={{required: true}}
            errors={errors} 
          />
        </div>
        <PrimaryBtn type="submit">Create New Column</PrimaryBtn>
      </form>
    </div>
  )
}

export default ColumnForm;