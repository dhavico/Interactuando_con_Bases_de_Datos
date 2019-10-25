-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-10-2019 a las 00:03:40
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agenda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `fecha_fin` date NOT NULL,
  `hora_fin` time NOT NULL,
  `es_dia_completo` tinyint(1) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`id`, `titulo`, `fecha_inicio`, `hora_inicio`, `fecha_fin`, `hora_fin`, `es_dia_completo`, `id_usuario`) VALUES
(2, 'otro evento', '2019-05-22', '05:15:20', '2019-05-24', '05:15:20', 0, 238689),
(3, 'otro evento', '2019-05-10', '08:15:20', '2019-05-11', '12:15:20', 1, 633860),
(914400, 'conferencia', '2019-10-27', '07:00:00', '2019-10-31', '17:00:00', 0, 238689),
(294017, 'holaaaa', '2019-05-09', '00:00:00', '0000-00-00', '00:00:00', 0, 238689),
(32798, 'sadsad', '2019-10-10', '07:00:00', '0000-00-00', '07:00:00', 0, 238689);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `nombre_completo` varchar(150) NOT NULL,
  `fecha_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `correo`, `clave`, `nombre_completo`, `fecha_nacimiento`) VALUES
(238689, 'david@ortega.com', '$2y$10$beQVS5LJ4KmmaT0sDCtQ/ObmwhNGRAqY0Q7copdb2MdzqDOuVB0h2', 'David Ortega', '2001-06-17'),
(633860, 'carlos@murrugarra.com', '$2y$10$WZlk.Z2M1kFDRnoONG0IcOHaF9KZDBjkPJTQJOKG8vg.jFSV3Air2', 'Carlos Murrugarra', '1985-09-02'),
(261219, 'jorge@lopez.com', '$2y$10$yyK1Ay9dpCHlLsHeyaly5unnmCJu9Y6sBVVNVnP3T7iOMpfcChTPu', 'Jorge Lopez', '2005-02-25');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
