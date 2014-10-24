<?php
# apt-get install apache2 php5 php5-json mysql-server
# user beerlist/beerlist in mysql on database beerlist
$mysqli = new mysqli('localhost', 'beerlist', 'beerlist', 'beerlist');

/*
 * Ceci est le style POO "officiel"
 * MAIS $connect_error était erroné jusqu'en PHP 5.2.9 et 5.3.0.
 */
if ($mysqli->connect_error) {
    die('Erreur de connexion (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}
#else { echo 'OK';}

# Basic security
// Beer query
$_GET['q'] = $mysqli->real_escape_string($_GET['q']);

//if ($_GET['q'] == NULL) { $_GET['q']='Guinness'; }

if ($_GET['q'] != NULL)
 {
        $sql = 'SELECT * FROM Beers WHERE Beername LIKE \'%'.$_GET['q'].'%\' AND Enabled="1" LIMIT 10';
        #echo $sql;
        $result = $mysqli->query($sql);
        $json_table = array();
        echo $_GET['callback'].'(';
        while ($row = $result->fetch_assoc()) {
                #printf ("%s (%s)\n<br />", $row["B"], $row["A"]);
                #echo json_encode($row);
                $json_table[] = $row;
                #echo '<br />';
                }
        echo json_encode($json_table);
        #printf json_encode($result);
        echo ')';
 }

$mysqli->close();
?>


