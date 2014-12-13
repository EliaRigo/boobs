<html>
<head>
<title>MioBlog</title>
</head>
<body>
<h1>MioBlog: realizzato in PHP e MySQL</h1>
<?php
// inclusione del file contenente la classe
include "config.php";
include "room_details.php";
// istanza della classe
$data = new MysqlClass();
// chiamata alla funzione di connessione
$mysqli_conn = $data->connetti();
if(mysqli_conn != false) {
	# estrarre risultati con il metodo mysqli_result::fetch_array
	// query argomento del metodo query()
	$query = " SELECT * FROM ROOMS ";
	// esecuzione della query
	$result = $mysqli_conn->query($query);
	// conteggio dei record restituiti dalla query
	if($result->num_rows >0)
	 {
	 // genero array strutturale
	 $rooms = array();
	 
		// generazione di un array associato
		while($row = $result->fetch_array(MYSQLI_ASSOC)) //MYSQLI_NUM $row[0]
		{
		  $room = new room_details();
		  //$name = $row['NAME'];
		  $room->init($row['NAME'],$row['FLOOR'],$row['POLO']);
		  $room->setLavagna($row['BLACKBOARD']);
		  $room->setRumore($row['NOISE']);
		  $room->setQuantita($row['ROOM_LEVEL']);
		  array_push($rooms,$room);
		}
	print_r($rooms);
	  /*
		//echo $row[0];
		echo $row['ID_ROOM'];
		echo " - ";
		echo $row['NAME'];
		echo " - ";
		echo $row['ROOM_LEVEL'];
		echo "<br />";
		*/
	  }
	// liberazione delle risorse occupate dal risultato
	$result->close();
}
// chiusura della connessione
$mysqli_conn->close();

/*
date_default_timezone_set('Europe/Rome');
$today = getdate();
$hour_gap = $today['hours']."_".($today['hours']+1);
echo $hour_gap;
echo "\n";
echo strtoupper($today['weekday'][0].$today['weekday'][1].$today['weekday'][2]);
echo "\n";
*/
?>
</body>
</html>