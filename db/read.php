<?php
require_once('./db-config.php');

$mysqli = new mysqli($servername, $username, $password, $database);

if ($mysqli->connect_error) {
    die('Connection failed: ' . $mysqli->connect_error);
}
$query = '
SELECT
 daten.aufstehzeit,
 daten.schlafzeit,
 daten.wachzeit,
 daten.datum,
 kinder.name,
 daten.id
FROM daten
LEFT JOIN kinder
ON daten.kind = kinder.id
ORDER BY
daten.datum DESC
';

$result = $mysqli->query($query);
//fetch_assoc --> wäre array
while ($row = $result->fetch_object()){
    $user_arr[] = $row;
   // print_r($row);
}
print json_encode($user_arr);

//print_r($user_arr);
$result->close();
$mysqli->close();