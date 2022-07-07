import React from "react";
import Layout from "../Layout/Layout";

import { useGlobalCtx } from "../../CtxAndProvider/CtxAndProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated, user, logoutUser } = useGlobalCtx();

    console.log(useGlobalCtx());

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === null) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [isAuthenticated]);

  if (user === null) {
    return <Layout>Loading</Layout>;
  }

  return (
    <Layout>
      <div className="text-5xl">Profile Page</div>
      <div className="mt-5 space-y-3">
        <div className="text-2xl">
            Name : {user.name}
        </div>
        <div className="text-2xl ">
            Email : {user.email}
        </div>
        <div>
            <button onClick={logoutUser} className="btn">
                Logout
            </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
