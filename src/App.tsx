import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/WorkDir/Home/Home";
import PreviewHome from "./pages/AuthDir/previewHome/PreviewHome";
import Login from "./pages/AuthDir/login/Login";
import Registration from "./pages/AuthDir/registration/Registration";

function App() {
  const { token, redirect } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  console.log(redirect);

  useEffect(() => {
    return () => {
      token && redirect === "/" && navigate(redirect, { replace: true });
    };
  }, [navigate, redirect, token]);
  return (
    <div className="App">
      <Header />
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="/" element={<PreviewHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
