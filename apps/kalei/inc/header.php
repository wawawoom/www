<?php include_once (__DIR__ . '/../php/config.php'); ?>

<header>

  <a href="<?php echo $ROOT_URL; ?>/index.php">
    <img src="<?php echo $ROOT_URL; ?>/img/logo_header.svg" class="logo" />
  </a>

  <ul id="topMenu">

    <li id="about">
      <span>About Kalei</span>
      <i class="material-icons">info</i>
    </li>

    <li id="contact">
      <span>Contact</span>
      <i class="material-icons">email</i>
    </li>
    <li id="gallery">
      <span>Gallery</span>
      <i class="material-icons">visibility</i>
    </li>
    <li id="connect">
      <span>Connect</span>
      <img id="facebookAvatar" />
      <i class="material-icons">assignment_ind</i>
    </li>
  </ul>

</header>