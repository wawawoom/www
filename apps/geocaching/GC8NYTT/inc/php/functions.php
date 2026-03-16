<?php

function create_guid() { // Create GUID (Globally Unique Identifier)
	$guid = '';
	$namespace = rand(11111, 99999);
	$uid = uniqid('', true);
	$data = $namespace;
	$data .= $_SERVER['REQUEST_TIME'];
	$data .= $_SERVER['HTTP_USER_AGENT'];
	$data .= $_SERVER['REMOTE_ADDR'];
	$data .= $_SERVER['REMOTE_PORT'];
	$hash = strtoupper(hash('ripemd128', $uid . $guid . md5($data)));
	$guid = substr($hash,  0,  8) . '-' .
			substr($hash,  8,  4) . '-' .
			substr($hash, 12,  4) . '-' .
			substr($hash, 16,  4) . '-' .
			substr($hash, 20, 12);
	return $guid;
}

function create_small_guid() {
	return substr(create_guid(), 0, 8);
}

function getNiceDuration($durationInSeconds) {

	$duration = '';
	$days = floor($durationInSeconds / 86400);
	$durationInSeconds -= $days * 86400;
	$hours = floor($durationInSeconds / 3600);
	$durationInSeconds -= $hours * 3600;
	$minutes = floor($durationInSeconds / 60);
	$seconds = $durationInSeconds - $minutes * 60;
  
	if($days > 0) {
	  $duration .= $days . ' jour' . ($days > 1 ? 's' : '');
	}
	if($hours > 0) {
	  $duration .= ' ' . $hours . ' heure' . ($hours > 1 ? 's' : '');
	}
	if($minutes > 0) {
	  $duration .= ' ' . $minutes . ' minute' . ($minutes > 1 ? 's' : '');
	}
	if($seconds > 0) {
	  $duration .= ' ' . $seconds . ' seconde' . ($seconds > 1 ? 's' : '');
	}
	return $duration;
}
?>