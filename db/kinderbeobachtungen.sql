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
    `relativeWachzeit` varchar(7) NOT NULL,
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

  INSERT INTO `daten` (`id`, `aufstehzeit`, `schlafzeit`, `wachzeit`, `relativeWachzeit`, `kind`, `datum`) VALUES
  (1, '07:00:00', '18:00:00', '11:00:00', '45.83%', 2, '2022-02-04'),
  (2, '07:00:00', '18:00:00', '11:00:00', '45.83%', 1, '2022-02-04');

  COMMIT;  