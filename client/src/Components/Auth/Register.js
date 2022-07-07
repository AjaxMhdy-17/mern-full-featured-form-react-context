import React from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useGlobalCtx } from "../../CtxAndProvider/CtxAndProvider";
import { useEffect } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const { msg, registerUser, isAuthenticated } = useGlobalCtx();
  const navigate = useNavigate();

  // console.log(useGlobalCtx());

  // useEffect(() => {
 
  
  // }, [navigate , ]);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/", {
        replace: true,
      });
    }
    if (msg === "user registration successfull") {
      navigate("/login", {
        replace: true,
      });
    }
    // console.log('runn');
  }, [navigate, isAuthenticated , msg]);

  const handleSubmitForm = (data) => {
    registerUser(data);
  };

  return (
    <Layout center>
      <div className="text-5xl ">Register</div>

      <div>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="form-group">
            <h4>{errors.name && <span>please enter your name</span>}</h4>
            <input
              type="text"
              className="form-control"
              placeholder="enter name"
              {...register("name", {
                required: true,
              })}
            />
          </div>
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
          <button className="btn btn-info col-12 mt-3">register</button>
        </form>

        <div className="mt-5">
          <Link to="/login" className="no-underline">
            <div className={`bg-orange-500 w-full py-2 rounded-md text-white`}>
              Have A Account ? Login Here!
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
