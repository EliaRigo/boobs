<?php
function get_json() {
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
			  $room->init($row['ID_ROOM'],$row['NAME'],$row['FLOOR'],$row['POLO']);
			  $room->setLavagna($row['BLACKBOARD']);
			  $room->setRumore($row['NOISE']);
			  //$room->setQuantita($row['ROOM_LEVEL']); 
			  $room->setQuantita(get_schedule_value($mysqli_conn,$row['ID_ROOM']));
			  array_push($rooms,$room);
			}
		//print_r($rooms);
		echo json_encode($rooms);
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
}

function get_schedule_value($mysqli_conn,$id_room){
	date_default_timezone_set('Europe/Rome');
	$today = getdate();
	if($today['hours'] >= 9 && $today['hours'] <=19) //no orario lezione, punta a domani
	    $hour_gap = $today['hours']."_".($today['hours']+1);
	else
			$hour_gap = '9_10';
	$query = " SELECT ".$hour_gap." FROM SCHEDULE WHERE ID_ROOM=".$id_room; //ADD DAY
	$result = $mysqli_conn->query($query);
	$row = $result->fetch_array(MYSQLI_NUM);
	if($row[0] != 1) { //0 NO LEZIONE - CALCOLO MEDIA
		$query_avg = " SELECT AVG(USER_LEVEL) AS AVG_AULA FROM FEEDBACK WHERE ID_ROOM=".$id_room; //ADD HOUR FEEDBACK VALIDITY
		$avg_result = ($mysqli_conn->query($query_avg));
		$avg_row = $avg_result->fetch_array(MYSQLI_NUM);
		$avg_pounder = $avg_row[0];
		if($avg_pounder != NULL) {
			return $avg_pounder * 0.8; //media * 0.8
			}
		else {
			return 0; //aula vuota
			}
	}
	else { //LEZIONE
		return -100; //accordato con Ivan
	}
	//echo "\n";
	//echo strtoupper($today['weekday'][0].$today['weekday'][1].$today['weekday'][2]);
	//echo "\n";
}
	
function insert_feedback($user_level,$blackboard,$noise,$id_room){
	// inclusione del file contenente la classe
	include "config.php";
	include "room_details.php";
	// istanza della classe
	$data_i = new MysqlClass();
	// chiamata alla funzione di connessione
	$mysqli_conn = $data_i->connetti();
	//inseriamo feedback
	$query = " INSERT INTO FEEDBACK(USER_LEVEL,BLACKBOARD,NOISE,ID_ROOM) VALUES (".$user_level.",".$blackboard.",".$noise.",".$id_room.")";
	if(($mysqli_conn->query($query))== true)
		return true;
	else
		echo false;
}

//Test function

get_json();
//insert_feedback(2,0,0,10);
?>