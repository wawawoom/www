<?php include '../php/global.php'; ?>
<?php include '../php/inc.php'; ?>

<?php

/*

GET		: 1 => 01000110 01101100 01100001 01100111
PUT		: 2 => 01011111 01101001 01110011 00111010
POST	: 3 => 01010111 00110000 01110010 00110001
HEAD	: 4 => 01100100 01010111 00110001 01100100
DELETE	: 5 => 00110011 01010111 01000101 01100010
CONNECT	: 6 => 01011111 01010000 01110010 00110000
OPTIONS	: 7 => 01001010 00110011 01100011 01110100
LINK	: 8 => 01011111 01001001 01101110 01011111
PATCH	: 9 => 00110001 00111001 00111000 00111001

01000110 01101100 01100001 01100111 01011111 01101001 01110011 00111010 01010111 00110000 01110010 00110001 01100100 01010111 00110001 01100100 00110011 01010111 01000101 01100010 01011111 01010000 01110010 00110000 01001010 00110011 01100011 01110100 01011111 01001001 01101110 01011111 00110001 00111001 00111000 00111001
*/

$output = array ();

if ($_SERVER['REQUEST_METHOD'] === "GET") { 
	$output[] = "1";
	$output[] = $_SERVER['REQUEST_METHOD'];
	$output[] = "01000110 01101100 01100001 01100111";
}
else if ($_SERVER['REQUEST_METHOD'] === "PUT") { 
	$output[] = "2";
	$output[] = $_SERVER['REQUEST_METHOD'];
	$output[] = "01011111 01101001 01110011 00111010";
}
else if ($_SERVER['REQUEST_METHOD'] === "POST") { 
	$output[] = "3";
	$output[] = $_SERVER['REQUEST_METHOD'];
	$output[] = "01010111 00110000 01110010 00110001";
}
else if ($_SERVER['REQUEST_METHOD'] === "DELETE") { 
	$output[] = "4";
	$output[] = $_SERVER['REQUEST_METHOD'];
	$output[] = "01100100 01010111 00110001 01100100";
}
else if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") { 
	$output[] = "5";
	$output[] = $_SERVER['REQUEST_METHOD'];
	$output[] = "00110011 01010111 01000101 01100010";
}
else if ($_SERVER['REQUEST_METHOD'] === "PATCH") { 
	$output[] = "6";
	$output[] = $_SERVER['REQUEST_METHOD'];
	$output[] = "01011111 01010000 01110010 00110000";
}
else if ($_SERVER['REQUEST_METHOD'] === "HEAD") { 
	header("Binary: 7 (and last) (".$_SERVER['REQUEST_METHOD'].") => 01001010 00110011 01100011 01110100 01011111 01001001 01101110 01011111 00110001 00111001 00111000 00111001");
	exit();
}
else {
	$output[] = "";
	$output[] = $_SERVER['REQUEST_METHOD'];
	$output[] = "Nothing here.";
}
?>
<!doctype html>
<html lang="en">
	<head>
		<?php include('../php/meta.php'); ?>
		<title>Step 5 - GC8GG1R - Capture the Flag</title>
	</head>
	<body>
		<div class="main">
			<div class="left-col" style="background-image: url(img/tim_berners_lee.jpg);">
				<a class="left-col-back-to-home" href=".">&lt; Back to home</a>
				<div class="left-col-number">- V -</div>
				<div class="left-col-title">
					<div style="font-size: 164px; line-height: 155px;">HTTP</div>
					<div style="font-size: 117px; line-height: 50px; margin-bottom: 90px;">protocol</div>
				</div>
				<div class="left-col-desc">
					HTTP defines methods to indicate the desired action to be performed on the identified resource. What this resource represents, whether pre-existing data or data that is generated dynamically, depends on the implementation of the server.
					<div style="text-align:center; margin: 20px 0;">
						<a href="<?php echo $steps[5]->getWiki(); ?>" target="_blank">
							<img src="img/wiki.png" />
						</a>
					</div>
				</div>
				<div class="left-col-instructions">
					🏁 YOUR MISSION 🏁<br />
					Get the flag.
				</div>
			</div>
			<div class="right-col">
				<div class="right-col-content" style="text-align: center;">
					<div style="color: white; font-size: 40px;"><?php echo $output[0];?></div>
					<div style="font-family: 'Abril Fatface', cursive; color: white; font-size: 60px;"><?php echo $output[1];?></div>
					<div style="font-size: 20px; color: white;"><?php echo $output[2];?></div>
				</div>
			</div>
		</div>
		<?php include('../php/js.php'); ?>
		<?php 
		echo '<img style="display: none;" src="http://www.wawawoom.fr/geocaching/analytics/analytics.php?url='.'http://'. $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'].'&amp;name=Capture%20the%20Flag%20-%20Step%205" />';
		?>
	</body>
</html>