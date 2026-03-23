-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2026 at 12:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `absensi_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `check_in_time` datetime NOT NULL,
  `check_out_time` datetime DEFAULT NULL,
  `photo_url` varchar(255) NOT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `device_info` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `location_out` varchar(255) DEFAULT NULL,
  `location_in` varchar(255) DEFAULT NULL,
  `photo_url_out` varchar(255) NOT NULL,
  `ip_address_out` varchar(255) DEFAULT NULL,
  `device_info_out` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `user_id`, `check_in_time`, `check_out_time`, `photo_url`, `ip_address`, `device_info`, `created_at`, `updated_at`, `location_out`, `location_in`, `photo_url_out`, `ip_address_out`, `device_info_out`) VALUES
(25, 2, '2026-03-20 13:33:51', NULL, '1773988431127-attendance-1773988429477.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-03-20 13:33:51.133886', '2026-03-20 13:33:51.133886', '', '-6.33607208390558,106.68968246738197', '', NULL, NULL),
(26, 4, '2026-03-20 22:08:05', NULL, '1774019285562-attendance-1774019285530.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-03-20 22:08:05.582801', '2026-03-20 22:08:05.582801', '', '-6.336058174121632,106.68966057872797', '', NULL, NULL),
(27, 4, '2026-03-21 12:49:00', '2026-03-21 23:09:00', '1774072197186-attendance-1774072195003.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-03-21 12:49:57.226015', '2026-03-21 18:56:29.000000', '', '-6.28605499383205,106.67209762405045', '', NULL, NULL),
(28, 9, '2026-03-21 07:51:00', '2026-03-21 18:56:00', '1774086591578-attendance-1774086591403.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-03-21 16:49:51.606664', '2026-03-21 18:56:42.000000', '', '-6.286153,106.672179', '', NULL, NULL),
(29, 12, '2026-03-21 22:04:55', '2026-03-21 22:05:36', '1774105495206-attendance-1774105493263.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-03-21 22:04:55.225240', '2026-03-21 22:05:36.000000', '-6.286088893573614,106.67210458959536', '-6.286016179295773,106.67208552869889', '1774105536723-attendance-1774105534769.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0'),
(30, 15, '2026-03-22 07:35:17', '2026-03-22 07:37:58', '1774139717664-attendance-1774139715373.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-03-22 07:35:17.700939', '2026-03-22 07:37:58.000000', '-6.286016179295773,106.67208552869889', '-6.286016179295773,106.67208552869889', '1774139878901-attendance-1774139878778.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0'),
(31, 4, '2026-03-22 07:49:17', NULL, '1774140557771-attendance-1774140555563.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-03-22 07:49:17.782457', '2026-03-22 07:49:17.782457', '', '-6.285983722845066,106.67210064289654', '', NULL, NULL),
(32, 2, '2026-03-22 08:52:01', NULL, '1774144321387-attendance-1774144319194.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-03-22 08:52:01.418335', '2026-03-22 08:52:01.418335', '', '-6.285983722845066,106.67210064289654', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role`, `username`, `name`, `title`) VALUES
(2, 'yudho@email.com', '$2b$10$ag3HEEnIJJwxOyjYZ4f0R.qAkJtg8hAHi2gkhulj4kcC8OpsH84NO', 'user', 'yudho1', 'Yudho Prameswara', 'Software Engineer'),
(4, 'yudhoadmin@gmail.com', '$2b$10$1UC7C5dux0DMgwEKrI/6ZOBOjSiuTMwFlJc8aBovXZthit5zpO62G', 'admin', 'admin', 'Admin', 'General Affair'),
(9, 'diana@gmail.com', '$2b$10$exbv6ScXlER8ycygQidxcuO0yja1tk274A9LFhtLEd8.3tgB5IinK', 'admin', 'diana', 'DIana', 'Human Resources'),
(10, 'yudho123@gmail.com', '$2b$10$uYXgTj6ab2hh0ttEkfz3Oe2qhYkRULjqWgK2NI2qpbSL7YLhH4A4u', 'admin', 'yudho12', 'yudho12', ''),
(11, 'andreas@gmail.com', '$2b$10$LR81ZI8VAmhKqwXS7ItGFuLFsVkD2oSI/YFKmUjyaLTcrhbYpXreG', 'user', 'andreass', 'andreas', 'Software Engineer'),
(12, 'andres@gmail.com', '$2b$10$Nneeg5SNo/bDkVI9eS5CyOhQOx1VRNkJ1Y2.I2k8cae.JzAxSf3cW', 'user', 'yudho123', 'yudho123', ''),
(15, 'dianaamandas.work@gmail.com', '$2b$10$MrdUq2O2KdqRR/2f/zU/B.pzmvaJnAu8UVFs3h6yF/tRotWJnQKwq', 'user', 'dianaaaa', 'Diana Amanda Safitri', 'HRGA');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_0bedbcc8d5f9b9ec4979f519597` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `FK_0bedbcc8d5f9b9ec4979f519597` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
