import { User } from "../../models/user";

const API = "https://reqres.in/api/";

/**
 * @author jaime mollinedo
 * @param url the resto of url for the endpoint
 * @description is a general function for get request
 */
export const get = (url: string) => {
  return fetch(`${API}${url}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.warn("err", error);
      return error;
    });
};

/**
 * @author jaime mollinedo
 * @param email the email to login
 * @param pass the password could be a nonEmpty string
 * @description login request
 */
export const login = (email: string, pass: string) => {
  return fetch(`${API}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.error({ err });
      alert("something went wrong");
      return err.json();
    });
};

/**
 * @author jaime mollinedo
 * @param id id from user to delete
 * @description delete user
 */
export const deleteUser = (id: number) => {
  return fetch(`${API}${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};
/**
 * @author jaime mollinedo
 * @param user the object with field to modify
 * @description modify user
 */
export const modifyUser = (
  user: Pick<User, "email" | "first_name" | "last_name">,
  id: number
) => {
  return fetch(`${API}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...user,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => err);
};
