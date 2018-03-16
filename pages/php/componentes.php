<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$DBName = "bea";

//conecta
$mysqli = new mysqli($servername, $username, $password,$DBName);
$mysqli->set_charset("utf8");
if(!$mysqli) {
    header('HTTP/1.1 400 Bad Request');
    die();
}

$opcion = $_POST['opcion'];

switch ($opcion) {

	case  'cargarTipoComponente':
		$resultado = $mysqli->query("CALL cargarTiposComponente()");
		$json = array();
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
	    echo json_encode($json);
	break;


	default:
		# code...
		break;
}


?>