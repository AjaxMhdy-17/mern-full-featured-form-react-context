import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { useGlobalCtx } from "../../CtxAndProvider/CtxAndProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logoutUser  , isAuthenticated} = useGlobalCtx();

  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated === null){
      navigate('/login' , {
        replace : true
      })
    }
  },[navigate , isAuthenticated])


  const logoutHandler = () => {
    logoutUser();
  };

  return (
    <Layout>
      <div className="text-6xl">Home</div>
      <button onClick={logoutHandler} className="btn btn-dange">
        logout
      </button>
    </Layout>
  );
};

export default Home;
