<?php
header('Access-Control-Allow-Methods: GET, POST');  
include("functions.php");

if(isset($_POST['naziv']) && isset($_POST['adresa']) && isset($_POST['broj_soba'])){
	
	$naziv = $_POST['naziv'];
	$adresa = $_POST['adresa'];
	$broj_soba = $_POST['broj_soba'];

	addHotel($naziv,$adresa,$broj_soba);
	
}

?>