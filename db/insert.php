<?php

	$aufstehzeit = isset($_POST['aufstehzeit']) ? $_POST['aufstehzeit'] : exit('0');
	$schlafzeit = isset($_POST['schlafzeit']) ? $_POST['schlafzeit'] : exit('0');
	$wachzeit = isset($_POST['wachzeit']) ? $_POST['wachzeit'] : exit('0');
	$kind = isset($_POST['name']) ? $_POST['name'] : exit('0');
	$datum = isset($_POST['datum']) ? $_POST['datum'] : exit('0');

	$servername = 'localhost';
	$username = 'root';
	$password = '';
	$database = 'kinderbeobachtungen';

	$mysqli = new mysqli($servername, $username, $password, $database);

	if ($mysqli->connect_error) {
		die('Connection failed: ' . $mysqli->connect_error);
	} else {
		echo 'Connected successfully';
	}

	$query = '
	INSERT INTO daten
	(aufstehzeit, schlafzeit, wachzeit, kind, datum)
	VALUES
	("'.$aufstehzeit.'",
    "'.$schlafzeit.'",
    "'.$wachzeit.'",
    "'.$kind.'",
    "'.$datum.'");
	';

	$mysqli->query($query);

?>