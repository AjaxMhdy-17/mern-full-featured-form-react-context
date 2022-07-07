import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalCtx } from "../../CtxAndProvider/CtxAndProvider";
import Layout from "../Layout/Layout";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const { submitResetPassword, msg } = useGlobalCtx();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (msg !== "") {
      if (msg === "password reset successfully!") {
        navigate("/login", {
          replace: true,
        });
      }
    }
  }, [msg , navigate]);

  const handleSubmitForm = (data) => {
    submitResetPassword(data, params.id);
  };

  return (
    <Layout>
      <div className="text-5xl mb-5">Reset Password</div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="form-group">
          <h4>
            {errors.password && (
              <span>password length more then 5 characture</span>
            )}
          </h4>
          <input
            className="form-control"
            type="text"
            placeholder="enter password"
            {...register("password", {
              required: true,
              minLength: 5,
            })}
          />
        </div>
        <button className="btn btn-info col-12 mt-3">save your password</button>
      </form>
    </Layout>
  );
};

export default ResetPassword;
