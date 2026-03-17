<?php
$lang = 'en';
if (isset($_GET['lang']) && $_GET['lang'] == 'fr') {
  $lang = 'fr';
}
include_once ('../i18n/' . $lang . '.php');
?>
<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" href="../css/reset.css" type="text/css" charset="utf-8" />
  <link rel="stylesheet" href="../css/styles.css" type="text/css" charset="utf-8" />

  <title>5 - The Legend of GC84ZZG</title>

</head>

<body>

  <div id="container" style="width:346px;">

    <div id="header"></div>

    <div id="content">
      <div id="colLeft"></div>
      <div id="colCenter">

        <p class="title"><a href="https://coord.info/GC84ZZG">The Legend of GC84ZZG</a></p>

        <div class="man" style="margin: 6px 0 16px 0;">
          <div><a href="index.php?lang=fr"><img src="../img/fr.gif" /><?php echo $LANG_FRENCH; ?></a></div>
          <div><a href="index.php?lang=en"><img src="../img/en.gif" /><?php echo $LANG_ENGLISH; ?></a></div>
        </div>

        <p style="text-align: center;"><?php echo $NESTOPIA_DESC; ?></p>

        <div class="wall"></div>

        <div class="mission"><img src="../img/woman.gif" /></div>
        <div class="mission"><?php echo $MISSION2; ?></div>
        <p><?php echo $MISSION2_DESC; ?>
        <p>

        <div class="wall"></div>

        <div class="mission"><img src="../img/oldman.gif" /></div>
        <div class="mission"><?php echo $MISSION3; ?></div>
        <p><?php echo $MISSION3_DESC; ?>
        <p>

      </div>
      <div id="colRight"></div>
    </div>

    <div id="footer">
      <p></p>
    </div>

  </div>

  <img
    src="http://www.wawawoom.fr/geocaching/analytics/analytics.php?url=<?php echo isset($_SERVER['REQUEST_URI']) ? urlencode($_SERVER['REQUEST_URI']) : ''; ?>&amp;name=The%20Legend%20Of%20GC84ZZG%20-%20Step%205">

</body>

</html>