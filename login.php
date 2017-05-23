<?php

include './DAO/UserDAO.php';

$user = UserDAO::getUserById(1);

if (isset($_POST["postCheckLogin"])) {
    $name = $_POST["name"];
    $password = $_POST["password"];
    session_start();
    if (password_verify($password, $user->getPassword()) && $user->getName() == $name) {

        $_SESSION["user"] = serialize($user);
        header("Location:index.php");
    } else {

        header("Location:admin.php");
    }
}
?>