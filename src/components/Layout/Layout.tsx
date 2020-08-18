import React, { ReactNode } from "react";
import { AiOutlineLogout } from "react-icons/ai";

import "./Layout.scss";
import { useMe } from "../common/context/userMag";

type LayoutProps = {
  name?: string;
  avatar?: () => ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ name, avatar, children }) => {
  const { dispatch } = useMe();
  return (
    <div className="layout">
      <header
        className="header"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        {avatar ? (
          avatar()
        ) : (
          <AiOutlineLogout
            style={{ cursor: "pointer" }}
            size={35}
            onClick={() => {
              dispatch({ type: "SET_USER", value: undefined });
            }}
          />
        )}
        {name ? <label>{name}</label> : null}
      </header>
      {children}
    </div>
  );
};
