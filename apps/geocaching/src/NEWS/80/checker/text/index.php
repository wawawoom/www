<?php
$lang = 'en';
if ($_GET['lang'] == 'fr') {
   $lang = 'fr';
}
include_once('../../'.$lang.'.php');
?>

<!DOCTYPE HTML>
<html>
<head>
<title>GC7W8EV_80 NEWS Bonus Checker text</title>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="stylesheet" href="../../css/bootstrap.min.css" />
<link rel="stylesheet" href="../../css/80.css" />
<link href="https://fonts.googleapis.com/css?family=Tillana" rel="stylesheet" />

</head>
<body>

	<header>
      <?php echo $CHANGE_LANGUAGE; ?><br />
      <a href="index.php?lang=fr"><img src="../../img/fr.gif" /><?php echo $LANG_FRENCH; ?></a> / 
      <a href="index.php?lang=en"><img src="../../img/en.gif" /><?php echo $LANG_ENGLISH; ?></a>
   </header>

	<div class="alignCenter" style="margin-bottom: 100px;">
		<div id="logo"><a href="../../index.php?lang=<?php echo $lang; ?>"><img src="../../img/logo.png" /></a></div>
		<h1 class="alignCenter"><?php echo $CHECKTEXT_TITLE; ?></h1>
		<p><?php echo $CHECKTEXT_DESC; ?></p>

		<?php
		if (isset($_POST['cypher']) && $_POST['cypher'] != '') {
			if (strtoupper($_POST['cypher']) == 'RRDKPPQHWAZBEDDKHTHROSALJJRSFFILPXAAWNFSKGDVFDCIVXRYJOAUWPGXHUSADMLJZBJVQF')  {
			?>
				<div class="result" id="resultOK"><?php echo $CHECKTEXT_YES; ?></div>
			<?php
			} else {
			?>
				<div class="result" id="resultBAD"><?php echo $CHECKTEXT_NOPE; ?></div>
			<?php
			}
		}
		?>

		<form action="./" method="post" class="alignCenter">
			<div class="alignCenter">
				<textarea name="cypher" placeholder="<?php echo $CHECKTEXT_ENTER_TEXT_HERE; ?>"><?php if (isset($_POST['cypher']) && $_POST['cypher'] != '') { echo $_POST['cypher']; }?></textarea>
			</div>
			<div class="alignCenter" style="margin-top: 20px;">
				<input class="btn btn-success" type="submit" value="<?php echo $CHECKTEXT_CHECK; ?>" />	
			</div>
		</form>

	</div>
	
	<img src="http://www.wawawoom.fr/geocaching/analytics/analytics.php?name=checkNews80Text" />

</body>
</html>