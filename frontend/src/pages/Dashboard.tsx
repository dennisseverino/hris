import { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  // Stubs for layout rendering
  const now = new Date();
  const schedule = {
    start_time: "08:00 AM",
    end_time: "05:00 PM",
    shift_type: "Regular",
    work_setup: "On-site"
  };

  // UI State stubs
  const attendance = null;
  const isTimedIn = false;
  const isCompleted = false;
  const workedSeconds = 0;

  // Placeholder formatting functions
  const formatTime = (date) => "00:00:00 AM";
  const formatDate = (date) => "Month 00, 0000";
  const formatDuration = (seconds) => "00:00:00";

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main">
        <div className="header">
          <h1>DASHBOARD</h1>
          <span>
            {formatTime(now)} &nbsp; {formatDate(now)}
          </span>
        </div>

        <div className="grid">
          {/* TIME IN / OUT */}
          <div className="card time-in">
            <div
              className="time-circle"
              role="button"
              style={{
                opacity: isCompleted ? 0.5 : 1,
                cursor: isCompleted ? 'not-allowed' : 'pointer',
              }}
            >
              {!attendance && 'Time In'}

              {isTimedIn && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>Working Time</div>
                  <div style={{ fontSize: '22px', fontWeight: 600 }}>
                    {formatDuration(workedSeconds)}
                  </div>
                  <div style={{ marginTop: '6px' }}>Time Out</div>
                </div>
              )}

              {isCompleted && 'Completed'}
            </div>
          </div>

          {/* ANNOUNCEMENTS */}
          <div className="card announcement">
            <div className="card-header">
              <h3>Announcement</h3>
            </div>

            {announcements.length === 0 && (
              <p className="muted">No announcements</p>
            )}

            {announcements.map((a, i) => (
              <p key={i} className="muted">
                <strong>{a.title}</strong><br />
                {a.content}
              </p>
            ))}
          </div>

          {/* BREAK */}
          <div className="card break">
            <div className="row">
              <h3>Break</h3>
            </div>
            <button
              className="dark-btn"
              disabled={!isTimedIn}
            >
              Start
            </button>
          </div>

          {/* ===== Holiday ===== */}
          <div className="card holiday">
            <div className="card-header">
              <h3>Holidays / Birthday</h3>
            </div>

            {holidays.length === 0 && (
              <p className="muted">No upcoming holidays</p>
            )}

            {holidays.map((h, i) => (
              <p key={i} className="muted">
                <strong>{h.holiday_name}</strong><br />
                {new Date(h.holiday_date).toLocaleDateString()}
              </p>
            ))}
          </div>

          {/* ===== Calendar ===== */}
          <div className="card calendar">
            <h3>Calendar</h3>
            <p className="muted">
              {now.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* SHIFT */}
          <div className="card shift">
            {schedule ? (
              <>
                <h3>Today's Shift</h3>
                <div>
                  <p>Shift Start Time</p>
                  <strong>{schedule.start_time}</strong>
                </div>
                <div>
                  <p>Shift End Time</p>
                  <strong>{schedule.end_time}</strong>
                </div>
                
                <div className="shift-footer">
                  {schedule.shift_type} • {schedule.work_setup}
                </div>
              </>
            ) : (
              <p className="muted">No schedule today</p>
            )}
          </div>

          {/* ===== Employee Table ===== */}
          <div className="card table">
            <div className="table-header">
              <span>Employee Name</span>
              <span>Date</span>
              <span>Time In</span>
              <span>Time Out</span>
              <span>Status</span>
            </div>

            {attendanceList.length === 0 && (
              <div className="table-row">
                <span>No records</span>
                <span>-</span>
                <span>-</span>
                <span>-</span>
                <span>-</span>
              </div>
            )}

            {attendanceList.map((row, i) => (
              <div className="table-row" key={i}>
                <span>
                  {row.first_name} {row.last_name}
                </span>

                <span>
                  {new Date(row.attendance_date).toLocaleDateString()}
                </span>

                <span>
                  {row.time_in
                    ? new Date(row.time_in).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '--'}
                </span>

                <span>
                  {row.time_out
                    ? new Date(row.time_out).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '--'}
                </span>

                <span>
                  {row.time_out ? 'Completed' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;