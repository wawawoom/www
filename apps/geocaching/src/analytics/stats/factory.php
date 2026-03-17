<?php
function getAllDatas()
{
	// Utiliser le fichier de configuration SQL
	include (__DIR__ . '/../../../cfg/sql.php');

	if (!$connex) {
		header('Content-Type: application/json');
		echo json_encode(['error' => 'Database connection failed']);
		return;
	}

	$json = array();
	$query = 'SELECT * FROM `stats` ORDER BY `STA_ID` DESC';
	$result = mysqli_query($connex, $query);

	if ($result) {
		while ($row = mysqli_fetch_assoc($result)) {
			$json[] = $row;
		}
		mysqli_free_result($result);
	}

	header('Content-Type: application/json');
	echo json_encode($json);
}

getAllDatas();
?>