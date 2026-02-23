-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2026 at 09:04 AM
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
-- Database: `hris_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `announcement_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `posted_by` int(11) NOT NULL,
  `date_posted` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendance_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `attendance_date` date NOT NULL,
  `attendance_status` enum('Present','Absent','Late','Overtime','On Leave') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`attendance_id`, `employee_id`, `attendance_date`, `attendance_status`) VALUES
(1, 4, '2026-02-04', 'Present'),
(2, 1, '2026-02-04', 'Present'),
(3, 2, '2026-02-04', 'Present'),
(4, 4, '2026-02-05', 'Present'),
(5, 2, '2026-02-05', 'Present'),
(6, 9, '2026-02-11', 'Present'),
(7, 6, '2026-02-11', 'Present'),
(8, 1, '2026-02-12', 'Present'),
(9, 1, '2026-02-23', 'Present');

-- --------------------------------------------------------

--
-- Table structure for table `break_logs`
--

CREATE TABLE `break_logs` (
  `break_log_id` int(11) NOT NULL,
  `time_log_id` int(11) NOT NULL,
  `break_start` datetime NOT NULL,
  `break_end` datetime DEFAULT NULL,
  `total_break_minutes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `break_logs`
--

INSERT INTO `break_logs` (`break_log_id`, `time_log_id`, `break_start`, `break_end`, `total_break_minutes`) VALUES
(1, 2, '2026-02-04 13:00:46', NULL, NULL),
(2, 2, '2026-02-04 13:00:49', NULL, NULL),
(3, 3, '2026-02-04 13:14:49', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `civil_status` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `personal_email` varchar(100) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `account` varchar(100) DEFAULT NULL,
  `cluster` varchar(100) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `employment_status` varchar(20) DEFAULT NULL,
  `employee_type` varchar(30) DEFAULT NULL,
  `date_hired` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `user_id`, `first_name`, `middle_name`, `last_name`, `address`, `birthdate`, `civil_status`, `email`, `personal_email`, `position`, `account`, `cluster`, `contact_number`, `employment_status`, `employee_type`, `date_hired`) VALUES
(1, 2, 'admin', NULL, 'admin', NULL, NULL, NULL, 'admin@ireply.com', NULL, 'superadmin', NULL, NULL, NULL, NULL, NULL, '0000-00-00'),
(2, 7, 'dennis', NULL, 'Severino', NULL, NULL, NULL, 'test@gmail.com', NULL, 'csr', 'sample', NULL, NULL, 'Active', NULL, '2026-01-29'),
(3, 8, 'Keviun', NULL, 'Figueroa', NULL, NULL, NULL, 'dennis@gmail.com', NULL, 'President', 'Pepsi', NULL, NULL, 'Active', NULL, '2026-01-29'),
(4, 9, 'stella', NULL, 'eriman', NULL, NULL, NULL, 'stellamarieeriman@gmail.com', NULL, 'csr', 'voya', NULL, NULL, 'Active', NULL, '2026-01-30'),
(5, 10, 'Eu Geuo', NULL, 'Vecino', NULL, NULL, NULL, 'eu@gmail.com', NULL, 'csr', 'pepsi', NULL, NULL, 'Active', NULL, '2026-02-05'),
(6, 11, 'jan kevin', NULL, 'dilas', NULL, NULL, NULL, 'jankevin@gmail.com', NULL, 'csr', 'royal', NULL, NULL, 'Active', NULL, '2026-02-05'),
(7, 12, 'johnray', NULL, 'eriman', NULL, NULL, NULL, 'johnray@gmail.com', NULL, 'agent', 'sample', NULL, NULL, 'Active', NULL, '2026-02-05'),
(8, 13, 'yannie', NULL, 'eriman', NULL, NULL, NULL, 'yannie@gmail.com', NULL, 'CEO', 'voya', NULL, NULL, 'Active', NULL, '2026-02-06'),
(9, 14, 'kenneth', NULL, 'De vera', NULL, NULL, NULL, 'kenneth@gmail.com', NULL, 'csr', 'pepsi', NULL, NULL, 'Active', NULL, '2026-02-11'),
(10, 15, 'jaden', NULL, 'rivera', NULL, NULL, NULL, 'jaden@gmail.com', NULL, 'csr', 'Pepsi', NULL, NULL, 'Active', NULL, '2026-02-11'),
(12, 18, 'kev', NULL, 'figs', NULL, NULL, NULL, 'kevs@gmail.com', NULL, 'vice pres', 'test', NULL, NULL, 'Active', NULL, '2026-02-12'),
(13, 19, 'Dave', NULL, 'Marcellana', NULL, NULL, NULL, 'anyy@any.com', NULL, 'Utility', 'iReply', NULL, NULL, 'Active', NULL, '2026-02-13'),
(14, 20, 'keviny', 'monteza', 'figgsss', 'ireply', '2026-02-16', 'Widowed', 'figs@gmail.com', 'kevin@gmail.com', 'Junior IT Technician', 'Smart Choice', NULL, '0976543212', 'Active', 'Probationary', '2026-02-16'),
(15, 32, 'jems', 'jems', 'jems', 'ireply', '2002-08-23', 'Married', 'stella@gmail.com', 'jems@gmail.com', 'HR Lead', 'iReply Back Office Services', 'Cluster B', '09123421235', 'Active', 'Regular', '2026-02-17'),
(16, 33, 'stella', 'stella', 'stellaa', 'ireply', '2002-08-23', 'Married', 'stellaa@gmail.com', 'stella@gmail.com', 'Sr. Recruitment Specialist', 'iReply Back Office Services', 'Cluster B', '09521511421', 'Active', 'Regular', '2026-02-17'),
(17, 34, 'new', 'test', 'test', 'ireply', '2002-02-11', 'Married', 'new@gmail.com', 'new@gmail.com', 'HR Coordinator', 'RabbitRun', 'Cluster C', '098746253125', 'Active', 'Regular', '2026-02-18'),
(18, 35, 'test2', 'test2', 'test2', 'iqor', '2002-11-20', 'Married', 'test2@gmail.com', 'test2@gmail.com', 'Accounting', 'NUSO', 'Cluster D', '095827361234', 'Active', 'Contractual', '2026-02-18'),
(19, 37, 'jadenn', 'jaden', 'jaden', 'ireply', '2001-11-11', 'Widowed', 'jaden1@gmail.com', 'jaden1@gmail.com', 'Service Delivery Manager', 'SIPPIO', 'Night Support', '09876452612', 'Active', 'Probationary', '2026-02-20');

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `holiday_id` int(11) NOT NULL,
  `holiday_name` varchar(50) NOT NULL,
  `holiday_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leave_requests`
--

CREATE TABLE `leave_requests` (
  `leave_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `leave_type` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `reason` text DEFAULT NULL,
  `status` enum('Pending','Approved','Denied') DEFAULT 'Pending',
  `reviewed_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `role_description` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `role_description`) VALUES
(1, 'Superadmin', 'System Super Administrator'),
(2, 'Admin', 'Administrator'),
(3, 'Teamcoach', 'Team Coach'),
(4, 'Employee', 'Regular Employee');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `schedule_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `day_of_week` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `shift_type` enum('Morning','Mid','Night') NOT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `work_setup` enum('Onsite','WFH','Hybrid') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`schedule_id`, `employee_id`, `day_of_week`, `shift_type`, `start_time`, `end_time`, `work_setup`, `created_at`) VALUES
(1, 2, 'Monday', 'Night', '22:00:00', '06:00:00', 'WFH', '2026-01-29 09:41:56'),
(2, 2, 'Tuesday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-01-29 09:41:56'),
(3, 2, 'Wednesday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-01-29 09:41:56'),
(4, 2, 'Thursday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-01-29 09:41:56'),
(5, 2, 'Friday', 'Morning', '09:00:00', '18:00:00', 'WFH', '2026-01-29 09:41:56'),
(6, 3, 'Monday', 'Morning', '08:00:00', '17:00:00', 'Onsite', '2026-01-29 09:49:01'),
(7, 3, 'Tuesday', 'Night', '21:00:00', '06:00:00', 'WFH', '2026-01-29 09:49:01'),
(8, 4, 'Monday', 'Morning', '09:00:00', '18:00:00', 'Onsite', '2026-01-29 23:44:40'),
(9, 4, 'Tuesday', 'Morning', '09:00:00', '18:00:00', 'Onsite', '2026-01-29 23:44:40'),
(10, 4, 'Wednesday', 'Night', '21:00:00', '06:00:00', 'WFH', '2026-01-29 23:44:40'),
(11, 4, 'Thursday', 'Night', '21:00:00', '06:00:00', 'WFH', '2026-01-29 23:44:40'),
(12, 4, 'Friday', 'Morning', '09:00:00', '18:00:00', 'Onsite', '2026-01-29 23:44:40'),
(13, 5, 'Monday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-05 09:57:46'),
(14, 5, 'Tuesday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-05 09:57:46'),
(15, 5, 'Wednesday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-05 09:57:46'),
(16, 5, 'Thursday', 'Morning', '09:00:00', '18:00:00', 'Onsite', '2026-02-05 09:57:46'),
(17, 5, 'Friday', 'Morning', '09:00:00', '18:00:00', 'Onsite', '2026-02-05 09:57:46'),
(18, 6, 'Monday', 'Night', '21:00:00', '05:00:00', 'Onsite', '2026-02-05 10:04:16'),
(19, 7, 'Monday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-05 10:31:43'),
(20, 7, 'Tuesday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-05 10:31:43'),
(21, 7, 'Wednesday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-05 10:31:43'),
(22, 7, 'Thursday', 'Morning', '09:00:00', '18:00:00', 'WFH', '2026-02-05 10:31:43'),
(23, 7, 'Friday', 'Morning', '09:00:00', '18:00:00', 'WFH', '2026-02-05 10:31:43'),
(24, 8, 'Monday', 'Morning', '09:00:00', '18:00:00', 'Onsite', '2026-02-06 11:59:35'),
(25, 8, 'Wednesday', 'Morning', '09:00:00', '18:00:00', 'Onsite', '2026-02-06 11:59:35'),
(26, 8, 'Tuesday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-06 11:59:35'),
(27, 8, 'Thursday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-06 11:59:35'),
(28, 8, 'Friday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-06 11:59:35'),
(29, 9, 'Wednesday', 'Morning', '21:00:00', '20:00:00', 'Onsite', '2026-02-11 01:20:59'),
(30, 9, 'Thursday', 'Morning', '21:00:00', '20:00:00', 'Onsite', '2026-02-11 01:20:59'),
(31, 9, 'Tuesday', 'Night', '08:00:00', '09:00:00', 'Onsite', '2026-02-11 01:20:59'),
(32, 9, 'Friday', 'Night', '08:00:00', '09:00:00', 'Onsite', '2026-02-11 01:20:59'),
(33, 10, 'Monday', 'Morning', '09:00:00', '18:00:00', 'Onsite', '2026-02-11 02:00:32'),
(34, 10, 'Tuesday', 'Morning', '09:00:00', '18:00:00', 'Onsite', '2026-02-11 02:00:32'),
(35, 10, 'Thursday', 'Morning', '09:00:00', '18:00:00', 'WFH', '2026-02-11 02:00:32'),
(36, 10, 'Wednesday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-11 02:00:32'),
(37, 10, 'Friday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-11 02:00:32'),
(43, 12, 'Monday', 'Morning', '08:00:00', '17:00:00', 'Onsite', '2026-02-12 07:21:14'),
(44, 12, 'Wednesday', 'Morning', '08:00:00', '17:00:00', 'Onsite', '2026-02-12 07:21:14'),
(45, 12, 'Tuesday', 'Night', '21:00:00', '06:00:00', 'WFH', '2026-02-12 07:21:14'),
(46, 12, 'Thursday', 'Night', '21:00:00', '06:00:00', 'WFH', '2026-02-12 07:21:14'),
(47, 12, 'Friday', 'Night', '21:00:00', '06:00:00', 'WFH', '2026-02-12 07:21:14'),
(48, 13, 'Monday', '', '00:00:00', '00:00:00', 'WFH', '2026-02-13 08:50:50'),
(49, 13, 'Tuesday', 'Night', '17:00:00', '05:00:00', 'Onsite', '2026-02-13 08:50:50'),
(50, 13, 'Wednesday', 'Night', '17:00:00', '03:00:00', 'WFH', '2026-02-13 08:50:50'),
(51, 13, 'Thursday', 'Night', '18:00:00', '03:00:00', 'Onsite', '2026-02-13 08:50:50'),
(52, 13, 'Friday', 'Night', '18:00:00', '03:00:00', 'Onsite', '2026-02-13 08:50:50'),
(53, 14, 'Tuesday', '', '18:00:00', '03:00:00', 'Onsite', '2026-02-19 03:13:28'),
(54, 14, 'Wednesday', '', '18:00:00', '03:00:00', 'Onsite', '2026-02-19 03:13:28'),
(55, 15, 'Wednesday', 'Night', '21:00:00', '08:00:00', 'WFH', '2026-02-19 03:15:02'),
(56, 15, 'Thursday', 'Night', '21:00:00', '08:00:00', 'WFH', '2026-02-19 03:15:02'),
(57, 15, 'Friday', 'Night', '21:00:00', '08:00:00', 'WFH', '2026-02-19 03:15:02'),
(58, 16, 'Monday', 'Mid', '17:00:00', '02:00:00', 'Hybrid', '2026-02-19 03:19:03'),
(59, 16, 'Wednesday', 'Mid', '17:00:00', '02:00:00', 'Hybrid', '2026-02-19 03:19:03'),
(60, 16, 'Thursday', 'Mid', '17:00:00', '02:00:00', 'Hybrid', '2026-02-19 03:19:03'),
(61, 17, 'Wednesday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-19 03:21:21'),
(62, 17, 'Thursday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-19 03:21:21'),
(63, 17, 'Friday', 'Night', '21:00:00', '06:00:00', 'Onsite', '2026-02-19 03:21:21'),
(64, 17, 'Monday', 'Morning', '09:00:00', '18:00:00', 'Hybrid', '2026-02-19 03:21:21'),
(65, 17, 'Tuesday', 'Morning', '09:00:00', '18:00:00', 'Hybrid', '2026-02-19 03:21:21');

-- --------------------------------------------------------

--
-- Table structure for table `team_cluster`
--

CREATE TABLE `team_cluster` (
  `team_id` int(11) NOT NULL,
  `team_name` varchar(50) NOT NULL,
  `coach_id` int(11) NOT NULL,
  `approved_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `team_member_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `time_logs`
--

CREATE TABLE `time_logs` (
  `time_log_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `attendance_id` int(11) DEFAULT NULL,
  `time_in` datetime DEFAULT NULL,
  `time_out` datetime DEFAULT NULL,
  `log_date` date NOT NULL,
  `total_work_minutes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `time_logs`
--

INSERT INTO `time_logs` (`time_log_id`, `employee_id`, `attendance_id`, `time_in`, `time_out`, `log_date`, `total_work_minutes`) VALUES
(1, 4, 1, '2026-02-04 12:30:17', '2026-02-04 12:30:19', '2026-02-04', 0),
(2, 1, 2, '2026-02-04 13:00:23', '2026-02-04 13:00:55', '2026-02-04', 0),
(3, 2, 3, '2026-02-04 13:14:30', '2026-02-04 13:19:27', '2026-02-04', 0),
(4, 4, 4, '2026-02-05 08:40:18', '2026-02-05 08:40:23', '2026-02-05', 0),
(5, 2, 5, '2026-02-05 08:57:14', '2026-02-05 18:10:06', '2026-02-05', 132),
(6, 9, 6, '2026-02-11 09:22:25', '2026-02-11 09:22:29', '2026-02-11', 0),
(7, 6, 7, '2026-02-11 09:38:58', '2026-02-11 09:39:00', '2026-02-11', 0),
(8, 1, 8, '2026-02-12 15:24:33', '2026-02-12 15:24:35', '2026-02-12', 0),
(9, 1, 9, '2026-02-23 15:42:37', '2026-02-23 15:42:42', '2026-02-23', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password_hash`, `role_id`, `created_at`) VALUES
(2, 'admin', '$2y$10$0b26/Du3MJNhyhuKn9/IeOWlayMPo5DtAV2zRuF/Alt1xwDk4hhy6', 1, '2026-01-29 17:04:40'),
(7, 'test@gmail.com', '$2y$10$/Gaks65ILKb/ivLB6wmROupTUEzzOw4f4lwHUFBIZHo54rMS3chN2', 4, '2026-01-29 17:41:56'),
(8, 'dennis@gmail.com', '$2y$10$U8mD1Xamfqzu1NFouNEv5OHB2W9oj4a5NXnT21IEx9xODiyCmDnDu', 4, '2026-01-29 17:49:01'),
(9, 'stellamarieeriman@gmail.com', '$2y$10$WdOze02mUKE1nqw6mF5p5.bnhywRv7SFiiyLSV6H3ZRnQ19cSBKsu', 4, '2026-01-30 07:44:40'),
(10, 'eu@gmail.com', '$2y$10$V1iiw1IoLNRdBXPgA7FuXu5k1BFbnRWiQW3/.3.GR3yEUFRdthRiu', 4, '2026-02-05 17:57:46'),
(11, 'jankevin@gmail.com', '$2y$10$AY1YEVHrTDAlb3FaDj6/m.3FgrzXuPydiqw6SKW7ktFuZsoVuNHGq', 4, '2026-02-05 18:04:16'),
(12, 'johnray@gmail.com', '$2y$10$NmQRA1RoFeGwk.HuvCm5hu4HLGfldIqcoXRu.cUKq5V9heSuGV4wC', 4, '2026-02-05 18:31:43'),
(13, 'yannie@gmail.com', '$2y$10$vLxg7LU/MQbxPDzQjzIdZuLsog9iQjIq2sG/8tKHhVHATwpCrvPte', 4, '2026-02-06 19:59:35'),
(14, 'kenneth@gmail.com', '$2y$10$12EDa4wL52EhJ1nEP3uke.wim/0k3cKtZ2Q2ReUusqUqBTWFfJ/kO', 4, '2026-02-11 09:20:59'),
(15, 'jaden@gmail.com', '$2y$10$naA6jYVsMyQRCUx9vdSzWeuDkq/uHuumMUQy5BDR0TujRn6DNVxOO', 4, '2026-02-11 10:00:32'),
(17, 'test1@gmail.com', '$2y$10$t2FwnouuUgI8s5Eg4l3mqO3aLgVEkHHZv86oIxYxeGm3r4GrUoMn.', 4, '2026-02-12 14:29:11'),
(18, 'kevs@gmail.com', '$2y$10$l0sOpNrgILYczMqc9q24DuT84WPM9yZ3HTNclWonGfmSKTG0gPx7C', 4, '2026-02-12 15:21:14'),
(19, 'any@any.com', '$2y$10$.rKEJHapdGlNkryifxA9bOEmCNtrbrahnVn4JeyMV9Zz1VID/bF1G', 4, '2026-02-13 16:50:50'),
(20, 'figs@gmail.com', '$2y$10$pAeTJeQtwDnixO/nJof8cO4X0LN5mUD0KwNhNHyAHugUJjUGNyDQu', 4, '2026-02-16 16:20:36'),
(32, 'stella@gmail.com', '$2y$10$9yrhP0IqG4bNpPcQ5vFPw.pSss/ujmN8egmHnjJe6BMSqJ/54DOIW', 3, '2026-02-17 15:59:01'),
(33, 'stellaa@gmail.com', '$2y$10$vJwLDimPJZ4b9VpGPix2Ku9EdSYjvtxAs4Oj5wxkBL46WIqyItBZ.', 4, '2026-02-17 16:33:53'),
(34, 'new@gmail.com', '$2y$10$id7cOlM1dH/cMHnMtyKV4ul8WBF5SgdQaagTbdRR7sDQOsGcz.j1W', 4, '2026-02-18 15:46:56'),
(35, 'test2@gmail.com', '$2y$10$7DMKRw.KqnLjXp7CAP4OP.ViRORgkBjKgleeCXNIDPR6sJ2Lyn8pi', 4, '2026-02-18 15:48:46'),
(37, 'jaden1@gmail.com', '$2y$10$BGKaFnbHG2juvvB.HC8sv.ruH/rvbkGftNW5DmIaJVdtvORpgFcX6', 4, '2026-02-20 10:28:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`announcement_id`),
  ADD KEY `posted_by` (`posted_by`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `break_logs`
--
ALTER TABLE `break_logs`
  ADD PRIMARY KEY (`break_log_id`),
  ADD KEY `time_log_id` (`time_log_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`holiday_id`);

--
-- Indexes for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD PRIMARY KEY (`leave_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `reviewed_by` (`reviewed_by`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `fk_employee_schedule` (`employee_id`);

--
-- Indexes for table `team_cluster`
--
ALTER TABLE `team_cluster`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `coach_id` (`coach_id`),
  ADD KEY `approved_by` (`approved_by`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`team_member_id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `time_logs`
--
ALTER TABLE `time_logs`
  ADD PRIMARY KEY (`time_log_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `attendance_id` (`attendance_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `announcement_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `break_logs`
--
ALTER TABLE `break_logs`
  MODIFY `break_log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `holiday_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leave_requests`
--
ALTER TABLE `leave_requests`
  MODIFY `leave_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `team_cluster`
--
ALTER TABLE `team_cluster`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `team_member_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `time_logs`
--
ALTER TABLE `time_logs`
  MODIFY `time_log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`posted_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `break_logs`
--
ALTER TABLE `break_logs`
  ADD CONSTRAINT `break_logs_ibfk_1` FOREIGN KEY (`time_log_id`) REFERENCES `time_logs` (`time_log_id`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD CONSTRAINT `leave_requests_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `leave_requests_ibfk_2` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `fk_employee_schedule` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE;

--
-- Constraints for table `team_cluster`
--
ALTER TABLE `team_cluster`
  ADD CONSTRAINT `team_cluster_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `team_cluster_ibfk_2` FOREIGN KEY (`approved_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `team_members`
--
ALTER TABLE `team_members`
  ADD CONSTRAINT `team_members_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team_cluster` (`team_id`),
  ADD CONSTRAINT `team_members_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `time_logs`
--
ALTER TABLE `time_logs`
  ADD CONSTRAINT `time_logs_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `time_logs_ibfk_2` FOREIGN KEY (`attendance_id`) REFERENCES `attendance` (`attendance_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
