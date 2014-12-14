<?php
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

if (isset($_POST['param1']) &&
	isset($_POST['param2']) &&
	isset($_POST['param3']) &&
	isset($_POST['param4'])
	) {
        echo insert_feedback($_POST['param1'],$_POST['param2'],$_POST['param3'],$_POST['param4']);
    }
?>