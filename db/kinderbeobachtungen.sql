  DROP DATABASE IF EXISTS `kinderbeobachtungen`;
  COMMIT;
  CREATE DATABASE `kinderbeobachtungen` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  COMMIT;
  USE `kinderbeobachtungen`;

  CREATE TABLE `daten` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `aufstehzeit` time NOT NULL,
    `schlafzeit` time NOT NULL,
    `wachzeit` time NOT NULL,
    `kind` int(11) DEFAULT NULL,
    `datum` date NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

  CREATE TABLE `kinder` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

  ALTER TABLE `daten`
    ADD CONSTRAINT `FK_daten_1`
    FOREIGN KEY (`kind`)
    REFERENCES `kinder` (`id`)
    ON UPDATE CASCADE
    ON DELETE SET NULL;

  COMMIT;

  INSERT INTO `kinder` (`id`, `name`) VALUES
  (1, 'Lena'),
  (2, 'Isabella');

  INSERT INTO `daten` (`id`, `aufstehzeit`, `schlafzeit`, `wachzeit`, `kind`, `datum`) VALUES
  (1, 08 , 12, 4 , 1, '2022-01-26'),
  (2, 08, 12, 4, 2, '2022-01-26');

  COMMIT;  