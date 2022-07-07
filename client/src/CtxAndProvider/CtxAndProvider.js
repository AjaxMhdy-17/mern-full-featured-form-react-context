import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

const AppContext = createContext();

const initialState = {
  msg: "",
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: null,
};

const UserReducer = (state, action) => {
  if (action.type === "setMsg") {
    return {
      ...state,
      msg: action.payload,
    };
  } else if (action.type === "loadingTrue") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "loginUser") {
    return {
      ...state,
      token: action.payload.token,
      msg: action.payload.message,
      isAuthenticated: true,
      loading: false,
    };
  } else if (action.type === "loadCurrentUser") {
    return {
      ...state,
      user: action.payload,
      isAuthenticated: true,
      loading: false,
    };
  } else if (action.type === "logoutUser") {
    return {
      ...state,
      user: null,
      isAuthenticated: null,
      token: null,
      loading: null,
      msg: "",
    };
  } else if (action.type === "clearMsg") {
    return {
      ...state,
      msg: action.payload,
    };
  } else if (action.type === "authErrorResetAll") {
    localStorage.removeItem("token");
    return {
      ...state,
      msg: action.payload,
      user: null,
      token: null,
      isAuthenticated: null,
      loading: null,
    };
  }

  return state;
};

const CtxAndProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const clearMsg = async () => {
    dispatch({
      type: "clearMsg",
      payload: "",
    });
  };

  const registerUser = async (data) => {
    console.log(data);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post("/api/auth/register", data, { config });
      if (response.data) {
        console.log(response.data);
        dispatch({
          type: "setMsg",
          payload: response.data.message,
        });
      }
    } catch (error) {
      //   console.log(error.response.data.message);
      //   toast(error.response.data.message);
      dispatch({
        type: "setMsg",
        payload: error.response.data.message,
      });
    }
  };

  const loginUser = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post("/api/auth/login", data, { config });
      if (response.data) {
        // console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        dispatch({
          type: "loginUser",
          payload: response.data,
        });
      }
    } catch (error) {
      //   console.log(error.response.data.message);
      //   toast(error.response.data.message);
      localStorage.removeItem("token");
      dispatch({
        type: "setMsg",
        payload: error.response.data.message,
      });
    }
  };

  const loadCurrentUser = async () => {
    // if(localStorage)

    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      dispatch({
        type: "loadingTrue",
      });

      const res = await axios.get("/api/auth/currentUser", config);

      if (res) {
        console.log(res.data);
        dispatch({
          type: "loadCurrentUser",
          payload: res.data,
        });
      }
    } catch (error) {
      localStorage.removeItem("token");
      dispatch({
        type: "authErrorResetAll",
        payload: error.response.data.message,
      });
    }
  };

  const logoutUser = async () => {
    localStorage.removeItem("token");
    dispatch({
      type: "logoutUser",
    });
  };

  const sendForgetPasswordEmail = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/auth/forget_password", data, {
        config,
      });

      if (res) {
        // console.log(res.data.msg);
        dispatch({
          type: "setMsg",
          payload: res.data.msg,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: "setMsg",
        payload: error.response.data.message,
      });
    }
  };

  const submitResetPassword = async (data, urlParameter) => {
    console.log(data);
    console.log(urlParameter);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `/api/auth/reset_pass/${urlParameter}`,
        data,
        { config }
      );

      if (res) {
        dispatch({
          type: "setMsg",
          payload: res.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: "authErrorResetAll",
        payload: error.response.data.message,
      });
    }
  };

  const activateEmail = async (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // console.log(data);

    try {
      const res = await axios.post("/api/auth/activate_email", {token}, {
        config,
      });

      if (res) {
        console.log(res.data);
        dispatch({
          type: "setMsg",
          payload: res.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: "setMsg",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearMsg,
        registerUser,
        loginUser,
        loadCurrentUser,
        logoutUser,
        sendForgetPasswordEmail,
        submitResetPassword,
        activateEmail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalCtx = () => {
  return useContext(AppContext);
};

export default CtxAndProvider;
