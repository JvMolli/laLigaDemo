import React, { useState } from "react";

import Form from "../Form";
import { FormInput } from "../Form/FormInput";
import Button from "../Button";

import { login, get } from "../../services";
import { useMe } from "../common/context/userMag";
import { useHistory } from "react-router";
import { User } from "../../models/user";

import "./Login.scss";

type LoginProps = {};

export const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string | undefined>(
    "george.bluth@reqres.in"
  );
  const [pass, setPass] = useState<string | undefined>();

  const handleUser = async () => {
    const getUsers: Array<User> = await get("users").then((res) => {
      return res.data;
    });
    return getUsers;
  };

  const history = useHistory();
  const { dispatch } = useMe();

  const handleLogin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const regEx = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (email && regEx.test(email!)) {
      const res = await login(email, pass || "qwer");
      if (res.token) {
        const users = await handleUser();
        dispatch({
          type: "SET_ALL",
          value: res.token as string,
          users: users,
        });
        history.push("/userList");
      } else if (res.error) {
        alert(res.error);
      }
    } else {
      alert("Please write a valid email");
    }
  };

  return (
    <div className="login animation-rigth">
      <div style={{ zIndex: 1 }}>
        <Form id="login form">
          <FormInput
            labelText={"user"}
            placeholder={"enter your user email"}
            type="email"
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            animate="right"
            value={email}
            required
          />

          <FormInput
            labelText={"password"}
            placeholder={"enter your password"}
            type="password"
            onChange={(e) => {
              setPass(e.currentTarget.value);
            }}
            animate="left"
          />
          <Button
            type="submit"
            disabled={!email || !pass}
            onClick={(e) => handleLogin(e)}
          >
            LogIn
          </Button>
        </Form>
      </div>
      <div className="cover" style={{ zIndex: 0 }}></div>
    </div>
  );
};
