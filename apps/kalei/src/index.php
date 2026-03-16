<?php
include_once (__DIR__ . '/php/config.php');

unset($_COOKIE['kaleiUserID']);
setcookie('kaleiUserID', '', -1, '/');
?>
<!DOCTYPE html>
<html>

<head>

  <title>Kalei - Draw beautifull Mandalas and Kaleidoscope</title>
  <meta name="description"
    content="Become a Kaleï artist ! Kaleï is a little app to draw easily beautiful kaleïdoscopes and Mandalas. Click and move, change colors, pencil and start making hypnotic drawings." />

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

  <meta name="apple-mobile-web-app-capable" content="yes" />

  <meta property="fb:app_id" content="1867792813440028" />
  <meta property="og:title" content="Kaleï" />
  <?php
	if (isset($_GET['KAL_GUID']) && $_GET['KAL_GUID'] != '') {
		?>
  <meta property="og:image" content="<?php echo $ROOT_URL; ?>/save/<?php echo $_GET['KAL_GUID']; ?>_b.png" />
  <?php
	} else {
	?>
  <meta property="og:image" content="<?php echo $ROOT_URL; ?>/img/facebooklogo4.png" />
  <?php
	}
	?>
  <meta property="og:site_name" content="Kaleï" />
  <meta property="og:description" content="Kalei - Draw beautifull Mandalas and Kaleidoscope" />

  <?php
	if (isset($_GET['KAL_GUID']) && $_GET['KAL_GUID'] != '') {
		?>
  <meta property="og:url" content="<?php echo $ROOT_URL; ?>/guid/<?php echo $_GET['KAL_GUID']; ?>" />
  <?php
	} else {
	?>
  <meta property="og:url" content="<?php echo $ROOT_URL; ?>" />
  <?php
	}
	?>

  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $ROOT_URL; ?>/img/favicons/apple-touch-icon.png" />
  <link rel="icon" type="image/png" href="<?php echo $ROOT_URL; ?>/img/favicons/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="<?php echo $ROOT_URL; ?>/img/favicons/favicon-16x16.png" sizes="16x16" />
  <link rel="manifest" href="<?php echo $ROOT_URL; ?>/img/favicons/manifest.json" />
  <link rel="mask-icon" href="<?php echo $ROOT_URL; ?>/img/favicons/safari-pinned-tab.svg" color="#5bbad5" />
  <link rel="shortcut icon" href="<?php echo $ROOT_URL; ?>/img/favicons/favicon.ico" />
  <meta name="msapplication-config" content="<?php echo $ROOT_URL; ?>/img/favicons/browserconfig.xml" />
  <meta name="theme-color" content="#ffffff" />

  <link href="//fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <link rel="stylesheet" href="<?php echo $ROOT_URL; ?>/css/kalei.css" />
  <link rel="stylesheet" href="<?php echo $ROOT_URL; ?>/css/kalei.popup.css" />
  <link rel="stylesheet" href="<?php echo $ROOT_URL; ?>/css/vendors/materialize.min.css" />
  <link rel="stylesheet" href="<?php echo $ROOT_URL; ?>/css/vendors/sweetalert.css" />

  <script src="<?php echo $ROOT_URL; ?>/js/vendors/jquery-3.1.1.min.js" type="text/javascript"></script>
  <script src="<?php echo $ROOT_URL; ?>/js/vendors/materialize.min.js" type="text/javascript"></script>
  <script src="<?php echo $ROOT_URL; ?>/js/vendors/sweetalert.min.js" type="text/javascript"></script>

  <script src="<?php echo $ROOT_URL; ?>/js/kalei.js?v=<?php echo $VERSION; ?>" type="text/javascript"></script>
  <script src="<?php echo $ROOT_URL; ?>/js/kalei.interface.js?v=<?php echo $VERSION; ?>" type="text/javascript">
  </script>
  <script src="<?php echo $ROOT_URL; ?>/js/kalei.canvas.js?v=<?php echo $VERSION; ?>" type="text/javascript">
  </script>
  <script src="<?php echo $ROOT_URL; ?>/js/kalei.menu.js?v=<?php echo $VERSION; ?>" type="text/javascript">
  </script>
  <script src="<?php echo $ROOT_URL; ?>/js/kalei.header.js?v=<?php echo $VERSION; ?>" type="text/javascript">
  </script>
  <script src="<?php echo $ROOT_URL; ?>/js/kalei.services.js?v=<?php echo $VERSION; ?>" type="text/javascript">
  </script>
  <script src="<?php echo $ROOT_URL; ?>/js/kalei.connect.js?v=<?php echo $VERSION; ?>" type="text/javascript">
  </script>
  <script src="<?php echo $ROOT_URL; ?>/js/kalei.popup.js?v=<?php echo $VERSION; ?>" type="text/javascript">
  </script>

</head>

<body>
  <script>
  // Set PHP Globals in Javascript
  $(function() {
    kalei.settings.set('ROOT_URL', '<?php echo $ROOT_URL; ?>');
    kalei.settings.set('VERSION', '<?php echo $VERSION; ?>');

    <?php if (isset($_GET['KAL_GUID']) && $_GET['KAL_GUID'] != '') { ?>
    // Load a Kalei from URL
    kalei.canvas.setKaleiGuidToLoad('<?php echo $_GET['KAL_GUID']; ?>');
    <?php } ?>

    kalei.interface.resize();
  });
  </script>


  <?php include ('inc/header.php'); ?>

  <div id="subHeader">
    <?php include ('inc/close.php'); ?>
    <div id="subHeaderWrapper">
      <?php include ('inc/about.php'); ?>
      <?php include ('inc/contact.php'); ?>
      <?php include ('inc/gallery.php'); ?>
      <?php include ('inc/connect.php'); ?>
    </div>
  </div>

  <div id="mainWrapper">

    <div id="canvasWrapper"></div>

    <div id="menuWrapper">
      <?php include ('inc/menu.php'); ?>
      <div id="subMenuWrapper">
        <?php include ('inc/close.php'); ?>
        <div id="subMenuContentWrapper">
          <?php include ('inc/colors.php'); ?>
          <?php include ('inc/sizes.php'); ?>
          <?php include ('inc/options.php'); ?>
        </div>
      </div>
    </div>

  </div>

</body>

</html>