-- Schema definitions for RAGE MP role‑play server
-- Tables for players and their characters

-- Players table stores login credentials and metadata
CREATE TABLE IF NOT EXISTS players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100) DEFAULT NULL,
  register_ip VARCHAR(45) DEFAULT NULL,
  register_user_agent VARCHAR(255) DEFAULT NULL,
  last_login_ip VARCHAR(45) DEFAULT NULL,
  last_login_user_agent VARCHAR(255) DEFAULT NULL,
  last_login_at TIMESTAMP NULL DEFAULT NULL,
  social_club VARCHAR(100) DEFAULT NULL,
  serial VARCHAR(128) DEFAULT NULL,
  hwid_hash VARCHAR(64) DEFAULT NULL,
  hwid_ex_hash VARCHAR(64) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Characters table links to players and holds character‐specific data
CREATE TABLE IF NOT EXISTS characters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  gender ENUM('male','female','other') DEFAULT NULL,
  money INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- You can add further tables here, such as inventory, vehicles, properties, etc.
