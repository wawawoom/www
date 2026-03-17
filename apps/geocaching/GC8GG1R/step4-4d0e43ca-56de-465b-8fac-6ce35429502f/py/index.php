<?php include '../php/global.php'; ?>
<?php include '../php/inc.php'; ?>
<?php include "phpqrcode/qrlib.php"; ?>

<?php
$maxSeconds = 3;

function encrypt_decrypt($action, $string) {
	$output = false;
	$encrypt_method = "AES-256-CBC";
	$secret_key = 'ttGwe42zFu3cVezGPZiqAeRCWWRAJLHy';
	$secret_iv = 'FB2A12FE3DBEADAE';
	// hash
	$key = hash('sha256', $secret_key);

	// iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
	$iv = substr(hash('sha256', $secret_iv), 0, 16);
	if ( $action == 'encrypt' ) {
		$output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
		$output = base64_encode($output);
	} else if( $action == 'decrypt' ) {
		$output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
	}
	return $output;
}


function displayQrCode ($message) {
	
	$QR_DIR = dirname(__FILE__).'/qr/';
	$GC_LOGO = dirname(__FILE__).'/logoGC.png';
	$GC_LOGO_W = 42;
	$QR_FILENAME = substr(guidv4(), 0, 8) . '.png';
	$QR_MESSAGE = $message;
	
	$QR_PATH = $QR_DIR.$QR_FILENAME;

	if (!file_exists($QR_DIR)) {
		mkdir($QR_DIR);
	}

	// Generates the QR code
	QRcode::png(
		$QR_MESSAGE, 
		$QR_PATH, 
		'H', 
		6, 
		2
	);

	list($W, $H) = getimagesize($QR_PATH);
	
	// Put GC logo in QR code
	$QR_RES = imagecreatefrompng ( $QR_PATH );
	$GC_LOGO_RES = imagecreatefrompng ( $GC_LOGO );

	imagecopymerge(
		$QR_RES, 
		$GC_LOGO_RES, 
		($W/2) - ($GC_LOGO_W/2), 
		($H/2) - ($GC_LOGO_W/2), 
		0, 
		0, 
		$GC_LOGO_W, 
		$GC_LOGO_W, 
		100
	);

	// Save the image to a file
	imagepng($QR_RES, $QR_PATH);
	
	// Remove QR markers
	$QR_RES = imagecreatefrompng ( $QR_PATH );
	$WHITE = imagecolorallocate ( $QR_RES, 255, 255, 255 );
	imagefilledrectangle($QR_RES, 0, 0, 55, 55, $WHITE);
	imagefilledrectangle($QR_RES, $W-55, 0, $W, 55, $WHITE);
	imagefilledrectangle($QR_RES, 0, $H-55, 55, $H, $WHITE);
	imagepng($QR_RES, $QR_PATH);
	imagedestroy($QR_RES);
	
	// Display image
	echo '<img id="qr-image" src="step4-4d0e43ca-56de-465b-8fac-6ce35429502f/qr/'.$QR_FILENAME.'" />';
}

function displayMessage($message = '', $type = 'error') {
	if ($type === 'success') {
		echo '<div class="result success">';
		echo 'Well done ! Flag is <span class="badge badge-light text-monospace" style="font-size: 15px;">' . $message . '</span>';
		echo '</div>';
	} else {
		echo '<div class="result error">' . $message . '</div>';
	}
}
?>

<!doctype html>
<html lang="en">
	<head>
		<?php include('../php/meta.php'); ?>
		<title>Step 4 - GC8GG1R - Capture the Flag</title>
	</head>
	<body>
		<div class="main">
			<div class="left-col" style="background-image: url(img/4.jpg);">
				<a class="left-col-back-to-home" href=".">&lt; Back to home</a>
				<div class="left-col-number">- IV -</div>
				<div class="left-col-title">
					<div style="font-size: 244px; line-height: 184px;">QR</div>
					<div style="font-size: 88px; text-align: right; line-height: 50px; margin-bottom: 40px;">code</div>
				</div>
				<div class="left-col-desc">
					Impressively, QR codes have an error correction capability of up to 30%. This means that even if the QR code sustains some damage, a scanner can still decode it. Some brands are using this feature to their advantage by inserting their logo or other small marketing images directly into the QR code: the code can still be read, and the logo serves as a clever way identify codes.
					<div style="text-align:center; margin: 20px 0;">
						<a href="<?php echo $steps[4]->getWiki(); ?>" target="_blank">
							<img src="img/wiki.png" />
						</a>
					</div>
				</div>
				<div class="left-col-instructions">
					🏁 YOUR MISSION 🏁<br />
					You have <?php echo $maxSeconds; ?> seconds to scan the QR code, and submit the message. If you're fast enough, the server will give you the Flag. (And before you ask, yes the Qr code is malformed. Find a way to rebuild it, scan it and submit the message fast enough.)
				</div>
			</div>
			<div class="right-col">
				<div class="right-col-content" style="text-align: center;">
					
					<?php
					$flagCaptured = false;

					if (
						isset($_POST['submit']) && 
						$_POST['submit'] === "Submit" && 
						isset($_POST['qr']) && 
						$_POST['qr'] !== ""
					) {
						
						$decryptMessage = encrypt_decrypt('decrypt', $_POST['qr']);
						
						if (!empty($decryptMessage)) {
							
							$decryptMessage = intval($decryptMessage);
							if (
								$decryptMessage > 0 && 
								time() - $decryptMessage < $maxSeconds) {
									$flagCaptured = true;
									displayMessage($steps[4]->getFlag(), 'success');
							}
							else {
								displayMessage('Too late :( Try again.', 'error');
								displayQrCode(encrypt_decrypt('encrypt', time()));
							}
						}
						else {
							displayMessage('Are you sure you scanned the QR code ?', 'error');
							displayQrCode(encrypt_decrypt('encrypt', time()));
						}
					}
					else {
						displayQrCode(encrypt_decrypt('encrypt', time()));
					}
					?>
					


					<?php
					if (!$flagCaptured) {
						?>

						<hr/>

						<form action="" method="post">
							<div class="form-group">
								<input 
									name="qr" 
									class="form-control" 
									id="qr" 
									type="text"
									placeholder="Enter the QR code message here"
									autocomplete="off" />
							</div>
							
							<div class="form-group mt-5">
								<input type="submit" name="submit" class="btn btn-danger" value="Submit" />
							</div>

						</form>

						<?php
					}
					?>
				</div>
			</div>
		</div>
		<?php include('../php/js.php'); ?>
		<?php 
		echo '<img style="display: none;" src="http://www.wawawoom.fr/geocaching/analytics/analytics.php?url='.'http://'. $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'].'&amp;name=Capture%20the%20Flag%20-%20Step%204" />';
		?>
	</body>
</html>