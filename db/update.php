<?php
	if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)) {
		$_POST = json_decode(file_get_contents('php://input'), true);
	}

    $id = isset($_POST['id']) ? $_POST['id'] : exit('0');
	$aufstehzeit = isset($_POST['aufstehzeit']) ? $_POST['aufstehzeit'] : exit('0');
	$schlafzeit = isset($_POST['schlafzeit']) ? $_POST['schlafzeit'] : exit('0');
	$wachzeit = isset($_POST['wachzeit']) ? $_POST['wachzeit'] : exit('0');
	$kind = isset($_POST['kind']) ? $_POST['kind'] : exit('0');
	$datum = isset($_POST['datum']) ? $_POST['datum'] : exit('0');
	

	$servername = 'localhost';
	$username = 'root';
	$password = '';
	$database = 'kinderbeobachtungen';

	$mysqli = new mysqli($servername, $username, $password, $database);

	if ($mysqli->connect_error) {
		die('Connection failed: ' . $mysqli->connect_error);
	}

	$query = '
	UPDATE daten
    SET
    aufstehzeit="'.$aufstehzeit.'",
    schlafzeit="'.$schlafzeit.'",
    wachzeit="'.$wachzeit.'",
    kind="'.$kind.'",
    datum="'.$datum.'"
    WHERE
    id='.$id.'
	';

	$mysqli->query($query);
	$mysqli->close();

?>