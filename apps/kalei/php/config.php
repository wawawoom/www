<?php
include_once (__DIR__ . '/../../cfg/config.php');

$cfg = Config::getConfig();

error_reporting(E_ALL);

$ROOT_URL = $cfg['KALEI_ROOT_URL'];
$VERSION = $cfg['KALEI_VERSION'];
$FACEBOOK_APP_ID = $cfg['KALEI_FACEBOOK_APP_ID'];
$FACEBOOK_SECRET = $cfg['KALEI_FACEBOOK_SECRET'];