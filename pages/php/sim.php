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

	case 'agregarSim':
		$numero = $_POST['txtNumero'];
		$fecha = $_POST['txtFecha'];
		$estado = $_POST['txtEstado'];
		$pin = $_POST['txtPin'];
		$puk = $_POST['txtPuk'];
		$codigo = $_POST['txtCodigo'];
		$mysqli->query("SET @numero  = " . "'" . $mysqli->real_escape_string($numero) . "'");
		$mysqli->query("SET @fecha  = " . "'" . $mysqli->real_escape_string($fecha) . "'");
		$mysqli->query("SET @estado  = " . "'" . $mysqli->real_escape_string($estado) . "'");
		$mysqli->query("SET @pin  = " . "'" . $mysqli->real_escape_string($pin) . "'");
		$mysqli->query("SET @puk  = " . "'" . $mysqli->real_escape_string($puk) . "'");
		$mysqli->query("SET @codigo  = " . "'" . $mysqli->real_escape_string($codigo) . "'");

		if(!$mysqli->query("CALL agregarSim(@numero,@fecha,@estado,@pin,@puk,@codigo)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 El SIM ya existe');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Sim agregado";
	break;
	case 'editarSim':
		$numero = $_POST['txtNumero'];
		$fecha = $_POST['txtFecha'];
		$estado = $_POST['txtEstado'];
		$pin = $_POST['txtPin'];
		$puk = $_POST['txtPuk'];
		$codigo = $_POST['txtCodigo'];
		$mysqli->query("SET @numero  = " . "'" . $mysqli->real_escape_string($numero) . "'");
		$mysqli->query("SET @fecha  = " . "'" . $mysqli->real_escape_string($fecha) . "'");
		$mysqli->query("SET @estado  = " . "'" . $mysqli->real_escape_string($estado) . "'");
		$mysqli->query("SET @pin  = " . "'" . $mysqli->real_escape_string($pin) . "'");
		$mysqli->query("SET @puk  = " . "'" . $mysqli->real_escape_string($puk) . "'");
		$mysqli->query("SET @codigo  = " . "'" . $mysqli->real_escape_string($codigo) . "'");

		if(!$mysqli->query("CALL editarSim(@numero,@pin,@puk,@codigo,@fecha,@estado)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Fallo editar SIM');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Componente editado";
	break;
	case 'eliminarComponente':
		$codigo = $_POST['txtCodigo'];
		$mysqli->query("SET @codigo  = " . "'" . $mysqli->real_escape_string($codigo) . "'");

		if(!$mysqli->query("CALL eliminarComponente(@codigo)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Fallo eliminar componente');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Componente eliminado";
	break;

	default:
		# code...
		break;
}


?>