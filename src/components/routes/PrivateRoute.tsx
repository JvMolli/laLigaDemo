import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
  component: React.ElementType;
  auth: boolean | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  auth,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={(props) =>
        auth === true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
