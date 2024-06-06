<?php
require 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome_completo = $_POST['nome_completo'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $data_nascimento = $_POST['data_nascimento'];
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios (nome_completo, email, telefone, data_nascimento, username, password)
            VALUES (:nome_completo, :email, :telefone, :data_nascimento, :username, :password)";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nome_completo', $nome_completo);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':telefone', $telefone);
    $stmt->bindParam(':data_nascimento', $data_nascimento);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);

    if ($stmt->execute()) {
        header("Location: jogos.html");
        exit();
    } else {
        echo "Erro ao cadastrar usuário!";
    }
}
?>