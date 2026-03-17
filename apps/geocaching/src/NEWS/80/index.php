<?php
$lang = 'en';
if ($_GET['lang'] == 'fr') {
   $lang = 'fr';
}
include_once($lang.'.php');
?>

<!DOCTYPE HTML>
<html>
<head>
<title>GC7W8EV_80-news-bonus</title>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="stylesheet" href="./css/bootstrap.min.css" />
<link rel="stylesheet" href="./css/80.css" />
<link href="https://fonts.googleapis.com/css?family=Tillana" rel="stylesheet" />
</head>

<body>

   <header>
      <?php echo $CHANGE_LANGUAGE; ?><br />
      <a href="index.php?lang=fr"><img src="./img/fr.gif" /><?php echo $LANG_FRENCH; ?></a> / 
      <a href="index.php?lang=en"><img src="./img/en.gif" /><?php echo $LANG_ENGLISH; ?></a>
   </header>

   <div class="alignCenter">
      
      <div id="logo"><a href="https://coord.info/GC7W8EV" target="_blank"><img src="./img/logo.png" /></a></div>
      
      <h1 class="alignCenter"><?php echo $TITLE; ?></h1>

      <p style="margin-bottom: 50px;">
         <span style="display:block; margin-bottom: 10px;"><?php echo $CHECKCOORDS; ?></span>
         <a href="http://geocheck.org/geo_inputchkcoord.php?gid=634647368d1cd8a-0298-44db-ba52-4d5df224bf28" target="_blank"><img alt="GeoCheck.org" src="http://geocheck.org/geocheck_small.php?gid=634647368d1cd8a-0298-44db-ba52-4d5df224bf28" title="Vérifier votre solution" style="border-width:0px;border-style:solid;height:40px;width:150px;" /></a>
      </p>

      <h2><?php echo $YOURMISSION; ?></h2>
      <h2><a href="#adventure1"><?php echo $GOTO_ADVENTURE1; ?></a> - <a href="#adventure2"><?php echo $GOTO_ADVENTURE2; ?></a></h2>

   </div>

   <div class="separator">
      <img src="./img/frise2.png" />
   </div>

   <div id="adventure1">
      <?php include_once('adventure1.php'); ?>
   </div>

   <div id="adventure2">
      <?php include_once('adventure2.php'); ?>
   </div>

   <img src="http://www.wawawoom.fr/geocaching/analytics/analytics.php?name=BONUS-NEWS-80-Descriptif" />

</body>
</html>



