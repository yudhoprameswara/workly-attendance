-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 23, 2026 at 02:29 AM
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
(33, 11, '2026-03-23 07:09:24', '2026-03-23 08:24:30', '1774224564626-attendance-1774224562797.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-03-23 07:09:24.674744', '2026-03-23 08:24:30.000000', '-6.336064789280851,106.68966950282568', '-6.336054561342602,106.6896535250549', '1774229070444-attendance-1774229068744.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0'),
(34, 2, '2026-03-23 07:12:01', '2026-03-23 08:23:36', '1774224721120-attendance-1774224720979.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-03-23 07:12:01.130082', '2026-03-23 08:23:36.000000', '-6.336064789280851,106.68966950282568', '-6.336074690642201,106.68968790788989', '1774229016029-attendance-1774229014131.jpg', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0');

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
(9, 'diana@gmail.com', '$2b$10$xhqdspTnwm5cwkjQqUlc2uw3h.lcZG4XW0OrxhbpjAoaM8newhYdm', 'admin', 'diana', 'Diana', 'Human Resources'),
(11, 'andreas@gmail.com', '$2b$10$UrTUK88OtuePYbA9LsiCTu22TtwlrpfQl8jQKxrK3B4g16HbO2Xs.', 'user', 'andreass', 'Andreas Taulany', 'Software Engineer');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

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
