import React, { useContext, useReducer, useEffect } from "react";
import { User } from "../../../models/user";

type StateType = {
  me?: string | undefined;
  usersContex?: Array<User> | undefined;
};
type ActionType = {
  type: "SET_USER" | "SET_USERS" | "SET_ALL";
  value?: string | undefined;
  users?: Array<User> | undefined;
};

type ReducerType = (state: StateType, action: ActionType) => StateType;

export const userInitialState: StateType = {
  me: undefined,
  usersContex: undefined,
};

export const userManagementReducer: ReducerType = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { me: action.value };
    case "SET_USERS":
      return { usersContex: action.users };
    case "SET_ALL":
      return { me: action.value, usersContex: action.users };
    default:
      return state;
  }
};

export type UserContextType = React.Context<{
  state: StateType;
  dispatch: (action: any) => void;
  resetState: () => void;
}>;

export const UserContext = React.createContext({
  state: userInitialState,
  dispatch: (action: ActionType) => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userManagementReducer, userInitialState);
  useEffect(() => {
    if (!state.me) {
      dispatch({ type: "SET_USER", value: undefined });
    }
  }, []);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useMe = () => {
  const { state, dispatch } = useContext(UserContext);
  return { ...state, dispatch };
};
