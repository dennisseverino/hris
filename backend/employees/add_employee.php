<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
require_once "../config/database.php";

ini_set('display_errors', 1);
error_reporting(E_ALL);

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid JSON"]);
    exit();
}

$conn->begin_transaction();

try {

    // ================= PASSWORD GENERATION =================
    $firstLetter = strtolower(substr($data['first_name'], 0, 1));
    $lastName    = strtolower($data['last_name']);
    $plainPassword = $firstLetter . $lastName . "@123!";
    $hashedPassword = password_hash($plainPassword, PASSWORD_BCRYPT);

    // ================= CREATE USER =================
    $role_id = 4; // Employee role

    $stmtUser = $conn->prepare("
        INSERT INTO users (username, password_hash, role_id)
        VALUES (?, ?, ?)
    ");

    $stmtUser->bind_param(
        "ssi",
        $data['email'],
        $hashedPassword,
        $role_id
    );

    $stmtUser->execute();
    $user_id = $stmtUser->insert_id;

    // ================= CREATE EMPLOYEE =================
    $stmtEmp = $conn->prepare("
        INSERT INTO employees (
            user_id,
            first_name,
            middle_name,
            last_name,
            address,
            birthdate,
            civil_status,
            email,
            personal_email,
            position,
            account,
            cluster,
            contact_number,
            employment_status,
            employee_type,
            date_hired
        )
        VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active', ?, CURDATE()
        )
    ");

    $stmtEmp->bind_param(
        "isssssssssssss",
        $user_id,
        $data['first_name'],
        $data['middle_name'],
        $data['last_name'],
        $data['address'],
        $data['birthdate'],
        $data['civil_status'],
        $data['email'],
        $data['personal_email'],
        $data['position'],
        $data['account'],
        $data['cluster'],
        $data['contact_number'],
        $data['employee_type']
    );

    $stmtEmp->execute();

    $conn->commit();

    echo json_encode([
        "success" => true,
        "generated_account" => [
            "username" => $data['email'],
            "password" => $plainPassword
        ]
    ]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}