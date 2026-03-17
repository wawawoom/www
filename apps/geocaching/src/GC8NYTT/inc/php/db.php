<?php
//TODO: remove logs
include_once('config.php');

function connectToDb() {

	$HOST 		= 'wawawoom123.mysql.db';
	$DATABASE 	= 'wawawoom123';
	$USER 		= 'wawawoom123';
	$PASSWORD 	= '4HZIpSO7';

	$connex = new mysqli($HOST, $USER, $PASSWORD, $DATABASE);
	//$connex = new mysqli('mysql51-56.perso', 'wawawoom123', '4HZIpSO7', 'wawawoom123');
	if($connex->connect_errno > 0) {
		die('Unable to connect to database [' . $connex->connect_error . ']');
	}

	return $connex;
}

function getUserFromCookies($guid, $pseudo) {

	$conn = connectToDb();
	$guid = $conn->real_escape_string($guid);
	$pseudo = $conn->real_escape_string($pseudo);

	$query = "SELECT * FROM `cauchemar_users` WHERE `USE_GUID` = '$guid' AND `USE_Pseudo` = '$pseudo'";

	$result = mysqli_query($conn, $query); 
	
	if ($result) { 
		$user = mysqli_fetch_object($result);
		mysqli_free_result($result); 
		mysqli_close($conn);
		
		if ($user !== NULL) {
			return $user;
		}
		return NULL;
	} 
	
	mysqli_close($conn); 
	return NULL;
}

function insertUser($guid, $pseudo) {

	global $TIME_STEP;

	$conn = connectToDb();
	$guid = $conn->real_escape_string($guid);
	$pseudo = $conn->real_escape_string($pseudo);
	$currentStep = 1;

	$nowTime = (int)date("His");
	$stepTime = (int)str_replace(':', '', $TIME_STEP);
	$tomorrow = '';
	if ($nowTime - $stepTime > 0) {
		$tomorrow = 'tomorrow';
	}
	$date = new DateTime($tomorrow);
	$nextDateTime = $date->format('Y-m-d') . ' ' . $TIME_STEP;
	file_put_contents('looogs.txt', $nextDateTime.PHP_EOL , FILE_APPEND | LOCK_EX);

	$query = "
		INSERT INTO 
			`cauchemar_users` 
			(
				`USE_ID`, 
				`USE_GUID`,
				`USE_Pseudo`,
				`USE_NextActionDateTime`,
				`USE_CurrentStep`
			) 
		VALUES 
			(
				NULL, 
				'$guid',
				'$pseudo',
				'$nextDateTime',
				$currentStep
			)
		;
	";

	$result = mysqli_query($conn, $query);
	mysqli_close($conn); 
	return true;
}

function loginUser($guid, $pseudo) {

	$conn = connectToDb();
	$guid = $conn->real_escape_string($guid);
	$query = "SELECT * FROM `cauchemar_users` WHERE `USE_GUID` = '$guid' AND `USE_Pseudo` = '$pseudo'";

	$result = mysqli_query($conn, $query); 

	if ($result) { 
		$count = mysqli_num_rows($result);
		mysqli_free_result($result); 
		mysqli_close($conn);
		
		if ($count > 0) {
			return true;
		}
		return false;
	} 
	
	mysqli_close($conn); 
	return false;
}

function getUser() {
	if (isset($_COOKIE['GC8NYTT']) && $_COOKIE['GC8NYTT'] !== '') {
		
		global $COOKIE_SEPARATOR;

		$cookie = explode($COOKIE_SEPARATOR, $_COOKIE['GC8NYTT']);

		$guid = $cookie[0];
		$pseudo = $cookie[1];

		if ($guid !== '' && $pseudo !== '') {
			
			$user = getUserFromCookies($guid, $pseudo);

			if ($user !== NULL) {
				return $user;
			}
		}
		return NULL;
	}
	else {
		return NULL;
	}
}

function gotoNextStep($user, $stepIndex) {

	global $TIME_STEP;

	$conn = connectToDb();
	$nextStepIndex = $stepIndex;
	$USE_GUID = $user->USE_GUID;
	$USE_Pseudo = $user->USE_Pseudo;

	$date = new DateTime('tomorrow');
	$nextActionDateTime = $date->format('Y-m-d') . ' ' . $TIME_STEP;

	file_put_contents('looogs.txt', $nextActionDateTime.PHP_EOL , FILE_APPEND | LOCK_EX);

	$query = "
		UPDATE `cauchemar_users` 
		SET 
			`USE_CurrentStep` = $nextStepIndex,
			`USE_NextActionDateTime` = '$nextActionDateTime'
		WHERE 
			`cauchemar_users`.`USE_GUID` = '$USE_GUID' AND
			`cauchemar_users`.`USE_pseudo` = '$USE_Pseudo'
		;
	";

	file_put_contents('looogs.txt', $query.PHP_EOL , FILE_APPEND | LOCK_EX);

	mysqli_query($conn, $query); 
	mysqli_close($conn); 
	
	return true;
}

function gotoFirstQR ($user) {

	$conn = connectToDb();
	$nextStepIndex = 8;
	$USE_GUID = $user->USE_GUID;
	$USE_Pseudo = $user->USE_Pseudo;

	$query = "
		UPDATE `cauchemar_users` 
		SET 
			`USE_CurrentStep` = $nextStepIndex,
			`USE_NextActionDateTime` = NULL
		WHERE 
			`cauchemar_users`.`USE_GUID` = '$USE_GUID' AND
			`cauchemar_users`.`USE_pseudo` = '$USE_Pseudo'
		;
	";

	file_put_contents('looogs.txt', $query.PHP_EOL , FILE_APPEND | LOCK_EX);

	mysqli_query($conn, $query); 
	mysqli_close($conn); 
	
	return true;
}

function gotoSecondQR ($user, $fingerprint) {

	global $HOURS_TO_SCAN_QRCODE_B;

	$conn = connectToDb();
	$nextStepIndex = $user->USE_CurrentStep + 1;
	$USE_GUID = $user->USE_GUID;
	$USE_Pseudo = $user->USE_Pseudo;
	$USE_Fingerprint = $fingerprint;

	$date = new DateTime();
	date_add($date, date_interval_create_from_date_string($HOURS_TO_SCAN_QRCODE_B . ' hours'));
	$USE_NextActionDateTime = date_format($date, 'Y-m-d H:i:s');

	$query = "
		UPDATE `cauchemar_users` 
		SET 
			`USE_CurrentStep` = $nextStepIndex,
			`USE_NextActionDateTime` = '$USE_NextActionDateTime',
			`USE_Fingerprint` = '$USE_Fingerprint'
		WHERE 
			`cauchemar_users`.`USE_GUID` = '$USE_GUID' AND
			`cauchemar_users`.`USE_pseudo` = '$USE_Pseudo'
		;
	";

	file_put_contents('looogs.txt', $query.PHP_EOL , FILE_APPEND | LOCK_EX);

	mysqli_query($conn, $query); 
	mysqli_close($conn); 
	
	return true;
}

function gotoFinal ($user) {

	global $HOURS_TO_SCAN_QRCODE_B;

	$conn = connectToDb();
	$nextStepIndex = $user->USE_CurrentStep + 1;
	$USE_GUID = $user->USE_GUID;
	$USE_Pseudo = $user->USE_Pseudo;

	$query = "
		UPDATE `cauchemar_users` 
		SET 
			`USE_CurrentStep` = $nextStepIndex,
			`USE_NextActionDateTime` = '',
			`USE_Fingerprint` = ''
		WHERE 
			`cauchemar_users`.`USE_GUID` = '$USE_GUID' AND
			`cauchemar_users`.`USE_pseudo` = '$USE_Pseudo'
		;
	";

	file_put_contents('looogs.txt', $query.PHP_EOL , FILE_APPEND | LOCK_EX);

	mysqli_query($conn, $query); 
	mysqli_close($conn); 
	
	return true;
}

?>
