-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-12-2024 a las 21:13:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `skill_swap`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `match_id` int(11) DEFAULT NULL,
  `status` enum('pending','accepted','declined') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `recipient_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdAt` int(11) DEFAULT NULL,
  `updatedAt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `recipient_id`, `content`, `timestamp`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 'hola', '2024-12-29 01:10:13', 2024, 2024),
(2, 1, 2, 'hola', '2024-12-29 01:18:28', 2024, 2024),
(7, 1, 2, 'cómo estás', '2024-12-29 02:20:02', 2024, 2024),
(8, 2, 1, 'muy bien y tú?', '2024-12-29 02:22:58', 2024, 2024),
(9, 1, 2, 'todo bien gracias', '2024-12-29 02:23:16', 2024, 2024),
(10, 1, 2, 'quieres aprender html?\n', '2024-12-29 02:51:31', 2024, 2024),
(11, 2, 1, 'si, tu sabes verdad?\n', '2024-12-29 02:52:58', 2024, 2024),
(12, 1, 2, 'sí, tenemos q cuadrar un horario en q los 2 podamos', '2024-12-29 03:05:56', 2024, 2024),
(13, 2, 1, 'claro q sí', '2024-12-29 03:06:13', 2024, 2024),
(14, 1, 2, 'de una, estamos en contacto', '2024-12-29 03:06:45', 2024, 2024),
(15, 2, 1, 'que estés bien!', '2024-12-29 03:06:58', 2024, 2024),
(16, 1, 2, 'igualmente', '2024-12-29 03:07:09', 2024, 2024),
(17, 1, 2, ':)', '2024-12-29 03:07:42', 2024, 2024),
(18, 1, 2, 'mensaje de prueba', '2024-12-29 03:15:01', 2024, 2024),
(19, 1, 2, 'hola amigo!', '2024-12-29 17:57:28', 2024, 2024);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `skill_name` varchar(100) DEFAULT NULL,
  `type` enum('teach','learn') DEFAULT NULL,
  `level` varchar(50) NOT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `updatedAt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `skills`
--

INSERT INTO `skills` (`id`, `user_id`, `skill_name`, `type`, `level`, `createdAt`, `updatedAt`) VALUES
(2, 1, 'React', 'learn', 'intermidiate', 2024, 2024),
(4, 1, 'HTML', 'teach', 'intermidiate', 2024, 2024),
(6, 1, 'PHP', 'learn', 'Advanced', 2024, 2024),
(7, 1, 'Javascript', 'learn', 'Advanced', 2024, 2024),
(8, 2, 'React', 'teach', 'intermidiate', 2024, 2024),
(9, 2, 'PHP', 'teach', 'Advanced', 2024, 2024),
(10, 2, 'Javascript', 'teach', 'Advanced', 2024, 2024),
(11, 2, 'Python', 'learn', 'intermidiate', 2024, 2024),
(12, 2, 'Redux', 'learn', 'Basic', 2024, 2024),
(13, 2, 'HTML', 'learn', 'Advanced', 2024, 2024),
(14, 1, 'Python', 'learn', 'Basic', 2024, 2024);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `teach_skills` text DEFAULT NULL,
  `learn_skills` text DEFAULT NULL,
  `availability` text DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `points` int(11) DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `teach_skills`, `learn_skills`, `availability`, `location`, `points`, `createdAt`, `updatedAt`) VALUES
(1, 'Cesar', 'celopez016@gmail.com', '$2b$10$1UUYkMODyLmzYiKqeDo1kOdryAHQBgfKYqGE.xUiorvrtUxLsHa4O', NULL, NULL, NULL, NULL, 0, '2024-12-28 00:38:31', '2024-12-28 00:38:31'),
(2, 'Pedro', 'pedro@gg.com', '$2b$10$l2KABQmQ.yQCkp8UhQDU0OAaZgEHyE81h/eLRVEXF6JxVDZLFQQeq', NULL, NULL, NULL, NULL, 0, '2024-12-28 18:42:46', '2024-12-28 18:42:46');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `match_id` (`match_id`);

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`recipient_id`);

--
-- Indices de la tabla `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`match_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `skills`
--
ALTER TABLE `skills`
  ADD CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
