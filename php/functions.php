<?php
include("conn.php");

function checkIfLoggedIn(){
	global $conn;
	if(isset($_SERVER['HTTP_TOKEN'])){
		$token = $_SERVER['HTTP_TOKEN'];
		$result = $conn->prepare("SELECT * FROM korisnici WHERE token=?");
		$result->bind_param("s",$token);
		$result->execute();
		$result->store_result();
		$num_rows = $result->num_rows;
		if($num_rows > 0)
		{
			return true;
		}
		else{	
			return false;
		}
	}
	else{
		return false;
	}
}

function login($username, $password){
	global $conn;
	$rarray = array();
	if(checkLogin($username,$password)){
		$id = sha1(uniqid());
		$result2 = $conn->prepare("UPDATE korisnici SET token=? WHERE korisnicko_ime=?");
		$result2->bind_param("ss",$id,$username);
		$result2->execute();
		$rarray['token'] = $id;
	} else{
		header('HTTP/1.1 401 Unauthorized');
		$rarray['error'] = "Greska!";
	}
	return json_encode($rarray);
}

function checkLogin($username, $password){
	global $conn;
	$password = md5($password);
	$result = $conn->prepare("SELECT * FROM korisnici WHERE korisnicko_ime=? AND sifra=?");
	$result->bind_param("ss",$username,$password);
	$result->execute();
	$result->store_result();
	$num_rows = $result->num_rows;
	if($num_rows > 0)
	{
		return true;
	}
	else{	
		return false;
	}
}

function signup($firstname, $lastname, $username, $password){
	global $conn;
	$ar = array();
	$errors = "";
	if(checkIfUserExists($username)){
		$errors .= "Korisnicko ime zauzeto!";
	}
	if($errors == ""){
		$stmt = $conn->prepare("INSERT INTO korisnici (ime, prezime, korisnicko_ime, sifra) VALUES (?, ?, ?, ?)");
		$pass =md5($password);
		$stmt->bind_param("ssss", $firstname, $lastname, $username, $pass);
		if($stmt->execute()){
			$id = sha1(uniqid());
			$result2 = $conn->prepare("UPDATE korisnici SET token=? WHERE korisnicko_ime=?");
			$result2->bind_param("ss",$id,$username);
			$result2->execute();
			$ar['token'] = $id;
		}else{
			header('HTTP/1.1 400 Bad request');
			$ar['error'] = "Greska!";
		}
	} else{
		header('HTTP/1.1 400 Bad request');
		$ar['error'] = json_encode($errors);
	}
	
	return json_encode($ar);
}

function checkIfUserExists($username){
	global $conn;
	$result = $conn->prepare("SELECT * FROM korisnici WHERE korisnicko_ime=?");
	$result->bind_param("s",$username);
	$result->execute();
	$result->store_result();
	$num_rows = $result->num_rows;
	if($num_rows > 0)
	{
		return true;
	}
	else{	
		return false;
	}
}


function addRoom($name, $beds , $size){
	global $conn;
	$ar = array();
	$stmt = $conn->prepare("INSERT INTO sobe (naziv, broj_kreveta, broj_kvadrata) VALUES (?, ?, ?)");
	$stmt->bind_param("sss", $name, $beds , $size);
	if($stmt->execute()){
		$ar['sucess'] = "ok";
	}else{
		$ar['error'] = "Greska!";
	}
	return json_encode($ar);
}

function getRooms(){
	global $conn;
	$ar = array();
	if(checkIfLoggedIn()){
		$result = $conn->query("SELECT * FROM sobe");
		$num_rows = $result->num_rows;
		$sobe = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT * FROM sobe");
			while($row = $result2->fetch_assoc()) {
				$soba = array();
				$soba['id'] = $row['id'];
				$soba['naziv'] = $row['naziv'];
				$soba['broj_kreveta'] = $row['broj_kreveta'];
				$soba['broj_kvadrata'] = $row['broj_kvadrata'];
				array_push($sobe,$soba);
			}
		}
		$ar['sobe'] = $sobe;
		return json_encode($ar);
	} else{
		$ar['error'] = "Greska!";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($ar);
	}
}


function addHotel($naziv, $adresa, $broj_soba){
	global $conn;
	$ar = array();
	$stmt = $conn->prepare("INSERT INTO hoteli (naziv, adresa, broj_soba) VALUES (?, ?, ?)");
	$stmt->bind_param("sss", $naziv, $adresa, $broj_soba);
	if($stmt->execute()){
		$ar['success'] = "OK";
	}else{
		$ar['error'] = "Error";
	}
	return json_encode($ar);
}

?>