<?php include_once (__DIR__ . '/../php/config.php'); ?>

<div id="galleryPanel" class="kaleiPanel">

  <h2>GALLERY</h2>

  <?php
	include_once (__DIR__ . '/../php/kalei_class.php');
	$k = new Kalei();
	?>

  <div id="kaleiGallery">

    <div class="row">
      <ul class="tabs">

        <?php
				if (isset($_COOKIE['kaleiUserID'])) {
					?>
        <li class="tab col s4">
          <a href="#myKaleisTab" class="active"><i class="material-icons">person_pin</i>My Kaleïs</a>
        </li>
        <?php
				}
				?>

        <li class="tab col s4">
          <a href="#famousKaleisTab"><i class="material-icons">thumb_up</i>Famous Kaleïs</a>
        </li>

        <li class="tab col s4">
          <a href="#newestKaleisTab"><i class="material-icons">queue</i>Newest Kaleïs</a>
        </li>

      </ul>
    </div>

    <?php
		if (isset($_COOKIE['kaleiUserID'])) {
			?>
    <div id="myKaleisTab">

      <?php
			$myKaleis = json_decode($k->getMyKaleis())->data;

			if (sizeof($myKaleis) == 0) {
				?>
      <div class="card-panel light-blue">
        Make your first Kaleï and save it to see it in your Kaleïs !
      </div>
      <?php
			} else {
				for ($i = 0; $i < sizeof($myKaleis); $i++) {
					$img = 'save/' . $myKaleis[$i]->KAL_GUID . '_s.png';
					?>
      <div class="aKaleiGalleryWrapper" data-guid="<?php echo $myKaleis[$i]->KAL_GUID; ?>">
        <a href="<?php echo $ROOT_URL; ?>/guid/<?php echo $myKaleis[$i]->KAL_GUID; ?>">
          <div class="kaleiImage" style="background-image:url('<?php echo $ROOT_URL; ?>/<?php echo $img; ?>');"></div>
        </a>
        <h4>Created on <?php echo $myKaleis[$i]->KAL_LastUpdate; ?></h4>
        <div class="kaleiActions">
          <span class="kaleiAction likeKalei <?php if ($myKaleis[$i]->currentUserLike == 1) { echo 'like'; } ?>">
            <i class="material-icons tiny">thumb_up</i>
            <b class="likeCount">
              <?php
							if ($myKaleis[$i]->LikeCount > 0) {
								echo '(' . $myKaleis[$i]->LikeCount . ')';
							}
							?>
            </b>
            <b class="likeLabel">
              <?php
							if ($myKaleis[$i]->currentUserLike == 1) {
								echo 'Unlike';
							} else {
								echo 'Like';
							}
							?>
            </b>
          </span>&nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="<?php echo $ROOT_URL; ?>/guid/<?php echo $myKaleis[$i]->KAL_GUID; ?>">
            <span class="kaleiAction">
              <i class="material-icons tiny">mode_edit</i> Edit
            </span>
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span class="kaleiAction commmentKalei">
            <i class="material-icons tiny">question_answer</i> Comment
          </span>&nbsp;&nbsp;|&nbsp;&nbsp;
          <span class="kaleiAction deleteKalei">
            <i class="material-icons tiny">delete</i> Delete
          </span>
        </div>
      </div>
      <?php
				}
			}
			?>

    </div>
    <?php
		}
		?>

    <div id="famousKaleisTab" class="<?php if (!isset($_COOKIE['kaleiUserID'])) { echo 'active'; } ?>">
      <?php
			$famousKaleis = json_decode($k->getFamousKaleis())->data;
			if (sizeof($famousKaleis) == 0) {
				?>
      <div class="card-panel light-blue">
        Actually there is no famous Kaleïs !
      </div>
      <?php
			} else {
				for ($i = 0; $i < sizeof($famousKaleis); $i++) {
					$img = 'save/' . $famousKaleis[$i]->KAL_GUID . '_s.png';
					?>
      <div class="aKaleiGalleryWrapper" data-guid="<?php echo $famousKaleis[$i]->KAL_GUID; ?>">
        <a href="<?php echo $ROOT_URL; ?>/guid/<?php echo $famousKaleis[$i]->KAL_GUID; ?>">
          <div class="kaleiImage" style="background-image:url('<?php echo $ROOT_URL; ?>/<?php echo $img; ?>');"></div>
        </a>
        <h4>Made by <?php echo $famousKaleis[$i]->USE_DisplayName; ?></h4>
        <h5>Created on <?php echo $famousKaleis[$i]->KAL_LastUpdate; ?></h5>
        <div class="kaleiActions">
          <span class="kaleiAction likeKalei <?php if ($famousKaleis[$i]->currentUserLike == 1) { echo 'like'; } ?>">
            <i class="material-icons tiny">thumb_up</i>
            <b class="likeCount">
              <?php
							if ($famousKaleis[$i]->LikeCount > 0) {
								echo '(' . $famousKaleis[$i]->LikeCount . ')';
							}
							?>
            </b>
            <b class="likeLabel">
              <?php
							if ($famousKaleis[$i]->currentUserLike == 1) {
								echo 'Unlike';
							} else {
								echo 'Like';
							}
							?>
            </b>
          </span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span class="kaleiAction commmentKalei">
            <i class="material-icons tiny">question_answer</i> Comment
          </span>
        </div>
      </div>
      <?php
				}
			}
			?>

    </div>

    <div id="newestKaleisTab">
      <?php
			$latestKaleis = json_decode($k->getLatestKaleis())->data;

			if (sizeof($latestKaleis) == 0) {
				?>
      <div class="card-panel light-blue">
        Actually there is no famous Kaleïs !
      </div>
      <?php
			} else {
				for ($i = 0; $i < sizeof($latestKaleis); $i++) {
					$img = 'save/' . $latestKaleis[$i]->KAL_GUID . '_s.png';
					?>
      <div class="aKaleiGalleryWrapper" data-guid="<?php echo $latestKaleis[$i]->KAL_GUID; ?>">

        <a href="<?php echo $ROOT_URL; ?>/guid/<?php echo $latestKaleis[$i]->KAL_GUID; ?>">
          <div class="kaleiImage" style="background-image:url('<?php echo $ROOT_URL; ?>/<?php echo $img; ?>');"></div>
        </a>
        <h4>Made by <?php echo $latestKaleis[$i]->USE_DisplayName; ?></h4>
        <h5>Created on <?php echo $latestKaleis[$i]->KAL_LastUpdate; ?></h5>
        <div class="kaleiActions">
          <span class="kaleiAction likeKalei <?php if ($latestKaleis[$i]->currentUserLike == 1) { echo 'like'; } ?>">
            <i class="material-icons tiny">thumb_up</i>
            <b class="likeCount">
              <?php
							if ($latestKaleis[$i]->LikeCount > 0) {
								echo '(' . $latestKaleis[$i]->LikeCount . ')';
							}
							?>
            </b>
            <b class="likeLabel">
              <?php
							if ($latestKaleis[$i]->currentUserLike == 1) {
								echo 'Unlike';
							} else {
								echo 'Like';
							}
							?>
            </b>
          </span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span class="kaleiAction commmentKalei">
            <i class="material-icons tiny">question_answer</i> Comment
          </span>
        </div>
      </div>
      <?php
				}
			}
			?>

    </div>

  </div>

</div>