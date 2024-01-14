import Label from "@/components/Label/Label";
import TextBox from "@/components/TextBox/TextBox";
import { PrimaryBtn } from "@/components/Button/Button";

import './form.scss';

const BoardForm = () => {
  return (
    <div className="form-container">
      <h2 className="form-title">Add New Board</h2>
      <form>
        <div className="input-groups">
          <Label>Board name</Label>
          <TextBox />
        </div>
        <PrimaryBtn type="submit">Create New Board</PrimaryBtn>
      </form>
    </div>
  )
}

export default BoardForm;