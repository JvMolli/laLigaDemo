import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { User } from "../models/user";
import { Layout } from "../components/Layout/Layout";
import { get } from "../services";
import { UserProfile } from "../components/UsersList/UserProfile/UserProfile";

export const UserContainer: React.FC = () => {
  const { id } = useParams();
  const [users, setUsers] = useState<User>({} as User);
  const handleUser = async () => {
    const getUser: User = await get(`users/${id}`).then((res) => {
      return res.data;
    });
    setUsers(getUser);
  };
  useEffect(() => {
    handleUser();
  }, []);

  return (
    <Layout>
      <UserProfile user={users} />
    </Layout>
  );
};
