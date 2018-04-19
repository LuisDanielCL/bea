-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-04-2018 a las 08:25:45
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `agregarBus` (IN `pPlaca` VARCHAR(10), IN `pNombre` VARCHAR(20), IN `pID_Empresa` INT(11))  BEGIN
	INSERT INTO bus (Placa,Nombre,ID_Empresa) VALUES (pPlaca,pNombre,pID_Empresa);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `agregarComponente` (IN `pCod` VARCHAR(40), IN `pEstado` VARCHAR(20), IN `pFechaRegistro` VARCHAR(40), IN `pLote` VARCHAR(20), IN `pTipoComponente` INT(3), IN `pIMEI` VARCHAR(40))  NO SQL
BEGIN
	INSERT INTO componentes (cod,estado,fechaRegistro,lote,tipo_componente,IMEI) VALUES (pCod,pEstado,pFechaRegistro,pLote,pTipoComponente,pIMEI);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `agregarEmpresa` (IN `pNombre` VARCHAR(50), IN `pTelefono` VARCHAR(15), IN `pCorreo` VARCHAR(45), IN `pDireccion` VARCHAR(200))  BEGIN
	INSERT INTO empresa (Nombre,Telefono,Correo,Direccion) VALUES (pNombre,pTelefono,pCorreo,pDireccion);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `agregarSim` (IN `pNumeroTelefono` INT(10), IN `pFecha` VARCHAR(40), IN `pEstado` VARCHAR(20), IN `pPin` INT(6), IN `pPuk` INT(20), IN `pCodigo` VARCHAR(30))  NO SQL
BEGIN
	INSERT INTO sim (numeroTelefono,pin,puk,codigo,fechaRegistro,Estado) 
    VALUES (pNumeroTelefono,pPin,pPuk,pCodigo,pFecha,pEstado);
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarBus` (IN `pPlaca` VARCHAR(10), IN `pNombre` VARCHAR(20), IN `pID_Empresa` INT(11))  BEGIN
	UPDATE bus SET Nombre=pNombre,ID_Empresa=pID_Empresa WHERE Placa=pPlaca;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarComponente` (IN `pCod` VARCHAR(40), IN `pEstado` VARCHAR(20), IN `pFechaRegistro` VARCHAR(40), IN `pLote` VARCHAR(20), IN `pTipoComponente` INT(3), IN `pIMEI` VARCHAR(40))  NO SQL
BEGIN
	UPDATE componentes SET Estado=pEstado,fechaRegistro=pFechaRegistro, IMEI=pIMEI,lote=pLote,tipo_componente = pTipoComponente WHERE cod=pCod;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarEmpresa` (IN `pID` INT, IN `pNombre` VARCHAR(20), IN `pTelefono` VARCHAR(15), IN `pCorreo` VARCHAR(45), IN `pDireccion` VARCHAR(200))  BEGIN
	UPDATE empresa SET Nombre=pNombre,Telefono=pTelefono,Correo=pCorreo,Direccion=pDireccion WHERE ID=pID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarSim` (IN `pNumeroTelefono` INT(10), IN `pPin` INT(6), IN `pPuk` INT(20), IN `pCodigo` VARCHAR(30), IN `pFechaRegistro` VARCHAR(40), IN `pEstado` VARCHAR(20))  NO SQL
BEGIN
	UPDATE sim SET
numeroTelefono = pNumeroTelefono, pin = pPin, puk = pPuk, codigo = pCodigo, fechaRegistro = pFechaRegistro, Estado = pEstado
	WHERE numeroTelefono = pNumeroTelefono;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarComponente` (IN `pCod` VARCHAR(40))  NO SQL
DELETE FROM componentes WHERE cod = pCod$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarSim` (IN `pNumeroTelefono` INT(10))  NO SQL
DELETE FROM sim WHERE numeroTelefono = pNumeroTelefono$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `filtrarBuses` (IN `pID_Empresa` INT(11))  NO SQL
BEGIN
	SELECT * FROM bus WHERE ID_Empresa=pID_Empresa;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barrarx`
--

CREATE TABLE `barrarx` (
  `serie` varchar(40) NOT NULL,
  `DUPLEX1` varchar(40) DEFAULT NULL,
  `DUPLEX2` varchar(40) DEFAULT NULL,
  `CentroCarga` varchar(40) DEFAULT NULL,
  `TAR` varchar(40) DEFAULT NULL,
  `Filtro` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barratx`
--

CREATE TABLE `barratx` (
  `serie` varchar(40) NOT NULL,
  `PRO1` varchar(40) DEFAULT NULL,
  `PRO2` varchar(40) DEFAULT NULL,
  `Antena` varchar(40) DEFAULT NULL,
  `Radio` varchar(40) DEFAULT NULL,
  `MODEM` varchar(40) DEFAULT NULL,
  `MAX1` varchar(40) DEFAULT NULL,
  `MAX2` varchar(40) DEFAULT NULL,
  `8K` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barratx3`
--

CREATE TABLE `barratx3` (
  `serie` varchar(40) NOT NULL,
  `PRO1` varchar(40) NOT NULL,
  `PRO2` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bus`
--

CREATE TABLE `bus` (
  `Placa` varchar(10) NOT NULL,
  `Nombre` varchar(20) DEFAULT NULL,
  `ID_Empresa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `bus`
--

INSERT INTO `bus` (`Placa`, `Nombre`, `ID_Empresa`) VALUES
('0', 'unidad 15', 1),
('123', 'chenco', 1),
('1245', 'unidad 1', 1),
('23', 'unidad 5', 1),
('aa', '12', 1);

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
  `IMEI` varchar(40) NOT NULL,
  `claveCorta` int(8) DEFAULT NULL,
  `claveLarga` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 'Autovisa', '456815435', 'correo@autovisa.com', 'Heredia'),
(2, 'asd', '1561', 'da', 'asdf'),
(3, 'Biusa', '85218961', 'Biusa', 'Direccion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kit`
--

CREATE TABLE `kit` (
  `codigoKit` varchar(20) NOT NULL,
  `TX1` varchar(40) NOT NULL,
  `RX1` varchar(40) NOT NULL,
  `RX3` varchar(40) NOT NULL,
  `TX3` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sim`
--

CREATE TABLE `sim` (
  `numeroTelefono` int(10) NOT NULL,
  `pin` int(6) NOT NULL,
  `puk` int(20) NOT NULL,
  `codigo` varchar(30) NOT NULL,
  `fechaRegistro` varchar(40) NOT NULL,
  `Estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sim`
--

INSERT INTO `sim` (`numeroTelefono`, `pin`, `puk`, `codigo`, `fechaRegistro`, `Estado`) VALUES
(85159456, 4354, 2147483647, 'C15684598', '04/04/2018', 'Bueno'),
(86391114, 6518, 2147483647, 'A132412341234', '17/04/2018', 'Bueno');

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
(2, 'ATCENCARG', 'Centro Carga'),
(3, 'ATCPURX', 'TAR'),
(4, 'ATCPUTX', '8KTX'),
(5, 'ATFILTRO', 'Filtro'),
(6, 'ATRADIOSMT', 'Radio'),
(7, 'ATRXD', 'DUPLEX'),
(8, 'ATTX', 'PRO'),
(13, 'MOD', 'MODEM'),
(14, 'TBEA', 'MAX');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `barrarx`
--
ALTER TABLE `barrarx`
  ADD PRIMARY KEY (`serie`),
  ADD KEY `DUPLEX1` (`DUPLEX1`,`DUPLEX2`,`CentroCarga`,`TAR`,`Filtro`);

--
-- Indices de la tabla `barratx`
--
ALTER TABLE `barratx`
  ADD PRIMARY KEY (`serie`),
  ADD KEY `PRO1` (`PRO1`,`PRO2`,`Antena`,`Radio`,`MODEM`,`MAX1`,`MAX2`,`8K`);

--
-- Indices de la tabla `barratx3`
--
ALTER TABLE `barratx3`
  ADD PRIMARY KEY (`serie`),
  ADD KEY `PRO1` (`PRO1`,`PRO2`);

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
-- Indices de la tabla `kit`
--
ALTER TABLE `kit`
  ADD PRIMARY KEY (`codigoKit`),
  ADD KEY `TX1` (`TX1`,`RX1`,`RX3`,`TX3`);

--
-- Indices de la tabla `sim`
--
ALTER TABLE `sim`
  ADD PRIMARY KEY (`numeroTelefono`);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
