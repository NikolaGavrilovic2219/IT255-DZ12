<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');
if($_SERVER['REQUEST_METHOD'] == "OPTIONS"){
	exit();	
}
$sname = "localhost";
$uname = "root";
$pass = "";
$db = "it255";

$conn = new mysqli($sname, $uname, $pass, $db);
if (!$conn->set_charset("utf8")) {
    printf("Error: %s\n", $mysqli->error);
    exit();
} 
?>