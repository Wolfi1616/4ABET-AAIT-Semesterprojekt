<?php
/*
$aufstehzeit = isset($_POST['aufstehzeit']) ? $_POST['aufstehzeit'] : exit('0');
$schlafzeit = isset($_POST['schlafzeit']) ? $_POST['schlafzeit'] : exit('0');
$wachzeit = isset($_POST['wachzeit']) ? $_POST['wachzeit'] : exit('0');
$kind = isset($_POST['kind']) ? $_POST['kind'] : exit('0');
$datum = isset($_POST['datum']) ? $_POST['datum'] : exit('0');
*/
$servername = 'localhost';
$username = 'root';
$password = '';
$database = 'kinderbeobachtungen';

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

$result->close();
//print_r($user_arr);

$mysqli->close();

return $user_arr;