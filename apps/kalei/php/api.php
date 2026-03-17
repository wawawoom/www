<?php
// Définir le header JSON au début
header('Content-Type: application/json');

// get Params
$fnName = $_POST['fnName'];
$params = $_POST['params'];

$fnName($params);

// HACK ATTEMPT
function hackAttempt()
{
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	return json_encode(
		[
			'message' => 'HACK ATTEMPT'
		]
	);
}

function save($params)
{
	include ('ajaxauth.php');

	if (checkauth()) {
		include ('kalei_class.php');
		$kalei = new Kalei();
		echo $kalei->save($params);
	} else {
		include ('utils.php');
		logIt('Tentative de hack');
		echo hackAttempt();
	}
}

function checkUser($params)
{
	include ('kalei_class.php');
	$kalei = new Kalei();
	echo $kalei->checkUser($params);
}

function removeKalei($params)
{
	include ('ajaxauth.php');

	if (checkauth()) {
		include ('kalei_class.php');
		$kalei = new Kalei();
		echo $kalei->removeKalei($params);
	} else {
		include ('utils.php');
		logIt('Tentative de hack');
		echo hackAttempt();
	}
}

function likeKalei($params)
{
	include ('ajaxauth.php');

	if (checkauth()) {
		include ('kalei_class.php');
		$kalei = new Kalei();
		echo $kalei->likeKalei($params);
	} else {
		include ('utils.php');
		logIt('Tentative de hack');
		echo hackAttempt();
	}
}

function loadKalei($params)
{
	include ('kalei_class.php');
	$kalei = new Kalei();
	echo $kalei->loadKalei($params);
}

function getCurrentUserLikeKalei($params)
{
	include ('kalei_class.php');
	$kalei = new Kalei();
	echo $kalei->doesUserLikesKalei($params);
}

?>