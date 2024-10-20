import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { IUserData } from "../../../store/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { clearRedirect, fetchByLogin } from "../../../store/slices/userSlices";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const handleUserData: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(fetchByLogin(userData));
  };

  useEffect(() => {
    return () => {
      dispatch(clearRedirect());
    };
  }, [dispatch]);

  return (
    <form onSubmit={handleForm}>
      <input
        onChange={handleUserData}
        required
        value={userData.username}
        type="text"
        placeholder="Username"
        name="username"
      />
      <input
        onChange={handleUserData}
        value={userData.password}
        required
        type="password"
        placeholder="Password"
        name="password"
      />
      <button>Login</button>
    </form>
  );
};
export default Login;
