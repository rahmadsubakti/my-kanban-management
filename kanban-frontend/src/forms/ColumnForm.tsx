import Label from "@/components/Label/Label";
import TextBox from "@/components/TextBox/TextBox";
import { PrimaryBtn } from "@/components/Button/Button";

const ColumnForm = () => {
  return (
    <div className="form-container">
      <h2 className="form-title">Create New Column</h2>
      <form>
        <div className="input-groups">
          <Label>Column Name</Label>
          <TextBox />
        </div>
        <PrimaryBtn type="submit">Create New Column</PrimaryBtn>
      </form>
    </div>
  )
}

export default ColumnForm;