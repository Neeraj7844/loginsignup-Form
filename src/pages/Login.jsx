import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./../styles/Home.css";

function Login() {

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    pass: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      const response = await fetch(
        "https://fullstack-3-sqha.onrender.com/api/users/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (!response.ok) {

        setError(result.message);

        return;

      }

      localStorage.setItem("token", result.token);

      alert(result.message);

      navigate("/users");

    } catch (err) {

      console.log(err);

      setError("Something went wrong");

    }

  };

  return (

    <div className="container">

      <div className="form-box">

        <h1>Login</h1>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="pass"
            placeholder="Enter Password"
            value={formData.pass}
            onChange={handleChange}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>

          Don't have account ?

          <Link to="/">
            Signup
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;