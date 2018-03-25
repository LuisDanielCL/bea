-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-03-2018 a las 19:19:52
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bea`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `agregarBus` (IN `pPlaca` INT(6), IN `pNombre` VARCHAR(20), IN `pID_Empresa` INT(11))  BEGIN
	INSERT INTO bus (Placa,Nombre,ID_Empresa) VALUES (pPlaca,pNombre,pID_Empresa);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `agregarComponente` (IN `pCod` VARCHAR(40), IN `pEstado` VARCHAR(20), IN `pFechaRegistro` VARCHAR(40), IN `pLote` VARCHAR(20), IN `pTipoComponente` INT(3), IN `pIMEI` VARCHAR(40))  NO SQL
BEGIN
	INSERT INTO componentes (cod,estado,fechaRegistro,lote,tipo_componente,IMEI) VALUES (pCod,pEstado,pFechaRegistro,pLote,pTipoComponente,pIMEI);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `agregarEmpresa` (IN `pNombre` VARCHAR(50), IN `pTelefono` VARCHAR(15), IN `pCorreo` VARCHAR(45), IN `pDireccion` VARCHAR(200))  BEGIN
	INSERT INTO empresa (Nombre,Telefono,Correo,Direccion) VALUES (pNombre,pTelefono,pCorreo,pDireccion);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cargarBus` (IN `pPlaca` INT)  BEGIN
	SELECT * FROM bus WHERE Placa=pPlaca;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cargarBuses` ()  BEGIN
	SELECT * FROM bus;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cargarEmpresa` (IN `pID` INT)  BEGIN
	SELECT * FROM empresa WHERE ID = pID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cargarEmpresas` ()  BEGIN
	SELECT * FROM empresa;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cargarTiposComponente` ()  NO SQL
BEGIN
	SELECT * FROM tipo_componente;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarBus` (IN `pPlaca` INT(6), IN `pNombre` VARCHAR(20), IN `pID_Empresa` INT(11))  BEGIN
	UPDATE bus SET Nombre=pNombre,ID_Empresa=pID_Empresa WHERE Placa=pPlaca;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarEmpresa` (IN `pID` INT, IN `pNombre` VARCHAR(20), IN `pTelefono` VARCHAR(15), IN `pCorreo` VARCHAR(45), IN `pDireccion` VARCHAR(200))  BEGIN
	UPDATE empresa SET Nombre=pNombre,Telefono=pTelefono,Correo=pCorreo,Direccion=pDireccion WHERE ID=pID;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bus`
--

CREATE TABLE `bus` (
  `Placa` varchar(6) NOT NULL,
  `Nombre` varchar(20) DEFAULT NULL,
  `ID_Empresa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `bus`
--

INSERT INTO `bus` (`Placa`, `Nombre`, `ID_Empresa`) VALUES
('123', 'chenco', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `componentes`
--

CREATE TABLE `componentes` (
  `cod` varchar(40) NOT NULL,
  `tipo_componente` int(3) NOT NULL,
  `lote` varchar(20) NOT NULL,
  `fechaRegistro` varchar(40) NOT NULL,
  `Estado` varchar(20) NOT NULL,
  `IMEI` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `componentes`
--

INSERT INTO `componentes` (`cod`, `tipo_componente`, `lote`, `fechaRegistro`, `Estado`, `IMEI`) VALUES
('2344123ATTX234523', 8, 'X155', '14/02/2018', 'Bueno', ''),
('2345MODEMGPRS1234', 13, '234', '27/02/2018', 'Bueno', '543185345'),
('2434', 2, '1234', '11/03/2018', 'Bueno', ''),
('3567345634', 11, '45634', '06/03/2018', 'Bueno', ''),
('attx234', 8, '1234', '13/03/2018', 'Bueno', ''),
('attx2345', 8, '1234', '06/03/2018', 'Bueno', ''),
('attx23456543', 8, '1234', '07/03/2018', 'Bueno', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Correo` varchar(45) DEFAULT NULL,
  `Direccion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`ID`, `Nombre`, `Telefono`, `Correo`, `Direccion`) VALUES
(1, 'Empresa1', 'a', 'a', 'aa'),
(2, 'asd', '1561', 'da', 'asdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_componente`
--

CREATE TABLE `tipo_componente` (
  `id` int(3) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_componente`
--

INSERT INTO `tipo_componente` (`id`, `codigo`, `nombre`) VALUES
(0, 'AANTBEA', 'Antena'),
(1, 'APTX3', 'SERIE TX3'),
(2, 'ATCENCARG', 'Centro Carga'),
(3, 'ATCPURX', 'TAR'),
(4, 'ATCPUTX', '8KTX'),
(5, 'ATFILTRO', 'Filtro'),
(6, 'ATRADIOSMT', 'Radio'),
(7, 'ATRXD', 'DUPLEX'),
(8, 'ATTX', 'PRO'),
(9, 'BPRX1', 'SERIE RX1'),
(10, 'BPRX3', 'SERIE RX3'),
(11, 'BPTX1', 'Serie TX1'),
(12, 'BTMOD', 'Reset Modem'),
(13, 'MOD', 'MODEM'),
(14, 'TBEA', 'MAX'),
(15, 'TSERMAX', 'MAX2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bus`
--
ALTER TABLE `bus`
  ADD PRIMARY KEY (`Placa`),
  ADD KEY `ID_Empresa` (`ID_Empresa`);

--
-- Indices de la tabla `componentes`
--
ALTER TABLE `componentes`
  ADD PRIMARY KEY (`cod`),
  ADD KEY `tipo_componente` (`tipo_componente`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Nombre_UNIQUE` (`Nombre`);

--
-- Indices de la tabla `tipo_componente`
--
ALTER TABLE `tipo_componente`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bus`
--
ALTER TABLE `bus`
  ADD CONSTRAINT `bus_ibfk_1` FOREIGN KEY (`ID_Empresa`) REFERENCES `empresa` (`ID`);

--
-- Filtros para la tabla `componentes`
--
ALTER TABLE `componentes`
  ADD CONSTRAINT `componentes_ibfk_1` FOREIGN KEY (`tipo_componente`) REFERENCES `tipo_componente` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
