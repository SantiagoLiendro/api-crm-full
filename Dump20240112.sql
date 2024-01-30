-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: crm_practica
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `usuarioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarioId` (`usuarioId`),
  CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Cliente Actualizado',' Descripcion  largaDescripcion  largaDescripcion  largaDescripcion  largaDescripcion  largaDescripcion  larga','cliente@cliente.com',NULL,'2023-12-05 13:36:25','2023-12-06 17:58:39',1),(3,'Cliente N1','descripcion CLiente N1',NULL,NULL,'2023-12-06 17:35:07','2023-12-06 17:35:07',1),(25,'Otro Cliente Editado 2','Descripcion Edicion','correo@correo.com','312312','2023-12-15 19:27:11','2024-01-12 14:08:22',3),(26,'NUEVO','NUEVA','corere@casdsa.com','21312312','2023-12-15 19:28:17','2023-12-15 19:28:17',3);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `confirmado` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Nombre Editado','Liendro','correo2@correo.com','$2b$10$mRKkGkuy9/GW5BGGYgN2HezrftfQpm9VjyVde6wy0WOV9Ao1lKKu6','',1,'2023-12-05 13:36:25','2023-12-06 17:26:00'),(2,'Pablo','Liendro','correo3@correo.com','$2b$10$3hCglZ85LKyHHWpPgnnWHePMdlmbvACH5eNl1OMPBXgiyLTY.E.kq',NULL,1,'2023-12-05 17:49:21','2023-12-05 17:50:49'),(3,'Manuel','Liendro','correo@correo.com','$2b$10$dOWlqKdb//CFK5csP8x2aOGsspdrDZnnujDdwE324GTDCz1wrav1e','',1,'2023-12-05 17:56:09','2023-12-11 21:14:11'),(4,'Santiago','Liendro','correo5@correo.com','$2b$10$HLMf6nVYDlPvDk4mNwKM0.g3rC0Of6EN5wy.PaW4wKjwVwn7gPLeG','5lros1elu981hh509e56',0,'2023-12-08 15:21:12','2023-12-08 15:21:12'),(5,'Santiago','Liendro','correo9@correo.com','$2b$10$JV0cVa5A01JmBMW673iWOucoCl0KEYvHljWCHbBu3kVwwh1LJiRKq','nla49707b5o1hhcs2iuh',0,'2023-12-11 16:41:29','2023-12-11 16:41:29'),(6,'Santiago','Liendro','correo10@correo.com','$2b$10$JENOXki.e6if/CV6LLrDwujfKNX6C9Amk3rcPXki.ZEB2GszbYqWq','7drjl2eu82o1hhcs3pn8',0,'2023-12-11 16:42:09','2023-12-11 16:42:09'),(7,'Santiago','Liendro','correo12@correo.com','$2b$10$1.SfeidQeGqWGZgGbLMQGORNHtKjQVkKJwZiVZcS/AuWKwnmgoZvC','e0ih3nef2l1hhcs4t5h',0,'2023-12-11 16:42:45','2023-12-11 16:42:45'),(8,'Santiago','Liendro','correo11@correo.com','$2b$10$L1b8HNRvwCEdTc39V9D0Y.nsJdiwKX0lDixzPRAPZPAOrPAFRN.0C','1o0jui59osg1hhcs5h4l',0,'2023-12-11 16:43:05','2023-12-11 16:43:05'),(9,'Santiago','Liendro','correo15@correo.com','$2b$10$ircVmbnlmjqp8yIaLthoD.0J40VVaM0TDYYShOReOoRShkjQ48FDu','9schd545d681hhcs683s',0,'2023-12-11 16:43:29','2023-12-11 16:43:29'),(10,'Santiago','Liendro','correo125@correo.com','$2b$10$dh8h.DidLNP7sZGmnKLvJ.Yzc4gl1iiNkp4BD9yUbf9fNzu36zB4a','40cf7cvhs0o1hhcs6tgq',0,'2023-12-11 16:43:51','2023-12-11 16:43:51'),(11,'Santiago','Liendro','correo124@correo.com','$2b$10$bIBcefUSEI.lt22kbax91eQ5TONg.uh6f5mtCAM1OceFYL3wqa70S','in80cpnuk41hhcs806g',0,'2023-12-11 16:44:26','2023-12-11 16:44:26'),(12,'Santiago','Liendro','correo1211@correo.com','$2b$10$FSrIqisTXN0MaiP9dypSNOYi8grpjq7t.VWrQS3jX2eToRSEmizda','r8etc7ljg381hhcsa8gn',0,'2023-12-11 16:45:40','2023-12-11 16:45:40'),(13,'Santiago','Liendro','correo12221@correo.com','$2b$10$oAkm3ejw5wwDsjzpFYTIMe2mP.7VhP9OshHGM4oBx3eh9pLGrEty6','04to0memqi81hhcsbite',0,'2023-12-11 16:46:24','2023-12-11 16:46:24'),(14,'Santiago','Liendro','correo1121@correo.com','$2b$10$CHhGX.Z1FlJeCvhEe2puNunvSFnTcWIC9ZLt6Yeh.EZDqlYAR.uji','f1jbfas37to1hhcsf8j4',0,'2023-12-11 16:48:24','2023-12-11 16:48:24'),(15,'Santiago','Liendro','correoasdasd@correo.com','$2b$10$.djIkmQsIFLUhKL3SaQQUeODda1SX.D5CUjqHliKWlBCG5etjARvO','9smk16ku54o1hhdakati',0,'2023-12-11 20:55:50','2023-12-11 20:55:50'),(16,'Santiago','Liendro','correoaa@correo.com','$2b$10$5N4jNGaVYDz0RvEqdS0e.eah8TadTHAD4yDDxTeYdLBMlKxx6anqe','9lijag5h2lo1hhffn5c0',0,'2023-12-12 17:03:15','2023-12-12 17:03:15'),(17,'Santiago','Liendro','santiagoliendro@corre.com','$2b$10$Hu7dz86hcEjw.m9ahdTGqejMRau8aSEmEeultDxh3HMDDVVSLn7VS',NULL,1,'2023-12-16 19:37:01','2023-12-16 19:51:55');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-12 11:30:20
