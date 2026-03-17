<?php

$source = 'http://geocheck.org/geocheck_large.php?gid=63851372697e913-49f8-4716-956b-8133de59b4cd';

header('Content-Type: image/jpeg');
if (isset($_GET['getURL']) && $_GET['getURL'] === 'true') {
	$source = 'http://geocheck.org/geocheck_small.php?gid=63851372697e913-49f8-4716-956b-8133de59b4cd';
	header('Checker: http://geocheck.org/geo_inputchkcoord.php?gid=63851372697e913-49f8-4716-956b-8133de59b4cd');
}
$image = imagecreatefromstring(file_get_contents($source));

imagejpeg($image);
imagedestroy($image);
?>