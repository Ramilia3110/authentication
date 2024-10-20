import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { logOut } from "../store/slices/userSlices";

const Header = () => {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/", { replace: true });
  };
  return (
    <header>{token && <button onClick={handleLogout}>Log out</button>}</header>
  );
};

export default Header;
