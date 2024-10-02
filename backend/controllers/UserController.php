<?php
require_once '../config/database.php';
require_once '../models/User_verwerk.php';

session_start();

$userModel = new User_verwerk($pdo);

// Handle user registration
if (isset($_POST['register'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $userModel->register($username, $password);
    header("Location: ../views/login_view.php"); // Redirect to login page
    exit();
}

// Handle user login
if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $user = $userModel->login($username, $password);
    
    if ($user) {
        $_SESSION['user_id'] = $user['id'];
        header("Location: ../views/recipes_view.php"); // Redirect to recipes page
        exit();
    } else {
        $_SESSION['error'] = "Invalid username or password."; // Set error message
    }
}


// Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: ../views/index_view.php"); // Redirect to homepage
    exit();
}
?>
