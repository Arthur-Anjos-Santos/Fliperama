<?php
$servername = "localhost";
$username = "id21993371_arthur";
$password = "161897Teste#";
$dbname = "id21993371_fliperama";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
