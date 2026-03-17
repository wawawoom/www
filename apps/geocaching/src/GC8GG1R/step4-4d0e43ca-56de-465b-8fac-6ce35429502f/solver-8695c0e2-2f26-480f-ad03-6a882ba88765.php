<?php
error_reporting(E_ALL ^ E_WARNING);

$url = 'http://wawawoom.fr/geocaching/GC8GG1R/step4-4d0e43ca-56de-465b-8fac-6ce35429502f/';
$html = file_get_contents($url);

if ( $html !== false ) {

	$doc = new DOMDocument();
	$doc->loadHTML($html);
	$imageTags = $doc->getElementsByTagName('img');

	$qr_url = 'http://wawawoom.fr/geocaching/GC8GG1R/' . $imageTags[1]->getAttribute('src');
	copy($qr_url, './solve.png');

	// Put the QR CODE MARKERS in image
	list($W, $H) = getimagesize( './solve.png' );
	$QR_RES = imagecreatefrompng ( './solve.png' );
	$SQUARES = imagecreatefrompng ( './square.png' );

	imagecopymerge(
		$QR_RES, 
		$SQUARES, 
		0, 
		0, 
		0, 
		0, 
		$W, 
		$H, 
		50
	);

	// Save the image to a file
	imagepng($QR_RES, './solve.png');

	// echo '<img src="http://wawawoom.fr/geocaching/GC8GG1R/step4-4d0e43ca-56de-465b-8fac-6ce35429502f/solve.png" />';

	$url2 = 'https://zxing.org/w/decode?u=http%3A%2F%2Fwawawoom.fr%2Fgeocaching%2FGC8GG1R%2Fstep4-4d0e43ca-56de-465b-8fac-6ce35429502f%2Fsolve.png';
	$html2 = file_get_contents($url2);

	$doc = new DOMDocument();
	$doc->loadHTML($html2);
	$preTags = $doc->getElementsByTagName('pre');
	
	// Message hidden in the reconstitued QR CODE
	$message = $preTags[0]->nodeValue;

	//echo $message;

	$url3 = 'http://wawawoom.fr/geocaching/GC8GG1R/step4-4d0e43ca-56de-465b-8fac-6ce35429502f/';
	$data = array('submit' => 'Submit', 'qr' => $message);

	// use key 'http' even if you send the request to https://...
	$options = array(
		'http' => array(
			'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'POST',
			'content' => http_build_query($data)
		)
	);
	$context = stream_context_create($options);
	$result = file_get_contents($url, false, $context);

	echo $result;
	
}
?>