<?php
$results = array('viol', 'rape');
$redirectURL = 'http://wawawoom.fr/geocaching/GC7G27G/step-5-17b47dfa-1dbd-43af-b9b3-364f12c5beaa/solution-287c2d8a-1f4e-42c0-bc5a-dfcca6d944cf.html';

$out = '';

if (isset($_POST['myName']) && $_POST['myName'] != '') {
	if (in_array(trim(strtolower($_POST['myName'])), $results)) {
		header('Location: ' . $redirectURL);
		exit;
	}
	else {
		$out = '<div id="errorName">Sorry, this is not my name, try again please.</div>';
	}
}
?>
<!DOCTYPE HTML>
<html>
<head>
<title>Etape 5 - This is not the matrix</title>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="RGB" />
<link rel="stylesheet" href="css/bootstrap.min.css" />
<link href="https://fonts.googleapis.com/css?family=Parisienne|VT323" rel="stylesheet">
<style>
	html {
		width: 100%;
		height: 100%;

	}
	body {
		width: 100%;
		height: 100%;
		color: #FFFFFF;
		background-image: url('img/510ca1af-400b-4dbf-af73-7b64718e387c.jpg');
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}
	h1 {
		text-align: center;
		margin: 100px 0;
		font-family: 'Parisienne', cursive;
		font-size: 80px;
		text-shadow: 0px 3px 6px rgba(0,0,0,0.5);
	}
	h2 {
		margin-bottom: 30px;
	}
	.alignCenter {
		text-align: center;
	}

	p {
		padding: 0 0 100px;
    	font-size: 20px;
	}

	.pill {
		padding: 7px 18px;
		border-radius: 20px;
		color: #FFFFFF;
		display: inline-block;
		margin: 0 5px;
		font-weight: 200;
	}
	.pill:hover {
		color: #FFFFFF;
	}

	#myName {
		border-radius: 5px;
		border: none;
		height: 34px;
		padding: 4px 13px;
		color: #000;
		font-size: 16px;
		vertical-align: middle;
	}

	#errorName{
		color: red;
		background-color: pink;
		width: 50%;
		border: 1px solid red;
		padding: 20px;
		border-radius: 20px;
		margin: 30px auto;
		text-align: center;
	}

	form {
		margin-bottom: 200px;
	}

</style>

</head>
<body>

	<div class="container">
	 	<h1 class="alignCenter">This is not the Matrix</h1>
		<p class="alignCenter">
			Will you take
			<a class="pill" style="background-color:blue;" target="_blank" href="matrix-JS.txt" >the blue pill</a> or
			<a class="pill" style="background-color:red;" target="_blank" href="matrix-PHP.txt">the red pill</a>, or maybe
			<a class="pill" style="background-color:green;" target="_blank" href="matrix-JAVA.txt">the green pill</a> ?
		</p>
		<h2 class="alignCenter">What is my name ?</h2>
		<?php echo $out; ?>
		<form action="./" method="post" class="alignCenter">
			<input type="text" name="myName" id="myName" value="" />
			<input class="btn btn-primary" type="submit" value="Try" />
		</form>
	</div>

	<img src="http://www.wawawoom.fr/geocaching/analytics/analytics.php" />

	<script type="text/javascript">
		var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
		document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
		</script>
		<script type="text/javascript">
		try {
		var pageTracker = _gat._getTracker("UA-7999871-1");
		pageTracker._trackPageview();
		} catch(err) {};
	</script>

</body>
</html>
