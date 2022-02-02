<?php
    require_once('./db-config.php');

	if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)) {
		$_POST = json_decode(file_get_contents('php://input'), true);
	}

    $id = isset($_POST['id']) ? $_POST['id'] : exit('0');

	$mysqli = new mysqli($servername, $username, $password, $database);

	if ($mysqli->connect_error) {
		die('Connection failed: ' . $mysqli->connect_error);
	}

	$query = '
	DELETE FROM daten
    WHERE
    id='.$id.'
	';

	$mysqli->query($query);
	$mysqli->close();

?>