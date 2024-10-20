import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { INullable, IUserData } from "../../../store/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  clearRedirect,
  fetchByAddNewUser,
} from "../../../store/slices/userSlices";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const dispatch = useAppDispatch();
  const { loading, error, redirect } = useAppSelector((state) => state.user);
  const [userData, setUserData] = useState<IUserData>({
    email: "",
    username: "",
    password: "",
  });

  const [repeatPass, setRepeatPass] = useState<string>("");

  const [errorText, setErrorText] = useState<INullable<string>>(null);

  const [showPass, setShowPass] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleUserData: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (
      userData.email &&
      userData.username.trim().length &&
      userData.password.trim().length &&
      repeatPass.trim().length &&
      userData.password === repeatPass
    ) {
      setErrorText("");
      // Dispatch the action to register the user
      dispatch(fetchByAddNewUser(userData));
    } else if (!userData.username.trim().length) {
      setErrorText("Enter a correct username");
    } else if (!userData.password.trim().length) {
      setErrorText("Enter a correct password");
    } else if (!repeatPass.trim().length) {
      setErrorText("Re-enter password");
    } else if (userData.password !== repeatPass) {
      setErrorText("Passwords do not match");
    }
  };

  useEffect(() => {
    if (redirect === "/login") {
      navigate(redirect);
    }
    return () => {
      redirect && dispatch(clearRedirect());
    };
  }, [dispatch, redirect, navigate]);
  return (
    <form onSubmit={handleForm}>
      <input
        onChange={handleUserData}
        required
        value={userData.username}
        type="text"
        placeholder="Username"
        name="username"
      />{" "}
      <br />
      <input
        onChange={handleUserData}
        value={userData.email}
        required
        type="email"
        placeholder="Email"
        name="email"
      />
      <br />
      <input
        onChange={handleUserData}
        value={userData.password}
        required
        type={showPass ? "text" : "password"}
        placeholder="Password"
        name="password"
      />
      <br />
      <input
        value={repeatPass}
        onChange={(e) => setRepeatPass(e.target.value)}
        required
        type={showPass ? "text" : "password"}
        placeholder="Repeat Password"
      />
      <br />
      <label>
        <input
          type="checkbox"
          onChange={() => {
            setShowPass(!showPass);
          }}
        />
        <span>Show password</span>
      </label>
      <br />
      <button disabled={loading}>Registration</button>
      <br />
      {errorText && <span style={{ color: "red{" }}>{errorText}</span>}
      {error && <span style={{ color: "red" }}>{error}</span>}
    </form>
  );
};

export default Registration;
