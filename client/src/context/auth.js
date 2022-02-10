import React, { createContext, useReducer } from "react";

const initialState = {
  user: null,
  login: (userData) => {},
  logout: () => {},
};
const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const login = (userData) => {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
