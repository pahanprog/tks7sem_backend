import React, { useContext, useState } from "react";
import Password from "../images/svg/Password";
import TextInput from "../components/TextInput";
import Person from "../images/svg/Person";
import "../styles/auth.css";
import { Link, Navigate } from "react-router-dom";
import Email from "../images/svg/Email";
import { useRegisterMutation } from "../generated/graphql";
import { AuthContext } from "../context/Auth";

export default function Register() {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const [remember, setRemember] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPasswotd] = useState("");

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswotdError] = useState("");

  const [redirect, setRedirect] = useState(false);

  const [{}, register] = useRegisterMutation();

  const handleSubmit = async () => {
    const user = {
      email,
      username,
      password,
    };

    const result = await register(user);

    if (result.error) {
      console.error(result.error);
    }

    if (!result.data?.register.errors && result.data?.register.user) {
      setEmailError("");
      setUsernameError("");
      setPasswotdError("");
      setIsLoggedIn(true);
      setUser({
        id: result.data.register.user.id,
        username: result.data.register.user.username,
      });
      setRedirect(true);
    } else if (result.data?.register.errors) {
      result.data?.register.errors.forEach((error) => {
        if (error.field == "email") {
          setPasswotdError("");
          setUsernameError("");
          setEmailError(error.message);
        } else if (error.field == "username") {
          setPasswotdError("");
          setEmailError("");
          setUsernameError(error.message);
        } else if (error.field == "password") {
          setEmailError("");
          setUsernameError("");
          setPasswotdError(error.message);
        }
      });
    }

    console.log(result);
  };

  return (
    <div className="body">
      {redirect && <Navigate to="/" />}
      <div className="main_container">
        <div className="image_container">
          <div className="image"></div>
          <Link to={"/login"}>Already have an account?</Link>
        </div>
        <div className="form_container">
          <div className="header">Register</div>
          <div className="form">
            <TextInput
              Icon={<Email width={20} height={20} />}
              placeholder="Email"
              value={email}
              type="email"
              onChange={setEmail}
              error={emailError}
            />
            <TextInput
              Icon={<Person width={20} height={20} />}
              placeholder="Username"
              value={username}
              onChange={setUsername}
              error={usernameError}
            />
            <TextInput
              Icon={<Password width={20} height={20} />}
              placeholder="Password"
              value={password}
              secure
              onChange={setPasswotd}
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
              <div className="btn" onClick={handleSubmit}>
                Register
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
