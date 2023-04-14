import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../FireBase/Firebase.config";

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    console.log(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    // create user in firebase

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        event.target.reset();
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div className="w-50 mx-auto">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="w-50 mb-4 rounded ps-2"
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          placeholder="your Email"
          required
        />
        <br />
        <input
          className="w-50 mb-4 rounded px-2"
          onBlur={handlePasswordBlur}
          type="password"
          name="password"
          id="password"
          placeholder="your Password"
          required
        />
        <br />
        <p className="text-danger">{error}</p>
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
