/* eslint-disable jsx-a11y/alt-text */
import React, { useState, ChangeEvent } from "react";

import { User } from "../../../models/user";
import Form from "../../Form";
import { FormInput } from "../../Form/FormInput";
import Button from "../../Button";
import { modifyUser } from "../../../services";
import { useMe } from "../../common/context/userMag";
import { useHistory } from "react-router";

import "./UserList.scss";

type UserListProps = {
  user: User;
};

export const UserProfile: React.FC<UserListProps> = ({ user }) => {
  const { id, email, first_name, last_name, avatar } = user;
  const { me, usersContex, dispatch } = useMe();
  const history = useHistory();
  const [name, setName] = useState<string>(first_name);
  const [latName, setLastName] = useState<string>(last_name);
  const [emailUser, setEmail] = useState<string>(email);
  const handleEvent = (
    e: ChangeEvent<HTMLInputElement>,
    set: (event: any) => void
  ) => {
    set(e.currentTarget.value);
  };

  const handleModifyUser = async (e: any) => {
    e.preventDefault();
    const modify = await modifyUser(
      {
        email: emailUser || email,
        first_name: name || last_name,
        last_name: latName,
      },
      id
    );
    if (modify.updatedAt) {
      alert(`The user ${
        emailUser || email
      } should be modify but only in this app
      not in the API
      `);
      const newUsers = usersContex
        ? usersContex.map((x: User) => {
            if (x.id === user.id) {
              return {
                id: x.id,
                email: emailUser || email,
                first_name: name || last_name,
                last_name: latName,
                avatar: x.avatar,
              };
            }
            return x;
          })
        : undefined;
      dispatch({ type: "SET_ALL", value: me, users: newUsers });
      history.push("/userList");
    }
  };
  return (
    <div className="profile">
      <img src={avatar} />
      <div>
        <Form id="form">
          <FormInput
            type="text"
            labelText="name"
            placeholder="enter your user email"
            onChange={(e) => {
              handleEvent(e, setName);
            }}
            animate="right"
            value={name || first_name}
          />

          <FormInput
            labelText={"last name"}
            placeholder=""
            onChange={(e) => {
              handleEvent(e, setLastName);
            }}
            animate="left"
            value={latName || last_name}
          />
          <FormInput
            labelText={"email"}
            placeholder={"email"}
            onChange={(e) => {
              handleEvent(e, setEmail);
            }}
            animate="left"
            value={emailUser || email}
          />
          <Button type="submit" disabled={false} onClick={handleModifyUser}>
            Modify
          </Button>
        </Form>
      </div>
    </div>
  );
};
