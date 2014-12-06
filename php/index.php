<html>
<head>
<title>MioBlog</title>
</head>
<body>
<h1>MioBlog: realizzato in PHP e MySQL</h1>
<?php
// connessione a MySQL con l'estensione MySQLi
$mysqli = new mysqli("localhost", "sidavatar", "nitdevonne95", "my_sidavatar");
 
// verifica dell'avvenuta connessione
if (mysqli_connect_errno()) {
           // notifica in caso di errore
        echo "Errore in connessione al DBMS: ".mysqli_connect_error();
           // interruzione delle esecuzioni i caso di errore
        exit();
 
}
else {
           // notifica in caso di connessione attiva
        echo "Connessione avvenuta con successo";
}

echo "<br />";

# estrarre risultati con il metodo mysqli_result::fetch_array
// query argomento del metodo query()
$query = " SELECT * FROM ROOMS ";
// esecuzione della query
$result = $mysqli->query($query);
// conteggio dei record restituiti dalla query
if($result->num_rows >0)
 {
// generazione di un array numerico
  while($row = $result->fetch_array(MYSQLI_ASSOC)) //MYSQLI_NUM $row[0]
  {
	//echo $row[0];
	echo $row['ID_ROOM'];
	echo " - ";
	echo $row['NAME'];
	echo " - ";
	echo $row['ROOM_LEVEL'];
	echo "<br />";
  }
 }
 
// liberazione delle risorse occupate dal risultato
$result->close();

// chiusura della connessione
$mysqli->close();
?>
</body>
</html>