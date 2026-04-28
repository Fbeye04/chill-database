CREATE DATABASE  IF NOT EXISTS `chill_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `chill_db`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: chill_db
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cast`
--

DROP TABLE IF EXISTS `cast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cast` (
  `id_cast` int NOT NULL AUTO_INCREMENT,
  `nama_cast` varchar(255) NOT NULL,
  PRIMARY KEY (`id_cast`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cast_mapping`
--

DROP TABLE IF EXISTS `cast_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cast_mapping` (
  `id_castmapping` int NOT NULL AUTO_INCREMENT,
  `id_seriesfilm` int NOT NULL,
  `id_cast` int NOT NULL,
  PRIMARY KEY (`id_castmapping`),
  KEY `fk_castmapping_seriesfilm` (`id_seriesfilm`),
  KEY `fk_castmapping_cast` (`id_cast`),
  CONSTRAINT `fk_castmapping_cast` FOREIGN KEY (`id_cast`) REFERENCES `cast` (`id_cast`),
  CONSTRAINT `fk_castmapping_seriesfilm` FOREIGN KEY (`id_seriesfilm`) REFERENCES `series_film` (`id_seriesfilm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `creator`
--

DROP TABLE IF EXISTS `creator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creator` (
  `id_creator` int NOT NULL AUTO_INCREMENT,
  `nama_creator` varchar(255) NOT NULL,
  PRIMARY KEY (`id_creator`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `creator_mapping`
--

DROP TABLE IF EXISTS `creator_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creator_mapping` (
  `id_creatormapping` int NOT NULL AUTO_INCREMENT,
  `id_seriesfilm` int NOT NULL,
  `id_creator` int NOT NULL,
  PRIMARY KEY (`id_creatormapping`),
  KEY `fk_creatormapping_seriesfilm` (`id_seriesfilm`),
  KEY `fk_creatormapping_creator` (`id_creator`),
  CONSTRAINT `fk_creatormapping_creator` FOREIGN KEY (`id_creator`) REFERENCES `creator` (`id_creator`),
  CONSTRAINT `fk_creatormapping_seriesfilm` FOREIGN KEY (`id_seriesfilm`) REFERENCES `series_film` (`id_seriesfilm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `daftar_saya`
--

DROP TABLE IF EXISTS `daftar_saya`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daftar_saya` (
  `id_mylist` int NOT NULL AUTO_INCREMENT,
  `tanggal_ditambahkan` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_user` int NOT NULL,
  `id_seriesfilm` int NOT NULL,
  PRIMARY KEY (`id_mylist`),
  KEY `fk_mylist_user` (`id_user`),
  KEY `fk_mylist_seriesfilm` (`id_seriesfilm`),
  CONSTRAINT `fk_mylist_seriesfilm` FOREIGN KEY (`id_seriesfilm`) REFERENCES `series_film` (`id_seriesfilm`),
  CONSTRAINT `fk_mylist_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `episode_movie`
--

DROP TABLE IF EXISTS `episode_movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `episode_movie` (
  `id_episodemovie` int NOT NULL AUTO_INCREMENT,
  `id_seriesfilm` int NOT NULL,
  `urutan_episode` int NOT NULL,
  `judul_episode` varchar(255) NOT NULL,
  `video_url` text NOT NULL,
  `durasi_episode` int NOT NULL,
  `thumbnail_url` text,
  `sinopsis_episode` text,
  PRIMARY KEY (`id_episodemovie`),
  KEY `id_episodemovie_seriesfilm` (`id_seriesfilm`),
  CONSTRAINT `id_episodemovie_seriesfilm` FOREIGN KEY (`id_seriesfilm`) REFERENCES `series_film` (`id_seriesfilm`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `id_genre` int NOT NULL AUTO_INCREMENT,
  `nama_genre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_genre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `genre_mapping`
--

DROP TABLE IF EXISTS `genre_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre_mapping` (
  `id_genremapping` int NOT NULL AUTO_INCREMENT,
  `id_seriesfilm` int NOT NULL,
  `id_genre` int NOT NULL,
  PRIMARY KEY (`id_genremapping`),
  KEY `fk_genremapping_seriesfilm` (`id_seriesfilm`),
  KEY `fk_genremapping_genre` (`id_genre`),
  CONSTRAINT `fk_genremapping_genre` FOREIGN KEY (`id_genre`) REFERENCES `genre` (`id_genre`),
  CONSTRAINT `fk_genremapping_seriesfilm` FOREIGN KEY (`id_seriesfilm`) REFERENCES `series_film` (`id_seriesfilm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id_order` int NOT NULL AUTO_INCREMENT,
  `tanggal_order` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tanggal_berakhir` datetime NOT NULL,
  `status` enum('pending','success','failed') NOT NULL DEFAULT 'pending',
  `id_user` int NOT NULL,
  `id_paket` int NOT NULL,
  PRIMARY KEY (`id_order`),
  KEY `id_user` (`id_user`),
  KEY `id_paket` (`id_paket`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`id_paket`) REFERENCES `paket` (`id_paket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `paket`
--

DROP TABLE IF EXISTS `paket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paket` (
  `id_paket` int NOT NULL AUTO_INCREMENT,
  `nama_paket` varchar(50) NOT NULL,
  `harga` int NOT NULL,
  `resolusi_maksimal` varchar(20) NOT NULL,
  `maksimal_akun` int NOT NULL,
  `bebas_iklan` tinyint(1) NOT NULL DEFAULT '1',
  `bisa_download` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_paket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pembayaran`
--

DROP TABLE IF EXISTS `pembayaran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pembayaran` (
  `id_pembayaran` int NOT NULL AUTO_INCREMENT,
  `metode_pembayaran` varchar(50) NOT NULL,
  `jumlah_bayar` int NOT NULL,
  `kode_voucher` varchar(20) DEFAULT NULL,
  `status` enum('pending','success','failed') NOT NULL DEFAULT 'pending',
  `id_order` int NOT NULL,
  PRIMARY KEY (`id_pembayaran`),
  KEY `fk_pembayaran_order` (`id_order`),
  CONSTRAINT `fk_pembayaran_order` FOREIGN KEY (`id_order`) REFERENCES `order` (`id_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `series_film`
--

DROP TABLE IF EXISTS `series_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `series_film` (
  `id_seriesfilm` int NOT NULL AUTO_INCREMENT,
  `poster_portrait` text,
  `poster_landscape` text,
  `judul` varchar(255) NOT NULL,
  `tahun_rilis` year NOT NULL,
  `tipe_tayangan` enum('series','film') NOT NULL,
  `rating_umur` enum('SU','13+','17+','21+') NOT NULL,
  `sinopsis` text,
  PRIMARY KEY (`id_seriesfilm`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `foto_profil` text,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-28 20:34:51
