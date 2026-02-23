import StatusBadge from './StatusBadge';
import type { Employee } from '../types/employee';

type Props = {
  employees: Employee[];
  onEdit?: (employee: Employee) => void;
  onDelete?: (id: number) => void;
  onViewSchedule?: (employee: Employee) => void;
};

const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
  onViewSchedule,
}: Props) => {

  return (
    <div className="employee-table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>FULL NAME</th>
            <th>WORK EMAIL</th>
            <th>PERSONAL EMAIL</th>
            <th>POSITION</th>
            <th>ACCOUNT</th>
            <th>CLUSTER</th>
            <th>TYPE</th>
            <th>STATUS</th>
            <th>HIRED</th>
            <th>SCHEDULE</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.employee_id}>
              <td>{emp.employee_id}</td>

              <td>
                {emp.first_name} {emp.middle_name ?? ''} {emp.last_name}
              </td>

              <td>{emp.email}</td>
              <td>{emp.personal_email ?? '-'}</td>
              <td>{emp.position}</td>
              <td>{emp.account}</td>
              <td>{emp.cluster}</td>
              <td>{emp.employee_type}</td>

              <td>
                <StatusBadge status={emp.employment_status} />
              </td>

              <td>
                {emp.date_hired
                  ? new Date(emp.date_hired).toLocaleDateString()
                  : '-'}
              </td>

              <td>
                <button
                  className="employee-btn-view"
                  onClick={() => onViewSchedule?.(emp)}
                >
                  View
                </button>
              </td>

              <td className="employee-action-cell">
                <button
                  className="employee-btn-edit"
                  onClick={() => onEdit?.(emp)}
                >
                  Edit
                </button>

                <button
                  className="employee-btn-delete"
                  onClick={() => onDelete?.(emp.employee_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
  