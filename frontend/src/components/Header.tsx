interface Props {
  title?: string;
  onAddEmployee?: () => void;
}

const Header = ({ title, onAddEmployee }: Props) => {
  return (
    <div className="header">
      <div>
        <h1>{title || 'EMPLOYEE SCHEDULE'}</h1>
        <span className="count">
          <span className="six-two">#...</span> Employees
        </span>
      </div>

      <div className="actions">
        <button
          className="add"
          onClick={onAddEmployee}
        >
          + Add Employee
        </button>

        <button className="export">Export</button>
      </div>
    </div>
  );
};

export default Header;
