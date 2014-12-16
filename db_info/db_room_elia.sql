-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema my_sidavatar
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema my_sidavatar
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `my_sidavatar` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `my_sidavatar` ;

-- -----------------------------------------------------
-- Table `my_sidavatar`.`SCHEDULE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_sidavatar`.`SCHEDULE` (
  `ID_SCHEDULE` INT NOT NULL AUTO_INCREMENT,
  `ID_ROOM` INT NOT NULL,
  `DAY` VARCHAR(3) NULL,
  `9-10` TINYINT(1) NOT NULL,
  `10-11` TINYINT(1) NOT NULL,
  `11-12` TINYINT(1) NOT NULL,
  `12-13` TINYINT(1) NOT NULL,
  `13-14` TINYINT(1) NOT NULL,
  `14-15` TINYINT(1) NOT NULL,
  `15-16` TINYINT(1) NOT NULL,
  `16-17` TINYINT(1) NOT NULL,
  `17-18` TINYINT(1) NOT NULL,
  `18-19` TINYINT(1) NOT NULL,
  `19-20` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ID_SCHEDULE`,`ID_ROOM`),
  INDEX `fk_FEEDBACK_ROOMS_idx` (`ID_ROOM` ASC),
  CONSTRAINT `fk_FEEDBACK_ROOMS_idx`
  FOREIGN KEY (`ID_ROOM`)
  REFERENCES `my_sidavatar`.`ROOMS` (`ID_ROOM`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_sidavatar`.`ROOMS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_sidavatar`.`ROOMS` (
  `ID_ROOM` INT NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(10) NOT NULL,
  `ROOM_LEVEL` INT NOT NULL DEFAULT 0,
  PRIMARY KEY(`ID_ROOM`))
  -- `ID_SCHEDULE` INT NOT NULL,
  -- PRIMARY KEY (`ID_ROOM`, `ID_SCHEDULE`),
  -- INDEX `fk_ROOMS_SCHEDULE_idx` (`ID_SCHEDULE` ASC),
  -- CONSTRAINT `fk_ROOMS_SCHEDULE`
  --  FOREIGN KEY (`ID_SCHEDULE`)
  --  REFERENCES `my_sidavatar`.`SCHEDULE` (`ID_SCHEDULE`)
  --  ON DELETE NO ACTION
  --  ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_sidavatar`.`FEEDBACK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_sidavatar`.`FEEDBACK` (
  `ID_FEEDBACK` INT NOT NULL AUTO_INCREMENT,
  `USER_LEVEL` INT NOT NULL,
  `NICKNAME` VARCHAR(10) NULL,
  `COMMENT` VARCHAR(140) NULL,
  `ID_ROOM` INT NOT NULL,
  PRIMARY KEY (`ID_FEEDBACK`, `ID_ROOM`),
  INDEX `fk_FEEDBACK_ROOMS_idx` (`ID_ROOM` ASC),
  CONSTRAINT `fk_FEEDBACK_ROOMS`
    FOREIGN KEY (`ID_ROOM`)
    REFERENCES `my_sidavatar`.`ROOMS` (`ID_ROOM`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
