<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
session_start();
require_once __DIR__ . "/../config/database.php";

$sql = "
  SELECT title, content, date_posted
  FROM announcements
  ORDER BY date_posted DESC
  LIMIT 5
";

$res = $conn->query($sql);
$rows = [];

while ($row = $res->fetch_assoc()) {
  $rows[] = $row;
}

echo json_encode($rows);
exit;
