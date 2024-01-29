import { useForm, SubmitHandler } from "react-hook-form";

import Label from "@/components/Label/Label";
import TextBox from "@/components/TextBox/TextBox";
import { PrimaryBtn } from "@/components/Button/Button";
import { useBoardList, useBoardDetail } from "@/utils/stateStore";
import { sendBoardAdd, sendBoardEdit } from "@/utils/request";
import router from "@/utils/route";

import './form.scss';

type BoardInputs = {
  name: string
}

type BoardFormType = {
  value?: any,
  closeModalAction: Function,
}
const BoardForm = ({value, closeModalAction}:BoardFormType) => {
  let defaultValues;
  if (value) {
    defaultValues = value;
  } else {
    defaultValues = '';
  }

  const { editBoard } = useBoardDetail();
  const { addBoard } = useBoardList();

  const { register, handleSubmit, formState: {errors}} = 
    useForm<BoardInputs>({defaultValues: defaultValues});

  const AddBoard = async (data:BoardInputs) => {
    const res = await sendBoardAdd(data);
    addBoard(res.data.id, res.data.name);
    router.history.push(`board/${res.data.id}`);
  }

  const onSubmit:SubmitHandler<BoardInputs> = data => {
    if (value) {
      // change board name
      sendBoardEdit(value.id, data).then(() => editBoard(data.name));
    } else {
      // create new board
      // sendBoardAdd(data).then(res => router.history.push(`board/${res.data.id}`))
      AddBoard(data);
    }
    closeModalAction();
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Board</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-groups">
          <Label>Board name</Label>
          <TextBox
            type="text"
            fieldName='name'
            register={register}
            properties={{required: true}}
            errors={errors}
          />
        </div>
        <PrimaryBtn type="submit">Create New Board</PrimaryBtn>
      </form>
    </div>
  )
}

export default BoardForm;