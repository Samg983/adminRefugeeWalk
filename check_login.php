<?php
session_start();
$user = unserialize($_SESSION["user"]);
if ($user == NULL) {
    header("Location:admin.php");
}
?>