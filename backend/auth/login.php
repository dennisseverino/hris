<?php
// ================= CORS =================
require_once "../cors.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ================= SESSION =================
session_start();

// ================= DB =================
require_once "../config/database.php";

// ================= INPUT =================
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data['username']) || empty($data['password'])) {
    echo json_encode([
        "success" => false,
        "message" => "Username and password are required"
    ]);
    exit();
}

$username = $data['username'];
$password = $data['password'];

// ================= QUERY USER =================
$stmt = $conn->prepare("
    SELECT 
        u.user_id,
        u.username,
        u.password_hash,
        u.role_id,
        r.role_name
    FROM users u
    INNER JOIN roles r ON u.role_id = r.role_id
    WHERE u.username = ?
    LIMIT 1
");

$stmt->bind_param("s", $username);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid username or password"
    ]);
    exit();
}

$user = $result->fetch_assoc();

// ================= VERIFY PASSWORD =================
if (!password_verify($password, $user['password_hash'])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid username or password"
    ]);
    exit();
}

// ================= GET EMPLOYEE =================
$empStmt = $conn->prepare("
    SELECT employee_id
    FROM employees
    WHERE user_id = ?
    LIMIT 1
");

$empStmt->bind_param("i", $user['user_id']);
$empStmt->execute();
$empResult = $empStmt->get_result();

if ($empResult->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Employee record not found"
    ]);
    exit();
}

$employee = $empResult->fetch_assoc();

// ================= LOGIN SUCCESS =================
$_SESSION['user_id']     = $user['user_id'];
$_SESSION['employee_id'] = $employee['employee_id']; // 🔥 THIS FIXES EVERYTHING
$_SESSION['username']    = $user['username'];
$_SESSION['role_id']     = $user['role_id'];
$_SESSION['role_name']   = $user['role_name'];


echo json_encode([
    "success" => true,
    "user" => [
        "user_id" => $user['user_id'],
        "username" => $user['username'],
        "role" => $user['role_name']
    ]
]);

// ================= FETCH ROLE PERMISSIONS =================
$permStmt = $conn->prepare("
    SELECT p.permission_name
    FROM role_permissions rp
    INNER JOIN permissions p 
        ON rp.permission_id = p.permission_id
    WHERE rp.role_id = ?
");

$permStmt->bind_param("i", $user['role_id']);
$permStmt->execute();

$permResult = $permStmt->get_result();

$permissions = [];

while ($row = $permResult->fetch_assoc()) {
    $permissions[] = $row['permission_name'];
}

$_SESSION['permissions'] = $permissions;