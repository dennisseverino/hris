<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
session_start();
require_once __DIR__ . "/../config/database.php";

$today = date('Y-m-d');

$sql = "
  SELECT holiday_name, holiday_date
  FROM holidays
  WHERE holiday_date >= CURDATE()
  ORDER BY holiday_date ASC
  LIMIT 5
";

$res = $conn->query($sql);
$data = [];

while ($row = $res->fetch_assoc()) {
  $data[] = $row;
}

echo json_encode($data);
exit;
