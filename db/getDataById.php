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
$sql = '
SELECT
 *
FROM daten
WHERE
    daten.id = "'.$id.'"
';

if ($result = $mysqli->query($sql)) {

    $json = json_encode($result->fetch_assoc());		
} else {
    errorMsg('SQL-Fehler '.$mysqli->errno.': '.$mysqli->error);
}

$mysqli->query($sql);
$mysqli->close();

echo $json;