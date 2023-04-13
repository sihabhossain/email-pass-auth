import React from "react";

const Register = () => {
  return (
    <div>
      <h2>Register</h2>

      <form>
        <input type="email" name="email" id="email" />
        <br />
        <input type="password" name="password" id="password" />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
