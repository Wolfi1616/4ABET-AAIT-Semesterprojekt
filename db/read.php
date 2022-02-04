<?php
require_once('./db-config.php');

$mysqli = new mysqli($servername, $username, $password, $database);

if ($mysqli->connect_error) {
    die('Connection failed: ' . $mysqli->connect_error);
}
$sql = '
SELECT
 daten.aufstehzeit,
 daten.schlafzeit,
 daten.wachzeit,
 daten.relativeWachzeit,
 daten.datum,
 kinder.name,
 daten.id
FROM daten
LEFT JOIN kinder
ON daten.kind = kinder.id
ORDER BY
daten.datum DESC,
kinder.name DESC
';

$result = $mysqli->query($sql);
//fetch_assoc --> wäre array
while ($row = $result->fetch_object()){
    $data[] = $row;
}

print json_encode($data);
$result->close();
$mysqli->close();