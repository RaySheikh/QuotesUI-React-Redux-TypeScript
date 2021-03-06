import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  UPDATE_USERNAME,
  UPDATE_PASSWORD,
  UPDATE_LOGIN,
  LOGIN_ERROR,
} from "../actions/constants";
import Login from "../components/Login";
import { PASSWORD } from "../env";

interface LoginState {
  username: string;
  PASSWORD: string;
  errorMessage: string;
  loginReducer: any;
}

const LoginWithData = () => {
  const { username, PASSWORD, errorMessage } = useSelector(
    (state: LoginState) => ({
      ...state.loginReducer,
    })
  );

  const dispatch = useDispatch();
  const clearErrorMessage = () => {
    dispatch({
      type: LOGIN_ERROR,
      payload: "",
    });
  };
  const onUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    dispatch({
      type: UPDATE_USERNAME,
      payload: e.target.value,
    });
    if (errorMessage) {
      clearErrorMessage();
    }
    e.preventDefault();
  };
  const onPwChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    dispatch({
      type: UPDATE_PASSWORD,
      payload: e.target.value,
    });
    if (errorMessage) {
      clearErrorMessage();
    }
    e.preventDefault();
  };
  const onLogin = (
    e: React.SyntheticEvent<HTMLButtonElement | HTMLFormElement>
  ): void => {
    const name = "Ray";
    const pwd = PASSWORD;
    if (username === name && PASSWORD === pwd) {
      dispatch({
        type: UPDATE_LOGIN,
        payload: true,
      });
    } else if (username || PASSWORD) {
      dispatch({
        type: LOGIN_ERROR,
        payload: "Invalid username or password.",
      });
    } else {
      dispatch({
        type: LOGIN_ERROR,
        payload: "Please enter a username and password",
      });
    }
    e.preventDefault();
  };
  return (
    <Login
      onLogin={onLogin}
      username={username}
      onUserChange={onUserChange}
      PASSWORD={PASSWORD}
      onPwChange={onPwChange}
      errorMessage={errorMessage}
    />
  );
};

export default LoginWithData;
