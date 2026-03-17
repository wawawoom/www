<?php
include_once (__DIR__ . '/../php/config.php');
include_once (__DIR__ . '/../php/kalei_class.php');
$k = new Kalei();
$kalei = json_decode(
  $k->loadKalei(
    array('KAL_GUID' => $_GET['KAL_GUID'], 'GET_Data' => false)
  )
);
$kalei = $kalei->data[0];
?>

<div class="commentWrapper">

  <div class="kaleiDescWrapper">
    <img class="kaleiImage" src="<?php echo 'save/' . $_GET['KAL_GUID'] . '_b.png'; ?>" />
    <div class="kaleiDescription">
      <h4>Made by <?php echo $kalei->USE_DisplayName; ?></h4>
      <h5>Created on <?php echo $kalei->KAL_LastUpdate; ?></h5>
    </div>
  </div>

  <div class="kaleiCommentsWrapper">

    <div class="fb-comments" data-href="<?php echo $ROOT_URL; ?>/guid/<?php echo $_GET['KAL_GUID']; ?>"
      data-width="100%" data-numposts="20">
    </div>
    <script>
    FB.XFBML.parse();
    </script>

  </div>

</div>