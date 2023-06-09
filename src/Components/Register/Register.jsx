import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import app from "../../FireBase/Firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailChange = (event) => {
    console.log(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");

    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    // validate
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("please add atleast one uppercase");
      return;
    }
    // create user in firebase

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        event.target.reset();
        setSuccess("User Created Successfully");
        sendVerificationEmail(result.user);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setSuccess("");
      });
  };

  const sendVerificationEmail = (user) => {
    sendEmailVerification(user).then((result) => {
      console.log(result);
      alert("please verify your email address");
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

        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
      <p>
        <small>
          Already have an account? please <Link to="/login">login</Link>
        </small>
      </p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Register;
