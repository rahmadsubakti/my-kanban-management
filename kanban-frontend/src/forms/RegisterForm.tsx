import { useForm, SubmitHandler } from "react-hook-form";

import TextBox from "@/components/TextBox/TextBox";
import Label from "@/components/Label/Label";
import { PrimaryBtn } from "@/components/Button/Button";

import { RegisterRequest } from "@/utils/request";
import router from "@/utils/route";

import "./form.scss";
import "./auth.scss";

type RegisterInput = {
  username: string;
  password1: string;
  password2: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>();

  const OnSubmit: SubmitHandler<RegisterInput> = (data) => {
    RegisterRequest(data).then(() => router.history.push('/login'))
    .catch(res => alert(res.errors))
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="form-container">
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="input-groups">
              <Label>Username</Label>
              <TextBox
                type="text"
                fieldName="username"
                register={register}
                properties={{ required: true }}
                errors={errors}
              />
            </div>
            <div className="input-groups">
              <Label>Password</Label>
              <TextBox
                type="password"
                fieldName="password1"
                register={register}
                properties={{ required: true }}
                errors={errors}
              />
            </div>
            <div className="input-groups">
              <Label>Confirm Password</Label>
              <TextBox
                type="password"
                fieldName="password2"
                register={register}
                properties={{ required: true }}
                errors={errors}
              />
            </div>
            <PrimaryBtn type="submit">Create new user</PrimaryBtn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
