import React from "react";
import { User } from "../../models/user";
import { UsersElement } from "./UsersElement/UsersElement";

import "./UserList.scss";

type UserListProps = {
  users: Array<User>;
};

export const UsersList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="users">
      {users.length ? (
        <ul>
          {users.map((x: User) => (
            <UsersElement key={x.id} user={x} />
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};
