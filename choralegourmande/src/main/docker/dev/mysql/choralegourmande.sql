-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           5.7.16 - MySQL Community Server (GPL)
-- SE du serveur:                Linux
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Export de la structure de la base pour chorale_gourmande
CREATE DATABASE IF NOT EXISTS `chorale_gourmande` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `chorale_gourmande`;

-- Export de la structure de la table chorale_gourmande. config
CREATE TABLE IF NOT EXISTS `config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `keyconf` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Export de données de la table chorale_gourmande.config : ~0 rows (environ)
DELETE FROM `config`;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` (`id`, `keyconf`, `value`) VALUES
	(1, 'datastore.path', '/data/chorale/files');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;

-- Export de la structure de la table chorale_gourmande. feeds
CREATE TABLE IF NOT EXISTS `feeds` (
  `id_feed` bigint(20) NOT NULL AUTO_INCREMENT,
  `author` varchar(255) DEFAULT NULL,
  `content` varchar(4096) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `facebook_like` bit(1) DEFAULT NULL,
  `image_extension` varchar(255) DEFAULT NULL,
  `image_position` varchar(255) DEFAULT NULL,
  `image_title` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `image_width` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `top` bit(1) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_feed`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Export de données de la table chorale_gourmande.feeds : ~8 rows (environ)
DELETE FROM `feeds`;
/*!40000 ALTER TABLE `feeds` DISABLE KEYS */;
INSERT INTO `feeds` (`id_feed`, `author`, `content`, `creation_date`, `facebook_like`, `image_extension`, `image_position`, `image_title`, `image_url`, `image_width`, `title`, `top`, `type`) VALUES
	(1, 'a', '<p><span style="background-color: rgb(255, 153, 0); color: rgb(153, 51, 255);">bombay romain -- paris</span></p>', '2016-12-27', NULL, NULL, 'left', NULL, NULL, '512', 'r', b'0', 'actus'),
	(2, 'a', '<p><span style="background-color: rgb(255, 153, 0);">badaboum</span></p>', '2016-12-27', NULL, NULL, 'left', NULL, NULL, '256', 'r', b'0', 'history'),
	(4, 'a', '<h1><span style="color: rgb(161, 0, 0);">badaboumdddd</span></h1>', '2016-12-27', NULL, NULL, 'left', NULL, NULL, '2048', 'r', b'0', 'events'),
	(5, 'Romain Vermorel', '<p>badaboum event test</p>', '2016-12-09', NULL, NULL, 'right', NULL, NULL, '256', 'romain', b'0', 'events'),
	(7, 'Romain Vermorel', '<p>rrdmqqldqùsdq774</p><p>dsfsdlmkfùsfmùs</p><p>sdfl,msdfksfldsmdsflm</p><p><br></p><p>dfsdfsdds</p><p>sdfsdf</p><p><br></p><p>dfsfsdsd</p><p>dfsdf</p><p>sfd</p><p>dfsfsdfdssdgsdgsgsdgsdsg</p><p><br></p><p><br></p><p>sdgsgsdgsdgdssgdgsdvsdvcdcdsc</p><p>vdsvdsvddsvdvsdvsdvsd</p><p>dv</p><p><br></p><p>vsdvsdvsdvsds</p>', '2016-12-01', NULL, NULL, 'left', NULL, NULL, '128', 'rrr', b'0', 'actus'),
	(8, 'Christian.V', '<pre spellcheck="false">rzeopmdjcsdoms;ccvds\r\n</pre><p>vcvxcvcv<span class="ql-cursor">?</span></p>', '2016-12-28', NULL, NULL, 'right', NULL, NULL, '512', 'test', b'1', 'actus'),
	(11, '', '', '2016-12-07', NULL, NULL, 'left', NULL, NULL, '128', 'Romain', b'0', 'trombi'),
	(12, '', '', '2016-12-15', NULL, NULL, 'left', NULL, NULL, '128', 'rrr', b'0', 'trombi');
/*!40000 ALTER TABLE `feeds` ENABLE KEYS */;

-- Export de la structure de la table chorale_gourmande. messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `key_msg` varchar(255) DEFAULT NULL,
  `value_msg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Export de données de la table chorale_gourmande.messages : ~0 rows (environ)
DELETE FROM `messages`;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` (`id`, `key_msg`, `value_msg`) VALUES
	(1, 'feed.deleted', 'Article supprimé'),
	(2, 'song.deleted', 'Chanson supprimée');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;

-- Export de la structure de la table chorale_gourmande. songs
CREATE TABLE IF NOT EXISTS `songs` (
  `id_song` bigint(20) NOT NULL AUTO_INCREMENT,
  `extension` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `band` varchar(255) DEFAULT NULL,
  `compositor` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_song`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

-- Export de données de la table chorale_gourmande.songs : ~1 rows (environ)
DELETE FROM `songs`;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` (`id_song`, `extension`, `title`, `release_date`, `band`, `compositor`) VALUES
	(35, 'nwc', 'a2', '2016-12-13', '', 'yakari2');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
