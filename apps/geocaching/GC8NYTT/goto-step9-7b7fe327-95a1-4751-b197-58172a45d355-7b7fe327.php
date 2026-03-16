<?php
include_once('./inc/php/config.php');
include_once('./inc/php/db.php');

$user = getUser();

if ($user !== NULL) {
	$fingerPrint = md5($_SERVER['HTTP_USER_AGENT'].$_SERVER['HTTP_ACCEPT_LANGUAGE'].$_COOKIE['GC8NYTT']);
	if (gotoSecondQR($user, $fingerPrint)) {
		$cookieValue = md5($_SERVER['HTTP_USER_AGENT'].$_SERVER['HTTP_ACCEPT_LANGUAGE'].$_COOKIE['GC8NYTT']);
		setcookie("GC8NYTT_QRBAS", $cookieValue, time() + 3600 * $HOURS_TO_SCAN_QRCODE_B, '/');
		header('Location: ./run.php');
		exit();
	}
} else {
	header('Location: ./logout.php');
	exit();
}
?>