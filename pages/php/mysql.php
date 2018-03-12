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

	case 'agregarEmpresa':
		$nombre = $_POST['txtNombre'];
		$telefono = $_POST['txtTelefono'];
		$correo = $_POST['txtCorreo'];
		$direccion = $_POST['txtDireccion'];
		$mysqli->query("SET @nombre  = " . "'" . $mysqli->real_escape_string($nombre) . "'");
		$mysqli->query("SET @telefono  = " . "'" . $mysqli->real_escape_string($telefono) . "'");
		$mysqli->query("SET @correo  = " . "'" . $mysqli->real_escape_string($correo) . "'");
		$mysqli->query("SET @direccion  = " . "'" . $mysqli->real_escape_string($direccion) . "'");
		if(!$mysqli->query("CALL agregarEmpresa (@nombre,@telefono,@correo,@direccion)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Es posible que el tipo de violencia ya exista');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Empresa agregada";
	break;
	
	default:
		# code...
		break;
}
?>