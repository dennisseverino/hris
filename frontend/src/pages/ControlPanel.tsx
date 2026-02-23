import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/ControlPanel.css";

/* =========================
   TYPES
========================= */

type Permission = {
  label: string;
  checked: boolean;
};

type RolePermissions = {
  role: string;
  permissions: Permission[];
};

type UserRow = {
  id: string;
  fullName: string;
  role: string;
  position: string;
  permissions: string[];
};

type LogRow = {
  id: number;
  description: string;
  role: string;
  position: string;
  time: string;
};

type ArchivedUser = {
  id: number;
  name: string;
  dateDeleted: string;
  role: string;
  position: string;
};

const rolePermissionMap: Record<string, string[]> = {
  "Super Admin": [
    "Add Employee",
    "Edit Employee",
    "Delete Employee",
    "Set Attendance",
    "Edit Attendance",
    "View Dashboard",
    "View Team",
    "View Attendance",
    "View Employee List",
    "Edit Profile",
    "View Employee List",
  ],
  Admin: [
    "Add Employee",
    "Edit Employee",
    "Delete Employee",
    "Set Attendance",
    "Edit Attendance",
    "View Dashboard",
    "View Team",
  ],
  "Team Coach": [
    "View Team",
    "View Attendance",
    "Edit Attendance",
    "View Dashboard",
     "View Team",
    "View Attendance",
    "View Employee List",
  ],
  Employee: [
    "View Dashboard",
    "View Team",
    "View Attendance",
    "View Employee List",
    "Edit Profile",
  ],
};

/* =========================
   COMPONENT
========================= */



const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState("General");

  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
const [tempPermissions, setTempPermissions] = useState<string[]>([]);

const handleOpenPermissions = (user: UserRow) => {
  setSelectedUser(user);
  setTempPermissions([...user.permissions]);
};

const handleApplyPermissions = () => {
  if (!selectedUser) return;

  setUsers((prev) =>
    prev.map((user) =>
      user.id === selectedUser.id
        ? { ...user, permissions: tempPermissions }
        : user
    )
  );

  setSelectedUser(null);
};

const handleTogglePermission = (permission: string) => {
  setTempPermissions((prev) =>
    prev.includes(permission)
      ? prev.filter((p) => p !== permission)
      : [...prev, permission]
  );
};
  

  /* =========================
     GENERAL TAB
  ========================== */

  const [roles, setRoles] = useState<RolePermissions[]>([
    {
      role: "Admin",
      permissions: [
        { label: "Edit Employee", checked: false },
        { label: "Add Employee", checked: false },
        { label: "Delete Employee", checked: false },
        { label: "Set Attendance", checked: false },
        { label: "Edit Attendance", checked: false },
      ],
    },

        {
      role: "Coach",
      permissions: [
        { label: "Edit Team Employee", checked: false },
        { label: "Set Attendance", checked: false },
        { label: "Edit Attendance", checked: false },
        { label: "View Dashboard", checked: false },
        { label: "View Team", checked: false },
        { label: "View Attendance", checked: false },
        { label: "View Employee List", checked: false },
      ],
    },

    {
      role: "Superadmin",
      permissions: [
        { label: "Add Employee", checked: false },
        { label: "Delete Employee", checked: false },
        { label: "Edit Profile", checked: false },
        { label: "Set Attendance", checked: false },
        { label: "Edit Attendance", checked: false },
        { label: "View Dashboard", checked: false },
        { label: "View Team", checked: false },
        { label: "View Attendance", checked: false },
        { label: "View Employee List", checked: false },
      ],
    },

        {
      role: "Employees",
      permissions: [
        { label: "Edit Profile", checked: false },
        { label: "View Dashboard", checked: false },
        { label: "View Team", checked: false },
        { label: "View Attendance", checked: false },
        { label: "View Employee List", checked: false },
      ],
    },
  ]);

  const handleCheckboxChange = (roleIndex: number, permIndex: number) => {
    const updated = [...roles];
    updated[roleIndex].permissions[permIndex].checked =
      !updated[roleIndex].permissions[permIndex].checked;
    setRoles(updated);
  };

  /* =========================
     SEARCH TAB
  ========================== */

const [users, setUsers] = useState<UserRow[]>([

  
  {
    id: "2202322",
    fullName: "Dennis B. Severino IV",
    role: "Super Admin",
    position: "NOC Tier 1 Support",
    permissions: rolePermissionMap["Super Admin"],
  },
  {
    id: "2202323",
    fullName: "John Doe",
    role: "Admin",
    position: "Accounting",
    permissions: rolePermissionMap["Admin"],
  },
  {
    id: "2202324", 
    fullName: "Jane Smith",
    role: "Team Coach",
    position: "NOC Tier 1 Support",
    permissions: rolePermissionMap["Team Coach"],
  },
  {
    id: "2202325",
    fullName: "Emily Davis",
    role: "Employee",
    position: "Accounting",
    permissions: rolePermissionMap["Employee"],
  }
]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  /* =========================
     LOGS TAB
  ========================== */

  const [logs] = useState<LogRow[]>([
    {
      id: 1,
      description: "User ID 1 edited User 2 attendance",
      role: "Super Admin",
      position: "NOC Tier 1 Support",
      time: "1:43 PM",
    },
    {
      id: 2,
      description: "User ID 2 added new employee",
      role: "Admin",
      position: "Accounting",
      time: "2:10 PM",
    },
    {
      id: 3,
      description: "User ID 1 deleted User 3",
      role: "Team Coach",
      position: "NOC Tier 1 Support",
      time: "3:05 PM",
    },

    {
      id: 4,
      description: "User ID 3 edited their profile",
      role: "Employee",
      position: "Accounting",
      time: "4:20 PM",
    }
  ]);

  /* =========================
     ARCHIVE TAB
  ========================== */

  const [archivedUsers, setArchivedUsers] = useState<ArchivedUser[]>([
    {
      id: 1,
      name: "Dennis B Severino IV",
      dateDeleted: "March 12, 2018",
      role: "Admin",
      position: "NOC Tier 1 Support",
    },
    {
      id: 2,
      name: "John Doe",
      dateDeleted: "January 1, 2026",
      role: "Employee",
      position: "Accounting",
    },
    
  ]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* Indeterminate checkbox */
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        selectedIds.length > 0 &&
        selectedIds.length < archivedUsers.length;
    }
  }, [selectedIds, archivedUsers]);

  /* Selection Handlers */
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(archivedUsers.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  /* Bulk Actions */
  const handleBulkRestore = () => {
    setArchivedUsers((prev) =>
      prev.filter((user) => !selectedIds.includes(user.id))
    );
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    setArchivedUsers((prev) =>
      prev.filter((user) => !selectedIds.includes(user.id))
    );
    setSelectedIds([]);
    setShowDeleteModal(false);
  };

  const handleRestore = (id: number) => {
    setArchivedUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handlePermanentDelete = (id: number) => {
    setArchivedUsers((prev) => prev.filter((u) => u.id !== id));
  };

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
              Give and remove permissions from users
            </p>
          </div>

          {/* TABS */}
          <div className="control-panel-tabs">
            {["General", "Search", "Logs", "User Archives"].map((tab) => (
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

          {/* ================= GENERAL ================= */}
          {activeTab === "General" && (
            <div className="control-panel-grid">
              {roles.map((role, roleIndex) => (
                <div key={role.role} className="control-panel-card">
                  <div className="control-panel-card-header">
                    {role.role}
                  </div>

                  <div className="control-panel-card-body">
                    <p className="control-panel-permission-title">
                      Permissions:
                    </p>

                    <div className="control-panel-permission-list">
                      {role.permissions.map((perm, permIndex) => (
                        <label
                          key={perm.label}
                          className="control-panel-permission-item"
                        >
                          <input
                            type="checkbox"
                            checked={perm.checked}
                            onChange={() =>
                              handleCheckboxChange(roleIndex, permIndex)
                            }
                          />
                          {perm.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ================= SEARCH ================= */}
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.fullName}</td>
                        <td>{user.role}</td>
                        <td>{user.position}</td>
                        <td>
                          <button
                            className="control-panel-permission-btn"
                            onClick={() => handleOpenPermissions(user)}
                          >
                            Permissions
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ================= LOGS ================= */}
          {activeTab === "Logs" && (
            <div className="control-panel-logs-wrapper">
              <div className="control-panel-logs-header">Logs</div>
              <table className="control-panel-logs-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Role</th>
                    <th>Position</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.description}</td>
                      <td>{log.role}</td>
                      <td>{log.position}</td>
                      <td>{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ================= ARCHIVES ================= */}
          {activeTab === "User Archives" && (
            <div className="control-panel-archive-wrapper">
              <div className="control-panel-archive-header">
                User Archives
              </div>

              {selectedIds.length > 0 && (
                <div className="control-panel-bulk-bar">
                  <span>{selectedIds.length} selected</span>
                  <div className="control-panel-bulk-actions">
                    <button
                      className="control-panel-restore-btn"
                      onClick={handleBulkRestore}
                    >
                      Restore Selected
                    </button>
                    <button
                      className="control-panel-delete-btn"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      Delete Selected
                    </button>
                  </div>
                </div>
              )}

              <table className="control-panel-archive-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        ref={selectAllRef}
                        type="checkbox"
                        checked={
                          archivedUsers.length > 0 &&
                          selectedIds.length === archivedUsers.length
                        }
                        onChange={(e) =>
                          handleSelectAll(e.target.checked)
                        }
                      />
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date deleted</th>
                    <th>Role</th>
                    <th>Position</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {archivedUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(user.id)}
                          onChange={(e) =>
                            handleSelectOne(
                              user.id,
                              e.target.checked
                            )
                          }
                        />
                      </td>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.dateDeleted}</td>
                      <td>{user.role}</td>
                      <td>{user.position}</td>
                      <td className="control-panel-archive-actions">
                        <button
                          className="control-panel-restore-btn"
                          onClick={() => handleRestore(user.id)}
                        >
                          Restore
                        </button>
                        <button
                          className="control-panel-delete-btn"
                          onClick={() =>
                            handlePermanentDelete(user.id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* DELETE MODAL */}
          {showDeleteModal && (
            <div className="control-panel-modal-overlay">
              <div className="control-panel-modal">
                <h3>Confirm Permanent Delete</h3>
                <p>
                  Are you sure you want to permanently delete{" "}
                  {selectedIds.length} selected user(s)?
                </p>
                <div className="control-panel-modal-actions">
                  <button
                    className="control-panel-cancel-btn"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="control-panel-delete-btn"
                    onClick={handleBulkDelete}
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedUser && (
  <div className="control-panel-modal-overlay">
    <div className="control-panel-modal">
      <div className="control-panel-card-header">
        {selectedUser.fullName}
      </div>

      <div className="control-panel-card-body">
        <p className="control-panel-permission-title">
          Permissions:
        </p>

        <div className="control-panel-permission-list">
          {rolePermissionMap[selectedUser.role].map(
            (permission) => (
              <label
                key={permission}
                className="control-panel-permission-item"
              >
                <input
                  type="checkbox"
                  checked={tempPermissions.includes(permission)}
                  onChange={() =>
                    handleTogglePermission(permission)
                  }
                />
                {permission}
              </label>
            )
          )}
        </div>

        <div className="control-panel-modal-actions">
                  <button
                    className="control-panel-cancel-btn"
                    onClick={() => setSelectedUser(null)}
                  >
                    Cancel
                  </button>

                  <button
                    className="control-panel-apply-btn"
                    onClick={handleApplyPermissions}
                  >
                    Apply
                  </button>
                </div>
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