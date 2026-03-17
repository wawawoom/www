<?php
// Check if cookie exist and has value
$cookieName = '7g27gGC';
$endTime = time() + (60 * 60 * 24 * 30); // On enregistre le nombre de secondes dans un mois
$cookieDuration = time() + 31556926; // Cookie duration : one year
$redirectURL = 'http://wawawoom.fr/geocaching/GC7G27G/step-4-4508eccd-9afb-4256-99b2-dd06826d8329/solution-85e81298-82ac-4d70-849b-c0ca7fe983b3.html';

function secondsToTime($seconds) {
    $dtF = new \DateTime('@0');
    $dtT = new \DateTime("@$seconds");
    return $dtF->diff($dtT)->format('%a jours, %h heures, %i minutes et %s secondes');
}

// Cookie is set
if (!isset($_COOKIE[$cookieName])) {
	setcookie($cookieName, $endTime, $cookieDuration ,'/');
	$_COOKIE[$cookieName] = $endTime; // Trick to use immediatelly the cookie value
}

// Check if cookie value is integer
if (preg_match('/^\d+$/', $_COOKIE[$cookieName])) {
	
	// check if wait period is gone
	if (intval($_COOKIE[$cookieName]) - time() < 0) {
		unset($_COOKIE[$cookieName]);
    	setcookie($cookieName, null, -1, '/');
		header('Location: ' . $redirectURL);
		exit;
	}
	else {
		$wait = secondsToTime(intval($_COOKIE[$cookieName]) - time());
	}
}
else {
	$wait = 'un mois';
}
?>
<!DOCTYPE HTML>
<html>
<head>
<title>Etape 4 - Ceci n'est pas une blague</title>
<meta charset="utf-8" />
<meta name="description" content="Vous reprendrez bien un petit biscuit ?" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
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
		background-image: url('img/d410b88b-0a35-402a-a368-e802b9cd8248.jpg');
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
	.alignCenter {
		text-align: center;
	}

	p {
		padding: 0 0 100px;
    	font-size: 17px;
	}

</style>

</head>
<body>

	<div class="container">
	 	<h1 class="alignCenter">Ceci n'est pas une blague</h1>
		<p class="alignCenter">
			Vous êtes bloqué ici pour une durée de <strong><?php echo $wait; ?></strong><br/>
			A la fin de cette période vous passerez automatiquement à l'étape suivante.
			<br /><br/>
			A moins que vous ne soyez plus fort que le temps.
		</p>
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