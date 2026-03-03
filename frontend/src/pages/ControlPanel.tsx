import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/ControlPanel.css";

/* =========================
   TYPES
========================= */

type Role = {
  role_id: number;
  role_name: string;
  permissions: string[];
};

type UserRow = {
  id: number;
  fullName: string;
  role: string;
  position: string;
  permissions: string[];
};

const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState("General");

  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<UserRow[]>([]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [tempPermissions, setTempPermissions] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  /* =========================
     FETCH ROLES
  ========================== */

  const fetchRoles = async () => {
    const res = await fetch(
      "http://localhost/employee-system/backend/control_panel/get_roles_with_permissions.php" ,{
        credentials: "include"
      }
    );
    const data = await res.json();
    if (data.success) {
      setRoles(data.data);
    }
  };

  /* =========================
     FETCH USERS
  ========================== */

  const fetchUsers = async () => {
    const res = await fetch(
      "http://localhost/employee-system/backend/control_panel/get_users_with_permissions.php" ,{
        credentials: "include"
      }
    );
    const data = await res.json();
    if (data.success) {
      setUsers(data.data);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  /* =========================
     ROLE PERMISSION MODAL
  ========================== */

  const handleOpenRole = (role: Role) => {
    setSelectedRole(role);
    setTempPermissions([...role.permissions]);
  };

  const handleTogglePermission = (permission: string) => {
    setTempPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSaveRolePermissions = async () => {
    if (!selectedRole) return;

    await fetch(
      "http://localhost/employee-system/backend/control_panel/update_role_permissions.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role_id: selectedRole.role_id,
          permissions: tempPermissions,
        }),
        credentials: "include",
      }
    );

    setSelectedRole(null);
    fetchRoles();
    fetchUsers(); // refresh user permissions automatically
  };

  /* =========================
     SEARCH USERS
  ========================== */

  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  /* =========================
     RETURN
  ========================== */

  return (
    <div className="control-panel-layout">
      <Sidebar />

      <div className="control-panel-main">
        <div className="control-panel-container">

          {/* HEADER */}
          <div className="control-panel-header">
            <h1 className="control-panel-title">Control Panel</h1>
            <p className="control-panel-subtitle">
              Manage role-based permissions
            </p>
          </div>

          {/* TABS */}
          <div className="control-panel-tabs">
            {["General", "Search"].map((tab) => (
              <button
                key={tab}
                className={`control-panel-tab ${
                  activeTab === tab ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ================= GENERAL TAB ================= */}
          {activeTab === "General" && (
            <div className="control-panel-grid">
              {roles.map((role) => (
                <div key={role.role_id} className="control-panel-card">
                  <div className="control-panel-card-header">
                    {role.role_name}
                  </div>

                  <div className="control-panel-card-body">
                    <p className="control-panel-permission-title">
                      Permissions:
                    </p>

                    <ul>
                      {role.permissions.map((perm) => (
                        <li key={perm}>{perm}</li>
                      ))}
                    </ul>

                    <button
                      className="control-panel-permission-btn"
                      onClick={() => handleOpenRole(role)}
                    >
                      Edit Permissions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ================= SEARCH TAB ================= */}
          {activeTab === "Search" && (
            <>
              <div className="control-panel-search-bar">
                <input
                  type="text"
                  placeholder="Search a User..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="control-panel-table-wrapper">
                <table className="control-panel-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Role</th>
                      <th>Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.fullName}</td>
                        <td>{user.role}</td>
                        <td>{user.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ================= ROLE MODAL ================= */}
          {selectedRole && (
            <div className="control-panel-modal-overlay">
              <div className="control-panel-modal">
                <h3>{selectedRole.role_name}</h3>

                <div className="control-panel-permission-list">
                  {roles
                    .flatMap((r) => r.permissions)
                    .filter(
                      (value, index, self) =>
                        self.indexOf(value) === index
                    )
                    .map((permission) => (
                      <label key={permission}>
                        <input
                          type="checkbox"
                          checked={tempPermissions.includes(permission)}
                          onChange={() =>
                            handleTogglePermission(permission)
                          }
                        />
                        {permission}
                      </label>
                    ))}
                </div>

                <div className="control-panel-modal-actions">
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="control-panel-cancel-btn"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSaveRolePermissions}
                    className="control-panel-apply-btn"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ControlPanel;