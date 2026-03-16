<?php

function loog ($insertText) {
	$myFile = "../log.txt";
	$fh = fopen($myFile, 'a+') or die("can't open file");
	$stringData = $insertText;
	fwrite($fh, $stringData."\r\n");
	fclose($fh);	
}

?>