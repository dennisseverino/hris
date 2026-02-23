<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (!isset($_SESSION['user_id'], $_SESSION['employee_id'])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Not authenticated"
    ]);
    exit();
}

require_once "../config/database.php";

// 🔥 Get first name from employees table
$stmt = $conn->prepare("
    SELECT first_name
    FROM employees
    WHERE employee_id = ?
    LIMIT 1
");

$stmt->bind_param("i", $_SESSION['employee_id']);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "Employee not found"
    ]);
    exit();
}

$employee = $result->fetch_assoc();

echo json_encode([
    "success" => true,
    "user" => [
        "first_name" => $employee['first_name'],
        "role_name"  => $_SESSION['role_name']
    ]
]);
