<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
session_start();
require_once __DIR__ . "/../config/database.php";

$sql = "
  SELECT 
    e.first_name,
    e.last_name,
    a.attendance_date,
    t.time_in,
    t.time_out
  FROM attendance a
  JOIN employees e ON a.employee_id = e.employee_id
  LEFT JOIN time_logs t ON a.attendance_id = t.attendance_id
  WHERE a.attendance_date = CURDATE()
";

$res = $conn->query($sql);
$data = [];

while ($row = $res->fetch_assoc()) {
  $data[] = $row;
}

echo json_encode($data);
exit;
