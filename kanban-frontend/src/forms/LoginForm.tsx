import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import Cookies from "js-cookie";

import Label from "@/components/Label/Label";
import TextBox from "@/components/TextBox/TextBox";
import { PrimaryBtn } from "@/components/Button/Button";

import { loginRequest } from "@/utils/request";
import router from "@/utils/route";

import "./form.scss";
import "./auth.scss";

type LoginInput = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const OnSubmit: SubmitHandler<LoginInput> = (data) => {
    loginRequest(data)
      .then((res) => Cookies.set("token", res.data.key))
      .then(() => router.history.push("/"))
      .catch(() => alert("You might've entered wrong username or password"))
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
                fieldName="password"
                register={register}
                properties={{ required: true }}
                errors={errors}
              />
            </div>

            <PrimaryBtn type="submit">Login</PrimaryBtn>
          </form>
        </div>
      </div>
      <p className="text-theme register-link">Don't have account yet? Register <Link to="/register">here</Link>.</p>
    </div>
  );
};

export default LoginForm;
