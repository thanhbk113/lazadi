import { Navigate, useLocation } from "react-router-dom";

import React from "react";
import { useAppSelector } from "../../hooks/hooks";

interface Props {
  children?: React.ReactNode;
}
const RequireAuth: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default RequireAuth;
