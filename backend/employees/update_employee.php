<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include("../config/database.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['employee_id'])) {
    echo json_encode(["success" => false, "message" => "Invalid data"]);
    exit();
}

$stmt = $conn->prepare("
UPDATE employees SET
first_name=?,
middle_name=?,
last_name=?,
email=?,
personal_email=?,
position=?,
account=?,
cluster=?,
employment_status=?,
employee_type=?,
date_hired=?
WHERE employee_id=?
");

$stmt->bind_param(
    "sssssssssssi",
    $data['first_name'],
    $data['middle_name'],
    $data['last_name'],
    $data['email'],
    $data['personal_email'],
    $data['position'],
    $data['account'],
    $data['cluster'],
    $data['employment_status'],
    $data['employee_type'],
    $data['date_hired'],
    $data['employee_id']
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode([
        "success" => false,
        "error" => $stmt->error
    ]);
}
