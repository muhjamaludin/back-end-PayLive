-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 19, 2020 at 06:44 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paylive`
--

-- --------------------------------------------------------

--
-- Table structure for table `cash_points`
--

CREATE TABLE `cash_points` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cash_points`
--

INSERT INTO `cash_points` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'OVO CASH', '2020-04-16 12:57:39', NULL),
(5, 'OVO Point', '2020-04-16 13:41:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'PLN', '2020-04-16 14:55:12', NULL),
(2, 'BPJS', '2020-04-16 14:55:18', NULL),
(5, 'Pulsa', '2020-04-17 13:10:47', NULL),
(6, 'AXIS', '2020-04-17 13:45:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nominals`
--

CREATE TABLE `nominals` (
  `id` int(11) NOT NULL,
  `id_category` tinyint(2) DEFAULT NULL,
  `id_operator` tinyint(2) DEFAULT NULL,
  `pay_sistem_id` int(2) NOT NULL,
  `nominal` int(8) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nominals`
--

INSERT INTO `nominals` (`id`, `id_category`, `id_operator`, `pay_sistem_id`, `nominal`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 2, 10000, '2020-04-16 14:31:01', '2020-04-17 20:07:47'),
(2, NULL, 1, 3, 63000, '2020-04-16 14:35:11', '2020-04-16 14:39:54'),
(4, 1, 1, 2, 15000, '2020-04-17 18:42:01', '2020-04-17 20:08:12'),
(5, 1, 1, 2, 25000, '2020-04-17 18:42:11', '2020-04-17 20:08:28'),
(6, 1, 1, 2, 50000, '2020-04-17 18:42:19', '2020-04-17 20:11:07');

-- --------------------------------------------------------

--
-- Table structure for table `operators`
--

CREATE TABLE `operators` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `operators`
--

INSERT INTO `operators` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'AXIS', '2020-04-17 13:46:52', NULL),
(2, 'XL', '2020-04-17 13:47:12', NULL),
(3, 'Telkomsel', '2020-04-17 13:47:25', NULL),
(4, '3', '2020-04-17 13:47:48', NULL),
(5, 'Indosat', '2020-04-17 13:48:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `partner`
--

CREATE TABLE `partner` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `purchase` int(8) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pay_sistems`
--

CREATE TABLE `pay_sistems` (
  `id` int(11) NOT NULL,
  `id_operator` tinyint(2) DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pay_sistems`
--

INSERT INTO `pay_sistems` (`id`, `id_operator`, `name`, `created_at`, `updated_at`) VALUES
(1, 2, 'Pascabayaran', '2020-04-16 16:25:54', '2020-04-16 16:38:45'),
(3, 2, 'Prabayar', '2020-04-17 19:47:02', NULL),
(4, 3, 'Utang', '2020-04-17 19:47:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `id_operator` tinyint(2) DEFAULT NULL,
  `pay_sistem_id` tinyint(2) NOT NULL,
  `nominal_id` tinyint(8) NOT NULL,
  `add_price` int(8) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `id_operator`, `pay_sistem_id`, `nominal_id`, `add_price`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 2000, '2020-04-16 17:18:11', NULL),
(3, 1, 1, 4, 1500, '2020-04-17 18:47:24', NULL),
(4, 1, 1, 5, 1000, '2020-04-17 18:47:32', NULL),
(5, 1, 1, 5, 500, '2020-04-17 18:47:36', NULL),
(6, 1, 1, 6, -1000, '2020-04-18 08:41:32', '2020-04-18 08:49:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `phone` varchar(14) NOT NULL,
  `security_code` varchar(60) DEFAULT NULL,
  `verification_code` varchar(37) DEFAULT NULL,
  `is_active` tinyint(2) DEFAULT 0,
  `is_verified` tinyint(2) DEFAULT 0,
  `role_id` tinyint(2) DEFAULT 2,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `phone`, `security_code`, `verification_code`, `is_active`, `is_verified`, `role_id`, `created_at`, `updated_at`) VALUES
(4, '089212345678', '$2a$10$imQ8mW8YNSivnfdhaubH1ekpgVS1sxHcnpaE8xQFQtcMJWFh0zaam', 'edc3c8ad-223d-430b-b78e-4a92b5ea87c7', 0, 0, 2, '2020-04-15 16:24:17', '2020-04-15 16:24:17'),
(6, '084678342321', '$2a$10$AAP69uMy7yGgZulGPkf1de3AGORcU1U7RV5apOw9EafVGVgXGzcSW', NULL, 1, 1, 2, '2020-04-15 17:04:34', '2020-04-16 09:04:49'),
(7, 'undefined', '$2a$10$WA6vvznCDYv.7rHiquAfAeGiADREBIUkKMJo76fLxoWzQNQUaKBlK', NULL, 1, 1, 2, '2020-04-16 09:00:45', '2020-04-18 01:31:31'),
(8, '089899898765', '$2a$10$YrHV1y4ZFFqWcxZkqxsbOebQKaCXc7z8LNtofW2AP5wgfZPZU9JM.', '9bca73e1-7b8c-491d-bb9f-a15c622c267d', 0, 0, 2, '2020-04-16 20:44:02', '2020-04-16 21:02:28'),
(9, '089899898764', '$2a$10$nWRv3IzDe/NNYnzH8yj6HOmxs/Vuq0Djq9nqWPG4.iVe8bxUYYgSq', NULL, 1, 1, 2, '2020-04-16 20:54:58', '2020-04-17 15:58:52'),
(10, '089899898769', NULL, '05d99653-9de1-4f73-8ef0-b825f1619638', 0, 0, 2, '2020-04-17 15:15:38', '2020-04-17 15:15:38'),
(11, '089899898789', NULL, '8aec39d8-18c4-41a6-80ac-1a6fbec56e7a', 0, 0, 2, '2020-04-17 21:29:57', '2020-04-17 21:29:57'),
(12, '089899898798', NULL, NULL, 0, 0, 2, '2020-04-17 21:31:44', NULL),
(13, '089899898689', NULL, '4fe', 0, 0, 2, '2020-04-17 21:38:33', '2020-04-17 21:38:33'),
(14, '089899898688', NULL, '9197', 0, 0, 2, '2020-04-17 21:38:59', '2020-04-17 21:38:59'),
(15, '085888555222', NULL, 'ab7e', 0, 0, 2, '2020-04-18 12:53:06', '2020-04-18 12:53:06'),
(16, '088555222555', NULL, 'badd', 0, 0, 2, '2020-04-18 12:56:38', '2020-04-18 12:56:38'),
(17, '085888555333', NULL, 'c447', 0, 0, 2, '2020-04-18 21:42:09', '2020-04-18 21:42:09'),
(18, '089888999888', NULL, NULL, 1, 1, 2, '2020-04-18 22:00:48', '2020-04-19 21:50:41'),
(19, '089888999777', NULL, '3635', 0, 0, 2, '2020-04-18 22:10:46', '2020-04-18 22:10:46'),
(20, '089212345888', '$2a$10$MqLThHvP/pCNGlHqZCh7HeObi2R4LGHdXMiRtxzjdEjyMR5fqhtam', NULL, 1, 1, 2, '2020-04-19 20:34:16', '2020-04-19 20:37:00'),
(21, '085726123968', NULL, NULL, 1, 1, 2, '2020-04-19 21:51:13', '2020-04-19 21:51:44'),
(22, '089655554444', '$2a$10$nDsDTR9lxkkYESW2GZis9../4M4AhGlnhxq//2a5usJkx7Gc4gn2q', NULL, 1, 1, 2, '2020-04-19 21:53:12', '2020-04-19 21:53:53'),
(23, '089633332121', '$2a$10$HdudnSCdPpVf8SoeMhfRn.4TWO4BWqGHO9xaJAPQTNr4tWHTAu4Li', NULL, 1, 1, 2, '2020-04-19 22:42:14', '2020-04-19 22:42:37'),
(24, '085726281183', '$2a$10$JZsqsnHipSX9SswvZYsTp.dKsDibfsl47IgyD4EFA08fU0f0b88aq', NULL, 1, 1, 2, '2020-04-19 22:44:57', '2020-04-19 22:45:36'),
(25, '085741963212', '$2a$10$TdueqR1CNZXSELrRcb9IfOpdC0LVEguwgl5PiHhWiAYCjUGmr/7LC', NULL, 1, 1, 2, '2020-04-19 22:49:32', '2020-04-19 22:50:02'),
(26, '085123456789', '$2a$10$jRGO1r8tl3HPsJ9S/8XFW.GhIinQU4rlXJA8BTpBD3DKxVCK89FK6', NULL, 1, 1, 2, '2020-04-19 23:21:32', '2020-04-19 23:21:58');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(11) NOT NULL,
  `id_user` int(5) DEFAULT NULL,
  `fullname` varchar(30) NOT NULL,
  `email` varchar(20) NOT NULL,
  `profile_picture` text DEFAULT NULL,
  `identity_picture` text DEFAULT NULL,
  `cash` int(8) DEFAULT NULL,
  `points` int(8) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `id_user`, `fullname`, `email`, `profile_picture`, `identity_picture`, `cash`, `points`, `created_at`, `updated_at`) VALUES
(1, 4, 'jamal', 'maryama@mail.com', NULL, NULL, 60000, NULL, '2020-04-15 16:24:17', '2020-04-18 11:53:26'),
(3, 6, 'Aldi', 'maryama@mail.com', NULL, NULL, 20000, NULL, '2020-04-15 17:04:34', '2020-04-17 12:58:58'),
(4, 7, 'Jams', 'undefined', 'ayam', NULL, 33000, NULL, '2020-04-16 09:00:45', '2020-04-18 11:53:25'),
(5, 8, 'audy', 'marya@lama.com', NULL, NULL, NULL, NULL, '2020-04-16 20:44:02', NULL),
(6, 9, 'undefined', 'undefined', '1587197493512-2068751-200.png', NULL, NULL, NULL, '2020-04-16 20:54:58', '2020-04-18 15:11:33'),
(7, 10, 'audu', 'marya@lama.com', NULL, NULL, 50000, NULL, '2020-04-17 15:15:38', '2020-04-19 15:50:04'),
(8, 11, 'Liana', 'marya@lama.com', NULL, NULL, NULL, NULL, '2020-04-17 21:29:57', NULL),
(9, 12, 'Liana', 'marya@lama.com', NULL, NULL, NULL, NULL, '2020-04-17 21:31:44', NULL),
(10, 13, 'Liana', 'marya@lama.com', NULL, NULL, NULL, NULL, '2020-04-17 21:38:33', NULL),
(11, 14, 'Liana', 'marya@lama.com', NULL, NULL, NULL, NULL, '2020-04-17 21:38:59', NULL),
(12, 15, 'Tes dong', 'Email@mail.com', NULL, NULL, NULL, NULL, '2020-04-18 12:53:06', NULL),
(13, 16, 'Tes lagi', 'Ayam@yam.com', NULL, NULL, NULL, NULL, '2020-04-18 12:56:38', NULL),
(14, 17, 'Ujang', 'Aya@mail.com', NULL, NULL, NULL, NULL, '2020-04-18 21:42:09', NULL),
(15, 18, 'Liani', 'marya@lama.com', NULL, NULL, NULL, NULL, '2020-04-18 22:00:48', NULL),
(16, 19, 'Liani', 'marya@lama.com', NULL, NULL, NULL, NULL, '2020-04-18 22:10:46', NULL),
(17, 20, 'audy', 'maryama@mail.com', NULL, NULL, NULL, NULL, '2020-04-19 20:34:16', NULL),
(18, 21, 'Zaayyiiinnnn', 'Zay@gmail.com', NULL, NULL, NULL, NULL, '2020-04-19 21:51:13', NULL),
(19, 22, 'Aya', 'Fagahs@hs.com', NULL, NULL, NULL, NULL, '2020-04-19 21:53:12', NULL),
(20, 23, 'Tataaaa', 'tata@gmail.com', NULL, NULL, NULL, NULL, '2020-04-19 22:42:14', NULL),
(21, 24, 'Dewwiiii', 'De@gmail.com', NULL, NULL, NULL, NULL, '2020-04-19 22:44:57', NULL),
(22, 25, 'adri', 'asri@gmail.com', NULL, NULL, NULL, NULL, '2020-04-19 22:49:32', NULL),
(23, 26, 'Sariii', 'ain@gmail.com', NULL, NULL, NULL, NULL, '2020-04-19 23:21:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL,
  `id_user` int(2) NOT NULL,
  `name` varchar(35) NOT NULL,
  `image` text DEFAULT NULL,
  `nominal` int(8) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `id_user`, `name`, `image`, `nominal`, `created_at`, `updated_at`) VALUES
(2, 1, 'Diskon Manisan 50%', '1587086789833-reuben-teo-8JzoJyt3hyM-unsplash.jpg', 15550, '2020-04-16 22:12:34', '2020-04-17 08:26:30'),
(3, 1, 'Diskon Susu Pedas 50%', '1587267250647-filosofi-huruf.png', 3000, '2020-04-19 10:34:10', NULL),
(4, 2, 'Diskon Susu Asin 50%', '1587267290804-filosofi-huruf.png', 15000, '2020-04-19 10:34:50', NULL),
(5, 2, 'Mc Donald Surprise', '1587267313379-filosofi-huruf.png', 35000, '2020-04-19 10:35:13', NULL),
(6, 2, 'Mc Donald Surprise 1', '1587267321833-filosofi-huruf.png', 36000, '2020-04-19 10:35:21', NULL),
(7, 2, 'Mc Donald Surprise 2', '1587267330008-filosofi-huruf.png', 12000, '2020-04-19 10:35:30', NULL),
(8, 2, 'Mc Donald Surprise 3', '1587267337090-filosofi-huruf.png', 9000, '2020-04-19 10:35:37', NULL),
(9, 2, 'Mc Donald Surprise 4', '1587267345338-filosofi-huruf.png', 8700, '2020-04-19 10:35:45', NULL),
(10, 3, 'PLN Fiesta', '1587267359795-filosofi-huruf.png', 101500, '2020-04-19 10:35:59', NULL),
(11, 3, 'PLN Fiesta bunga', '1587267370341-filosofi-huruf.png', 59000, '2020-04-19 10:36:10', NULL),
(12, 3, 'Cashback OVO', '1587267385144-filosofi-huruf.png', 5000, '2020-04-19 10:36:25', NULL),
(13, 4, 'Jajan Semesta', '1587267399180-filosofi-huruf.png', 6000, '2020-04-19 10:36:39', NULL),
(14, 5, 'Ramadhan Berkah', '1587267415221-filosofi-huruf.png', 7000, '2020-04-19 10:36:55', NULL),
(15, 5, 'Ramadhan Berkah', '1587267420009-filosofi-huruf.png', 15000, '2020-04-19 10:37:00', NULL),
(16, 5, 'Ramadhan Berkah Keju', '1587267435862-filosofi-huruf.png', 29900, '2020-04-19 10:37:15', NULL),
(17, 6, 'Piring Ceria 50%', '1587267452887-filosofi-huruf.png', 12540, '2020-04-19 10:37:32', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cash_points`
--
ALTER TABLE `cash_points`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nominals`
--
ALTER TABLE `nominals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `operators`
--
ALTER TABLE `operators`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partner`
--
ALTER TABLE `partner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pay_sistems`
--
ALTER TABLE `pay_sistems`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cash_points`
--
ALTER TABLE `cash_points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `nominals`
--
ALTER TABLE `nominals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `operators`
--
ALTER TABLE `operators`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `partner`
--
ALTER TABLE `partner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pay_sistems`
--
ALTER TABLE `pay_sistems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
