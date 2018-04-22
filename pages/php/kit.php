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

	case 'revisarComponente':
		$componente = $_POST['componente'];
		$mysqli->query("SET @componente  = " . "'" . $mysqli->real_escape_string($componente) . "'");
		$salida = "";
		$resultado = $mysqli->query("CALL revisarExistenciaComponente(@componente)");
		$data=$resultado->fetch_array();
		$total = $data['total'];
		$mysqli->close();
		if($total != 0) // si entra quiere decir que el componente existe pasa a comprobar si se esta usando
		{
			$mysqli2 = new mysqli($servername, $username, $password,$DBName);
			$mysqli2->query("SET @componente  = " . "'" . $mysqli2->real_escape_string($componente) . "'");
			$resultado2 = $mysqli2->query("CALL revisarUsoComponente(@componente)");
			$data2=$resultado2->fetch_array();
			$total2 = $data2['total'];
			$mysqli2->close();
			if($total2 != 0) // si entra quiere decir que el componente esta en uso
			{
				$salida = 'uso';
			}else{
				$salida = 'existe';
			}
		}else{
			$salida = 'nuevo';

		}

		echo $salida;
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
		echo "Sim editado";
	break;
	case 'eliminarSim':
		$numero = $_POST['txtNumero'];
		$mysqli->query("SET @numero  = " . "'" . $mysqli->real_escape_string($numero) . "'");

		if(!$mysqli->query("CALL eliminarSim(@numero)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Fallo eliminar sim');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Sim eliminado";
	break;

	default:
		# code...
		break;
}


?>