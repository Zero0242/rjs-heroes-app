import { createContext, useReducer } from "react";
import { authReducer } from "./authReducer";
import { types } from "../types/types";

export const AuthContext = createContext({});

const initialState = {
  logged: false,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const userLogin = (name = "") => dispatch({ type: types.login, payload: name });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        userLogin,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
