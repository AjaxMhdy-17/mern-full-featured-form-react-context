import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobalCtx } from "../../CtxAndProvider/CtxAndProvider";

const PrivateRoute = () => {
  const { isAuthenticated , loading } = useGlobalCtx();

  if (loading === false && isAuthenticated === null) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }

  //   return <div>PrivateRoute</div>;
};

export default PrivateRoute;
