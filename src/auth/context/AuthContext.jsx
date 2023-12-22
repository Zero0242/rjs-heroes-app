import { createContext, useReducer } from "react";
import { authReducer } from "./authReducer";
import { types } from "../types/types";

export const AuthContext = createContext({});

const initializer = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    logged: !!user,
    user: user,
  };
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {}, initializer);

  const userLogin = (name = "") => {
    dispatch({ type: types.login, payload: name });
    localStorage.setItem("user", JSON.stringify(name));
  };

  const userLogout = () => {
    dispatch({ type: types.logout });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        userLogin,
        userLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
