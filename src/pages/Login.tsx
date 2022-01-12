import React, { useContext, useState } from "react";
import Password from "../images/svg/Password";
import TextInput from "../components/TextInput";
import Person from "../images/svg/Person";
import "../styles/auth.css";
import { Link, Navigate } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql";
import { AuthContext } from "../context/Auth";

export default function Login() {
  const [{}, login] = useLoginMutation();
  const { setUser, setIsLoggedIn } = useContext(AuthContext);

  const [remember, setRemember] = useState(false);

  const [usernameOrEmail, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameOrEmailError, setEmailOrUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [redirect, setRedirect] = useState(false);

  const handleLogin = async () => {
    const user = {
      usernameOrEmail,
      password,
    };

    const result = await login(user);

    if (result.error) {
      console.error(result.error);
    }

    if (!result.data?.login.errors && result.data?.login.user) {
      setEmailOrUsernameError("");
      setPasswordError("");
      setIsLoggedIn(true);
      setUser({
        id: result.data.login.user.id,
        username: result.data.login.user.username,
      });
      setRedirect(true);
    } else if (result.data?.login.errors) {
      result.data?.login.errors.forEach((error) => {
        if (error.field == "usernameOrEmail") {
          setEmailOrUsernameError(error.message);
        } else if (error.field == "password") {
          setEmailOrUsernameError("");
          setPasswordError(error.message);
        }
      });
    }

    console.log(result);
  };

  return (
    <div className="body">
      {redirect && <Navigate to="/" />}
      <div className="main_container" style={{ flexDirection: "row-reverse" }}>
        <div className="image_container">
          <div className="image"></div>
          <Link to={"/register"}>Create an account</Link>
        </div>
        <div className="form_container">
          <div className="header">Log In</div>
          <div className="form">
            <TextInput
              Icon={<Person width={20} height={20} />}
              placeholder="Your email or username"
              value={usernameOrEmail}
              type="email"
              onChange={setEmailOrUsername}
              error={usernameOrEmailError}
            />
            <TextInput
              Icon={<Password width={20} height={20} />}
              placeholder="Password"
              value={password}
              secure
              onChange={setPassword}
              error={passwordError}
            />
            <div
              className="switch_container"
              onClick={() => {
                setRemember((oldValue) => !oldValue);
              }}
            >
              <div
                className="switch"
                style={{ backgroundColor: remember ? "cyan" : "lightgray" }}
              ></div>
              Remember me
            </div>
            <div className="btn_container">
              <div className="btn" onClick={handleLogin}>
                Log In
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
