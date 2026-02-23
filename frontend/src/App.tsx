import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Schedule from './pages/Schedule';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import Attendance from './pages/Attendance';
import ProtectedRoute from './routes/ProtectedRoute';
import EmployeeList from './pages/EmployeeList';
import ControlPanel from './pages/ControlPanel';



function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/team"
        element={
          <ProtectedRoute>
            <Team />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/schedule"
        element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        }
      />

      
      <Route
        path="/ControlPanel"
        element={
          <ProtectedRoute>
            <ControlPanel />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Employee-list"
        element={
          <ProtectedRoute>
            <EmployeeList />
          </ProtectedRoute>
        }
      />
      
    </Routes>

  );
}

export default App;
