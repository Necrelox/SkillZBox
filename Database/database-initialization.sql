-- MySQL Script generated by MySQL Workbench
-- dim. 10 avril 2022 15:15:57
-- Model: SkillZBox    Version: 2.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema SkillZBox
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `SkillZBox` ;

-- -----------------------------------------------------
-- Schema SkillZBox
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SkillZBox` ;
USE `SkillZBox` ;

-- -----------------------------------------------------
-- Table `SkillZBox`.`USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`USER` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`USER` (
  `email` VARCHAR(255) NOT NULL,
  `username` VARCHAR(16) COLLATE 'Default Collation' NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `token` VARCHAR(38) NOT NULL,
  `is_verified` TINYINT NOT NULL DEFAULT 0,
  `role` ENUM('admin', 'moderator', 'user') NOT NULL,
  `is_connected` TINYINT NOT NULL DEFAULT 0,
  `is_blackListed` TINYINT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`ROOM`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`ROOM` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`ROOM` (
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `option-limit-user` VARCHAR(45) NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`USER_LOGO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`USER_LOGO` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`USER_LOGO` (
  `path` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `seed` INT NOT NULL,
  `size_mo` INT NOT NULL,
  `active` TINYINT NOT NULL,
  `user_uuid` VARCHAR(38) NOT NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `user_uuid_idx` (`user_uuid` ASC) VISIBLE,
  CONSTRAINT `user_uuid`
    FOREIGN KEY (`user_uuid`)
    REFERENCES `SkillZBox`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`USER_IP`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`USER_IP` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`USER_IP` (
  `ip` VARCHAR(16) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT NOT NULL,
  `user_uuid` VARCHAR(38) NOT NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `user_uuid_idx` (`user_uuid` ASC) VISIBLE,
  CONSTRAINT `user_uuid`
    FOREIGN KEY (`user_uuid`)
    REFERENCES `SkillZBox`.`USER` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`USER_MACADDRESS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`USER_MACADDRESS` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`USER_MACADDRESS` (
  `mac_adress` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT NOT NULL,
  `user_uuid` VARCHAR(38) NOT NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `user_uuid_idx` (`user_uuid` ASC) VISIBLE,
  CONSTRAINT `user_uuid`
    FOREIGN KEY (`user_uuid`)
    REFERENCES `SkillZBox`.`USER` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`USER_DEVICE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`USER_DEVICE` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`USER_DEVICE` (
  `device` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT NOT NULL,
  `user_uuid` VARCHAR(38) NOT NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `user_uuid_idx` (`user_uuid` ASC) VISIBLE,
  CONSTRAINT `user_uuid`
    FOREIGN KEY (`user_uuid`)
    REFERENCES `SkillZBox`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`USER_FRIEND`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`USER_FRIEND` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`USER_FRIEND` (
  `is_connected` TINYINT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_uuid` VARCHAR(38) NOT NULL,
  `friend_uuid` VARCHAR(38) NOT NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `user_uuid_idx` (`user_uuid` ASC) VISIBLE,
  INDEX `friend_uuid_idx` (`friend_uuid` ASC) VISIBLE,
  CONSTRAINT `user_uuid`
    FOREIGN KEY (`user_uuid`)
    REFERENCES `SkillZBox`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `friend_uuid`
    FOREIGN KEY (`friend_uuid`)
    REFERENCES `SkillZBox`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`USER_HISTORY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`USER_HISTORY` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`USER_HISTORY` (
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_message` TINYINT NOT NULL DEFAULT 0,
  `is_action` TINYINT NOT NULL DEFAULT 0,
  `user_uuid` VARCHAR(38) NOT NULL,
  `uuid` VARCHAR(38) NOT NULL DEFAULT '',
  PRIMARY KEY (`uuid`),
  INDEX `user_uuid_idx` (`user_uuid` ASC) VISIBLE,
  CONSTRAINT `user_uuid`
    FOREIGN KEY (`user_uuid`)
    REFERENCES `SkillZBox`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`USER_MESSAGE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`USER_MESSAGE` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`USER_MESSAGE` (
  `message` TEXT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `user_history_uuid` VARCHAR(38) NOT NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `user_history_uuid_idx` (`user_history_uuid` ASC) VISIBLE,
  CONSTRAINT `user_history_uuid`
    FOREIGN KEY (`user_history_uuid`)
    REFERENCES `SkillZBox`.`USER_HISTORY` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`USER_ACTION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`USER_ACTION` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`USER_ACTION` (
  `log` VARCHAR(255) NOT NULL,
  `user_history_uuid` VARCHAR(38) NOT NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `user_history_uuid_idx` (`user_history_uuid` ASC) VISIBLE,
  CONSTRAINT `user_history_uuid`
    FOREIGN KEY (`user_history_uuid`)
    REFERENCES `SkillZBox`.`USER_HISTORY` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`ROOM_USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`ROOM_USER` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`ROOM_USER` (
  `created_at` DATETIME NOT NULL,
  `room_uuid` VARCHAR(38) NOT NULL,
  `is_room_master` TINYINT NOT NULL,
  `user_uuid` VARCHAR(38) NOT NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `user_uuid_idx` (`user_uuid` ASC) VISIBLE,
  INDEX `room_uuid_idx` (`room_uuid` ASC) VISIBLE,
  CONSTRAINT `user_uuid`
    FOREIGN KEY (`user_uuid`)
    REFERENCES `SkillZBox`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `room_uuid`
    FOREIGN KEY (`room_uuid`)
    REFERENCES `SkillZBox`.`ROOM` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`ROOM_MESSAGE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`ROOM_MESSAGE` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`ROOM_MESSAGE` (
  `message` TEXT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `has_files` TINYINT NOT NULL DEFAULT 0,
  `room_user_uuid` VARCHAR(38) NOT NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `room_user_uuid_idx` (`room_user_uuid` ASC) VISIBLE,
  CONSTRAINT `room_user_uuid`
    FOREIGN KEY (`room_user_uuid`)
    REFERENCES `SkillZBox`.`ROOM_USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`TAG`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`TAG` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`TAG` (
  `name` VARCHAR(16) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`ROOM_HAS_TAG`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`ROOM_HAS_TAG` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`ROOM_HAS_TAG` (
  `room_uuid` VARCHAR(38) NOT NULL,
  `tag_uuid` VARCHAR(38) NOT NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `room_uuid_idx` (`room_uuid` ASC) VISIBLE,
  INDEX `tag_uuid_idx` (`tag_uuid` ASC) VISIBLE,
  CONSTRAINT `room_uuid`
    FOREIGN KEY (`room_uuid`)
    REFERENCES `SkillZBox`.`ROOM` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `tag_uuid`
    FOREIGN KEY (`tag_uuid`)
    REFERENCES `SkillZBox`.`TAG` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`CATEGORIE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`CATEGORIE` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`CATEGORIE` (
  `name` VARCHAR(16) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`ROOM_HAS_CATEGORIE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`ROOM_HAS_CATEGORIE` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`ROOM_HAS_CATEGORIE` (
  `categorie_uuid` VARCHAR(38) NOT NULL,
  `room_uuid` VARCHAR(38) NOT NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `room_uuid_idx` (`room_uuid` ASC) VISIBLE,
  INDEX `categorie_uuid_idx` (`categorie_uuid` ASC) VISIBLE,
  CONSTRAINT `room_uuid`
    FOREIGN KEY (`room_uuid`)
    REFERENCES `SkillZBox`.`ROOM` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `categorie_uuid`
    FOREIGN KEY (`categorie_uuid`)
    REFERENCES `SkillZBox`.`CATEGORIE` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`ROOM_MESSAGE_FILE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`ROOM_MESSAGE_FILE` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`ROOM_MESSAGE_FILE` (
  `path` VARCHAR(255) NOT NULL,
  `seed` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `size_mo` INT NOT NULL,
  `room_message_uuid` VARCHAR(38) NOT NULL,
  `uuid` VARCHAR(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `room_tchat_uuid_idx` (`room_message_uuid` ASC) VISIBLE,
  CONSTRAINT `room_message_uuid`
    FOREIGN KEY (`room_message_uuid`)
    REFERENCES `SkillZBox`.`ROOM_MESSAGE` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = ascii;


-- -----------------------------------------------------
-- Table `SkillZBox`.`USER_REPORT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`USER_REPORT` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`USER_REPORT` (
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reason` TEXT NOT NULL,
  `user_send_report` VARCHAR(36) NOT NULL,
  `user_reported` VARCHAR(36) NOT NULL,
  `uuid` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `user_send_report_idx` (`user_send_report` ASC) VISIBLE,
  INDEX `user_reported_idx` (`user_reported` ASC) VISIBLE,
  CONSTRAINT `user_send_report`
    FOREIGN KEY (`user_send_report`)
    REFERENCES `SkillZBox`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `user_reported`
    FOREIGN KEY (`user_reported`)
    REFERENCES `SkillZBox`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillZBox`.`ROOM_ACTION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SkillZBox`.`ROOM_ACTION` ;

CREATE TABLE IF NOT EXISTS `SkillZBox`.`ROOM_ACTION` (
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action` TEXT NOT NULL,
  `room_user_uuid` VARCHAR(36) NOT NULL,
  `uuid` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `room_user_uuid_idx` (`room_user_uuid` ASC) VISIBLE,
  CONSTRAINT `room_user_uuid`
    FOREIGN KEY (`room_user_uuid`)
    REFERENCES `SkillZBox`.`ROOM_USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
