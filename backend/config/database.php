<?php
$host = '127.0.0.1'; // Your database host
$db = 'glepra'; // Your database name
$user = 'glepraAdmin'; // Your database username
$pass = 'Plesk3317_'; // Your database password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
