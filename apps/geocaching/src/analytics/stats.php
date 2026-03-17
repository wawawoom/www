<?php
function saveToDB($obj)
{
	$connex = new mysqli('mysql51-56.perso', 'wawawoom123', '4HZIpSO7', 'wawawoom123');

	if ($connex->connect_errno > 0) {
		die('Unable to connect to database [' . $connex->connect_error . ']');
	}

	$query = "
		INSERT INTO 
			`stats` 
			(
				`STA_ID`, 
				`STA_Referer`, 
				`STA_DomainName`, 
				`STA_Timestamp`,
				`STA_IP`
			) 
		VALUES 
			(
				NULL, 
				'$obj->STA_Referer', 
				'$obj->STA_DomainName',\t
				CURRENT_TIMESTAMP,
				'$obj->STA_IP'
			)
		;
	";

	$query = mysqli_query($connex, $query);
	mysqli_close($connex);
}
?>

Hello World