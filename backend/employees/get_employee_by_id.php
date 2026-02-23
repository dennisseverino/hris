<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include("../config/db.php");

if (!isset($_GET['id'])) {
    echo json_encode(["success" => false, "message" => "No ID"]);
    exit();
}

$id = intval($_GET['id']);

$stmt = $conn->prepare("SELECT * FROM employees WHERE employee_id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($employee = $result->fetch_assoc()) {
    echo json_encode(["success" => true, "employee" => $employee]);
} else {
    echo json_encode(["success" => false]);
}
