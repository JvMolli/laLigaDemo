import React from "react";
import { User } from "../../../models/user";

import { useHistory } from "react-router";
import { AiFillDelete } from "react-icons/ai";
import { deleteUser } from "../../../services";
import { reject, propEq } from "ramda";

import "../../../style/animations.scss";
import { useMe } from "../../common/context/userMag";

type UserProps = {
  user: User;
};

export const UsersElement: React.FC<UserProps> = ({ user }) => {
  const { me, usersContex, dispatch } = useMe();
  const history = useHistory();
  const handleDelete = async (e: any) => {
    e.stopPropagation();
    const res = await deleteUser(user.id);
    if (res.status > 200 && res.status < 300) {
      alert("The user should be delete");
      const newUserss = usersContex
        ? reject(propEq("id", user.id), usersContex)
        : undefined;
      dispatch({ type: "SET_ALL", value: me, users: newUserss });
    }
  };
  return (
    <li
      key={`user_element_${user.id}`}
      className="animation-left-abs"
      onClick={() => history.push(`userContainer/${user.id}`)}
    >
      <img src={user.avatar} />
      <h3>{`${user.first_name} ${user.last_name}`}</h3>
      <p>{user.email}</p>
      <div className="icon" onClick={handleDelete}>
        <AiFillDelete size={25} />
      </div>
    </li>
  );
};
