import React, { useState, useEffect } from "react";

import { UsersList } from "../components/UsersList/UsersList";
import { User } from "../models/user";
import { Layout } from "../components/Layout/Layout";
import ClipLoader from "react-spinners/ClipLoader";

import { get } from "../services";
import { useMe } from "../components/common/context/userMag";

export const UsersListContainer: React.FC = () => {
  const { usersContex } = useMe();
  const [userss, setUsers] = useState<Array<User>>([]);
  const [loading, setLoading] = useState(true);
  const handleUser = async () => {
    const getUsers: Array<User> = await get("users").then((res) => {
      return res.data;
    });
    setUsers(getUsers);
    setLoading(false);
  };
  useEffect(() => {
    handleUser();
  }, []);

  return (
    <Layout>
      <div style={{ position: "absolute", top: 100 }}>
        <ClipLoader size={100} color={"white"} loading={loading} />
      </div>
      <UsersList users={usersContex || userss} />
    </Layout>
  );
};
