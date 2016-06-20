<?php
header('Access-Control-Allow-Methods: GET, POST');  
include("functions.php");

if(isset($_POST['naziv']) && isset($_POST['broj_kvadrata']) && isset($_POST['broj_kreveta'])){
	
$naziv = $_POST['naziv'];
$broj_kvadrata = $_POST['broj_kvadrata'];
$broj_kreveta = $_POST['broj_kreveta'];

addRoom($naziv,$broj_kreveta,$broj_kvadrata);
}
?>