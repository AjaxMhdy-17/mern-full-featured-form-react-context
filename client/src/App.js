import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActivateEmail from "./Components/Auth/ActivateEmail";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import Login from "./Components/Auth/Login";
import Profile from "./Components/Auth/Profile";
import Register from "./Components/Auth/Register";
import ResetPassword from "./Components/Auth/ResetPassword";
import Header from "./Components/Header/Header";
import Home from "./Components/Pages/Home";
import { useGlobalCtx } from "./CtxAndProvider/CtxAndProvider";

function App() {
  const { msg, clearMsg, loadCurrentUser, isAuthenticated } = useGlobalCtx();

  // console.log(useGlobalCtx());

  useEffect(() => {
    if (msg !== "") {
      toast(msg);
    }
    clearMsg();
  }, [msg]);

  useEffect(() => {
    loadCurrentUser();
  }, [isAuthenticated]);

  return (
    <div className="">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="/reset/:id" element={<ResetPassword />} />
        <Route path="/user/activate/:id" element={<ActivateEmail />} />
      </Routes>
    </div>
  );
}

export default App;
