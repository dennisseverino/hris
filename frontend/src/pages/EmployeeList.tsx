import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeCards from '../components/EmployeeCard';
import EditEmployee from '../components/EditEmployee';
import ViewScheduleModal from '../components/ViewScheduleModal';
import AddEmployee from './AddEmployee';

import type { Employee } from '../types/employee';

import '../styles/employeeList.css';

const EmployeeList = () => {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'table' | 'card'>('table');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // Toast
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);
  const [viewEmployee, setViewEmployee] =
    useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ================= FETCH EMPLOYEES =================
  const fetchEmployees = async () => {
    try {
      const res = await fetch(
        'http://localhost/employee-system/backend/employees/get_employees.php',
        { credentials: 'include' }
      );

      const data = await res.json();

      if (data.success) {
        setEmployees(data.employees);
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load employees', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditOpen(true);
  };

  // ================= VIEW SCHEDULE =================
  const handleViewSchedule = (employee: Employee) => {
    setViewEmployee(employee);
    setIsViewOpen(true);
  };

  // ================= SAVE EDIT =================
  const handleSave = async (updatedEmployee: Employee) => {
    try {
      const res = await fetch(
        'http://localhost/employee-system/backend/employees/update_employee_schedule.php',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            employee_id: updatedEmployee.employee_id,
            schedules: updatedEmployee.schedules,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setEmployees(prev =>
          prev.map(emp =>
            emp.employee_id === updatedEmployee.employee_id
              ? updatedEmployee
              : emp
          )
        );

        setToast({
          message: 'Schedule updated successfully',
          type: 'success',
        });

        setIsEditOpen(false);
      } else {
        setToast({ message: 'Failed to update schedule', type: 'error' });
      }
    } catch {
      setToast({ message: 'Server error', type: 'error' });
    }

    setTimeout(() => setToast(null), 3000);
  };

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    if (!confirm(`Are you sure to delete this account (ID: ${id})?`))
      return;

    try {
      const res = await fetch(
        'http://localhost/employee-system/backend/employees/delete_employee.php',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ employee_id: id }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setEmployees(prev =>
          prev.filter(emp => emp.employee_id !== id)
        );

        setToast({ message: 'Employee deleted', type: 'success' });
      } else {
        setToast({ message: 'Delete failed', type: 'error' });
      }
    } catch {
      setToast({ message: 'Server error', type: 'error' });
    }

    setTimeout(() => setToast(null), 3000);
  };

  // ================= SEARCH FILTER =================
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const fullName =
        `${emp.first_name ?? ''} ${emp.middle_name ?? ''} ${
          emp.last_name ?? ''
        }`.toLowerCase();

      const email = emp.email?.toLowerCase() ?? '';
      const position = emp.position?.toLowerCase() ?? '';
      const searchTerm = search.toLowerCase();

      return (
        fullName.includes(searchTerm) ||
        email.includes(searchTerm) ||
        position.includes(searchTerm)
      );
    });
  }, [employees, search]);

  return (
    <div className="employee-list-layout">
      <Sidebar />

      <main className="employee-list-content">
        <Header
          title="EMPLOYEE LIST"
          onAddEmployee={() => setIsAddOpen(true)}
        />

        <div className="employee-list-toolbar">
          <SearchBar search={search} setSearch={setSearch} />
          

          <div className="employee-view-toggle">
            <button
              className={view === 'table' ? 'active' : ''}
              onClick={() => setView('table')}
            >
              ☰
            </button>
            <button
              className={view === 'card' ? 'active' : ''}
              onClick={() => setView('card')}
            >
              ⬛
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading employees...</p>
        ) : view === 'table' ? (
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewSchedule={handleViewSchedule}
          />
        ) : (
          <EmployeeCards employees={filteredEmployees} />
        )}

        {/* Toast */}
        {toast && (
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        )}
      </main>

      {/* ADD MODAL */}
      {isAddOpen && (
        <AddEmployee
          onClose={() => {
            setIsAddOpen(false);
            fetchEmployees();
          }}
        />
      )}

      {/* EDIT MODAL */}
      {isEditOpen && selectedEmployee && (
        <EditEmployee
          employee={selectedEmployee}
          onClose={() => setIsEditOpen(false)}
          onSave={(updated) => {
            setEmployees(prev =>
              prev.map(emp =>
                emp.employee_id === updated.employee_id
                  ? updated
                  : emp
              )
            );
          }}
        />
      )}



      {/* VIEW MODAL */}
      {isViewOpen && viewEmployee && (
        <ViewScheduleModal
          employee={viewEmployee}
          onClose={() => setIsViewOpen(false)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
