<?php
error_reporting(E_ALL);

// get Params
$fnName = $_POST['fnName'];
$params = $_POST['params'];

$fnName($params);

// GET TASKS
function getTasks($params)
{

	include('user.class.php');
	$user = new User();
	$USE_Id = $user->getUserId($_COOKIE['USE_Email']);

	include('../../cfg/sql.php');
	$sql = mysqli_query(
		$connex,
		"SELECT * FROM 
					`tictac_tasks` 
					WHERE `TAS_USE_Id` = $USE_Id
					ORDER BY `TAS_Order`, `TAS_Id` DESC;"
	);
	$rows = array();
	while ($r = mysqli_fetch_assoc($sql)) {
		$rows[] = $r;
	}
	mysqli_free_result($sql);
	echo json_encode($rows);
}

// SEARCH TASKS
function searchTasks($params)
{

	include 'user.class.php';
	$user = new User();
	$USE_Id = $user->getUserId($_COOKIE['USE_Email']);

	include('../../cfg/sql.php');
	$TAS_Name = mysqli_real_escape_string($connex, $params['TAS_Name']);
	$sql = mysqli_query($connex, "SELECT * FROM `tictac_tasks` WHERE `TAS_Name` LIKE '%" . $TAS_Name . "%' AND `TAS_USE_ID` = " . $USE_Id . " ORDER BY `TAS_Order`, `TAS_Id` DESC;");
	$rows = array();
	while ($r = mysqli_fetch_assoc($sql)) {
		$rows[] = $r;
	}
	mysqli_free_result($sql);
	echo json_encode($rows);
}

// NEW TASK
function newTask($params)
{

	include '../../cfg/sql.php';
	include('user.class.php');

	$TAS_Name = mysqli_real_escape_string($connex, $params['TAS_Name']);
	$user = new User();
	$USE_Id = $user->getUserId($_COOKIE['USE_Email']);

	$sql = mysqli_query($connex, "
						INSERT INTO `tictac_tasks` 
						VALUES (
							NULL, 
							" . $USE_Id . ",
							'" . $TAS_Name . "',
							0
						);");
	if ($sql) {
		echo json_encode(true);
	} else {
		die('Impossible d\'exécuter la requête newTask : ' . mysqli_error($connex));
	}
}


// DELETE TASK
function deleteTask($params)
{
	include '../../cfg/sql.php';
	$TAS_Id = mysqli_real_escape_string($connex, $params['TAS_Id']);

	// TODO : BE SURE THE ID TO REMOVE IS THE PROPERTY OF THE OWNER OF THE DEMAND

	$sql = mysqli_query($connex, "DELETE FROM `tictac_tasks` WHERE `TAS_Id` = " . $TAS_Id . ";");
	if ($sql) {
		echo json_encode(true);
	} else {
		die('Impossible d\'exécuter la requête deleteTask : ' . mysqli_error($connex));
	}
}

// START CHRONO
function startChrono($params)
{
	include '../../cfg/sql.php';
	$TAS_Id = mysqli_real_escape_string($connex, $params['TAS_Id']);
	$sql = mysqli_query($connex, "
						INSERT INTO `tictac_times` 
						VALUES (
							NULL, 
							'" . $TAS_Id . "',
							CURRENT_TIMESTAMP,
							NULL,
							NULL,
							'logging'
					);");
	if ($sql) {
		echo json_encode(['TIM_Id' => mysqli_insert_id($connex)]);
	} else {
		die('Impossible d\'exécuter la requête startChrono : ' . mysqli_error($connex));
	}
}



// STOP CHRONO
function stopChrono($params)
{
	include '../../cfg/sql.php';

	// Get LAST ID
	$TAS_Id = mysqli_real_escape_string($connex, $params['TAS_Id']);
	$TIM_Comment = mysqli_real_escape_string($connex, $params['TIM_Comment']);
	$TIM_Duration = mysqli_real_escape_string($connex, $params['TIM_Duration']);
	$sql = mysqli_query($connex, "SELECT * FROM `tictac_times` WHERE `TIM_TAS_Id` = " . $TAS_Id . " ORDER BY `TIM_Id` DESC;");
	$r = mysqli_fetch_assoc($sql);
	$TIM_Id = $r['TIM_Id'];
	mysqli_free_result($sql);

	$sql = mysqli_query($connex, "
						UPDATE `tictac_times` 
						SET 
							`TIM_Duration` = " . $TIM_Duration . " ,
							`TIM_Comment` = '" . $TIM_Comment . "',
							`TIM_Status` = 'logged' 
						WHERE `TIM_Id` = " . $TIM_Id . ";");
	if ($sql) {
		echo json_encode(true);
	} else {
		die('Impossible d\'exécuter la requête stopChrono : ' . mysqli_error($connex));
	}
}



// GET TASK DETAIL
function getTaskDetail($params)
{
	include '../../cfg/sql.php';
	$TAS_Id = mysqli_real_escape_string($connex, $params['TAS_Id']);
	$sql = mysqli_query($connex, "
						SELECT * 
						FROM `tictac_times` 
						WHERE 
							`TIM_TAS_Id` = " . $TAS_Id . " AND
							`TIM_Status` = 'logged' 
							ORDER BY `TIM_Id` DESC;");
	if (!$sql) {
		die('Impossible d\'exécuter la requête getTaskDetail : ' . mysqli_error($connex));
	}

	$rows = array();
	while ($r = mysqli_fetch_assoc($sql)) {
		$rows[] = $r;
	}
	mysqli_free_result($sql);
	echo json_encode($rows);
}

// DELETE TIME
function deleteTime($params)
{
	include '../../cfg/sql.php';

	$TIM_Id = mysqli_real_escape_string($connex, $params['TIM_Id']);
	$TAS_Id = mysqli_real_escape_string($connex, $params['TAS_Id']);

	// TODO : BE SURE THE ID TO REMOVE IS THE PROPERTY OF THE OWNER OF THE DEMAND

	$sql = mysqli_query($connex, "DELETE FROM `tictac_times` WHERE `TIM_Id` = " . $TIM_Id . ";");
	if ($sql) {
		// Return new total for this task
		$sql = mysqli_query($connex, "SELECT SUM(`TIM_Duration`) AS TOTAL FROM `tictac_times` WHERE `TIM_TAS_Id` = " . $TAS_Id . ";");
		$row = mysqli_fetch_assoc($sql);
		mysqli_free_result($sql);
		echo json_encode($row);
	} else {
		die('Impossible d\'exécuter la requête deleteTime : ' . mysqli_error($connex));
	}
}


// REORDER TASKS
function orderTasks($params)
{
	include '../../cfg/sql.php';
	$liArrOrder = $params['liArrOrder'];
	$i = 1;
	foreach ($liArrOrder as $value) {
		$sql = mysqli_query($connex, "UPDATE `tictac_tasks` SET `TAS_Order` = " . $i . " WHERE `TAS_Id` = " . $value . ";");
		$i++;
	}
	echo json_encode(true);
}

// LOG USER
function login($params)
{	
	include '../../cfg/sql.php';
	include 'user.class.php';
	$USE_Email = trim($params['USE_Email']);
	$USE_Password = md5(trim($params['USE_Password']));

	$user = new User();
	$loginSuccess = $user->login($USE_Email, $USE_Password);

	echo json_encode($loginSuccess);
}


// REGISTER USER
function register($params)
{
	include 'user.class.php';
	$USE_Email = trim($params['USE_Email']);
	$USE_Password = md5(trim($params['USE_Password']));

	$user = new User();
	$registerSuccess = $user->register($USE_Email, $USE_Password);

	echo json_encode($registerSuccess);
}

?>