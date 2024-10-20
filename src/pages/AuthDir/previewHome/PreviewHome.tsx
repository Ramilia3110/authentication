import React from "react";
import { Link } from "react-router-dom";

const PreviewHome = () => {
  return (
    <div>
      <h1>Preview Home</h1>
      <Link to={`/login`}>Login</Link>
      <br />
      <Link to={`/registration`}>Registration</Link>
    </div>
  );
};

export default PreviewHome;
