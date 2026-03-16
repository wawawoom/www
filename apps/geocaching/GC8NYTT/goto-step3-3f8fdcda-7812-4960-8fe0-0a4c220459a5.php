<?php
include_once('./inc/php/config.php');
include_once('./inc/php/db.php');

$user = getUser();

if ($user !== NULL) {
	if (gotoNextStep($user, 3)) {
		header('Location: ./sleep.php');
		exit();
	}
} else {
	header('Location: ./logout.php');
	exit();
}
?>