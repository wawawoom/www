<?php
include_once('./inc/php/config.php');
include_once('./inc/php/db.php');

$user = getUser();

if ($user !== NULL && $user->USE_CurrentStep == 7) {
	if (gotoFirstQR($user)) {
		header('Location: ./run.php');
		exit();
	}
} else {
	header('Location: ./logout.php');
	exit();
}
?>