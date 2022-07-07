import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalCtx } from "../../CtxAndProvider/CtxAndProvider";
import { useEffect } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const { loginUser, isAuthenticated } = useGlobalCtx();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/", {
        replace: true,
      });
    }
    console.log("runn");
  }, [isAuthenticated, navigate]);

  const handleSubmitForm = (data) => {
    loginUser(data);
  };

  return (
    <Layout center form_layout>
      <div className="text-5xl">Login</div>

      <div>
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
          <button className="btn btn-info col-12 mt-3">Login</button>
        </form>

        <div className="mt-5">
          <Link to="/forget_password" className="no-underline">
            <div className={`bg-red-500 w-full py-2 rounded-md text-white`}>
              forget password
            </div>
          </Link>
        </div>
        <div className="mt-5">
          <Link to="/register" className="no-underline">
            <div className={`bg-orange-500 w-full py-2 rounded-md text-white`}>
              Have No Account ? Register Here!
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
