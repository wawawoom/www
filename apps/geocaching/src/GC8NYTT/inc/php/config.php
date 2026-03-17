<?php
$COOKIE_SEPARATOR = '___';
$MINUTES_AVAILABLE_MESSAGE = 2;
$HOURS_TO_SCAN_QRCODE_B = 6;
$TIME_STEP = '04:00:00';
$QR_BAS_COORDS = 'N43° 51.608 E7° 12.239';
$QR_BAS_COORDS_DEC = '43.860133,7.203983';  // Coord du QR !
$QR_HAUT_COORDS = 'N43° 52.241 E 7° 16.386';
$QR_HAUT_COORDS_DEC = '43.870683,7.273100';  // Coord du QR !
$QR_RADIUS_VALIDITY = 100;  // METERS
$SHOW_QR_CODES_RUN = false;
$QRCODE_BAS_URL = 'https://bit.ly/3cwcMzU';
$QRCODE_HAUT_URL = 'https://bit.ly/2SjuMWJ';
$COORDS_FINAL = 'N43° 51.575 E7° 13.648';

$URL_TO_FIND = array(
	'www',
	'wawawoom.fr/',
	'geocaching/',
	'GC8NYTT/',
	'goto-step8-',
	'996efd7a-1915-4897-',
	'b278-692777080881.php'
);

$NEXT_URLS = array(
	'goto-step2-36281200-0289-45d0-b8e6-afa7d1fc0207.php',
	'goto-step3-3f8fdcda-7812-4960-8fe0-0a4c220459a5.php',
	'goto-step4-4fb3bd4e-d28c-4c5a-9f74-cbadc65de630.php',
	'goto-step5-bf27cd2a-68d4-477f-96c1-e3c7e4a89d43.php',
	'goto-step6-29d6a9ca-9bf3-45ef-88c1-6dc156bc7312.php',
	'goto-step7-8f87ac9a-6851-4d37-9d17-44f39572bed3.php',
	''
);

class Step
{
	public $id;
	public $nextUrl;
	public $qrCodeMessage;

	public function __construct($id, $nextUrl, $qrCodeMessage)
	{
		$this->id = $id;
		$this->nextUrl = $nextUrl;
		$this->qrCodeMessage = $qrCodeMessage;
	}

	public function getIndex()
	{
		return $this->id;
	}

	public function getNextUrl()
	{
		return $this->nextUrl;
	}

	public function getQRCodeMessage()
	{
		return $this->qrCodeMessage;
	}
}

$STEPS = [];

for ($i = 0; $i < sizeof($URL_TO_FIND); $i++) {
	$STEPS[] = new Step(
		$i + 1,
		$NEXT_URLS[$i],
		$URL_TO_FIND[$i]
	);
}
?>