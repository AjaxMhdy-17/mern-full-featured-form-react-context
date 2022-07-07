import React , {useEffect} from "react";
import { useForm } from "react-hook-form";
import { useGlobalCtx } from "../../CtxAndProvider/CtxAndProvider";
import Layout from "../Layout/Layout";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { sendForgetPasswordEmail , msg } = useGlobalCtx();

  useEffect(() => {
    if (msg !== "") {
      if (msg === "Please Check Your Email") {
        reset()
      }
    }
  }, [msg , reset]);

  const handleSubmitForm = (data) => {
    sendForgetPasswordEmail(data);
  };


  return (
    <Layout>
      <div className="text-5xl mb-5">Forget Password</div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="form-group">
          <h4>{errors.email && <span>please enter a valid email</span>}</h4>
          <input
            type="email"
            className="form-control"
            placeholder="enter email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
        </div>
        <button className="btn btn-info col-12 mt-3">
          send reset link to email
        </button>
      </form>
    </Layout>
  );
};

export default ForgetPassword;
