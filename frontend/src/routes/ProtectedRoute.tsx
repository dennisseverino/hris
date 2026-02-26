import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetch("http://localhost/employee-system/backend/control_panel/get_user.php", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        const role = data.user.role_name;

        if (!allowedRoles || allowedRoles.includes(role)) {
          setAuthorized(true);
        }
      })
      .catch(() => {
        setAuthorized(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [allowedRoles]);

  if (loading) return null;

  if (!authorized) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;