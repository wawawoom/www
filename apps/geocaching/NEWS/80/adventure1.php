<h1 class="big"><?php echo $ADVENTURE1; ?></h1>
<h2><?php echo $ADVENTURE1_DESC; ?></h2>
<h3>
  <a href="#cima">1: <?php echo $CIMA_TITLE; ?></a> - 
  <a href="#elephant">2: <?php echo $ELEPHANT_TITLE; ?></a> - 
  <a href="#bigben">3: <?php echo $BIGBEN_TITLE; ?></a> - 
  <a href="#magnan">4: <?php echo $MAGNAN_TITLE; ?></a> - 
  <a href="#isoletta">5: <?php echo $ISOLETTA_TITLE; ?></a>  
</h3>

<div style="margin-top: 60px; text-align: center;">
  <h2><?php echo $CHECKTEXT_INFO; ?></h2>
  <h3><a href="./checker/text?lang=<?php echo $lang; ?>" target="_blank"><?php echo $CHECKTEXT_LINK; ?></a></h3>
  <a href="./checker/text?lang=<?php echo $lang; ?>" target="_blank"><img src="./img/file.png" style="margin: 8px 0 24px 0;"/></a>
</div>

<div class="separator">
  <img src="./img/frise2.png" />
</div> 

<div class="waypointWrapper" id="cima">
  <img class="sceneImage" src="./img/cima.jpg" />
  <h1><?php echo $STEP; ?> 1: <?php echo $CIMA_TITLE; ?></h1>
  <p>
    <?php echo $CIMA_TEXT; ?><br /><br />
    <?php echo $TERRAIN; ?>: ★★★<br />
    <?php echo $DIFFICULTY; ?>: ★★<br />
    <?php echo $PARKING; ?>: <strong>N 43° 47.599 E 007° 14.871</strong><br />
    <?php echo $START_ASCENT; ?>: <strong>N 43° 48.111 E 007° 14.751</strong><br />
    <?php echo $CACHE_POSITION; ?>: <strong>N 43° 48.259 E 007° 14.874</strong><br />
    <a href="./img/spoiler-cima.jpg" target="_blank"><?php echo $SPOILER_PIC; ?></a>

    <?php if ($_GET['user'] == 'wawawoom') { ?>
    <br /><a target="_blank" href="./step-1-a40633b2-5bed-4339-a82f-d7152549aa3f/">Solution</a>: RRDKPPQHWAZBEDDKHT
    <?php } ?>
  </p>
</div>

<div class="separator">
  <img src="./img/frise2.png" />
</div>

<div class="waypointWrapper" id="elephant">
  <img class="sceneImage" src="./img/elephant.jpg" />
  <h1><?php echo $STEP; ?> 2: <?php echo $ELEPHANT_TITLE; ?></h1>
  <p class="warning"><img src="./img/death.png" style="float: left; margin: 0 15px 15px 0;" /><?php echo $ELEPHANT_WARNING; ?></p>
  <p>
    <?php echo $ELEPHANT_DESC; ?>
    <br /><br />
    <?php echo $TERRAIN; ?>: ★★★★<br />
    <?php echo $DIFFICULTY; ?>: ★★★<br />
    <?php echo $PARKING; ?>: <strong>N 43° 57.863 E 007° 18.681</strong><br />
    <?php echo $START_DESCENT; ?>: <strong>N 43° 57.872 E 007° 18.645</strong><br />
    <?php echo $ELEPHANT_TITLE; ?>: <strong>N 43° 57.885 E 007° 18.683</strong><br />
    <?php echo $CACHE_POSITION; ?>: <strong>N 43° 57.588 E 7° 18.745</strong><br />
    <p><?php echo $ELEPHANT_FOLLOWPATH; ?></p>
    <a href="./img/elephant-way-1.jpg" target="_blank"><img src="./img/elephant-way-1.jpg" width="150" style="margin-bottom: 10px" /></a>
    <a href="./img/elephant-way-2.jpg" target="_blank"><img src="./img/elephant-way-2.jpg" width="150" style="margin-bottom: 10px" /></a>
    <a href="./img/elephant-way-3.jpg" target="_blank"><img src="./img/elephant-way-3.jpg" width="150" style="margin-bottom: 10px" /></a>
    <a href="./img/elephant-way-4.jpg" target="_blank"><img src="./img/elephant-way-4.jpg" width="150" style="margin-bottom: 10px" /></a>
    <a href="./img/elephant-way-5.jpg" target="_blank"><img src="./img/elephant-way-5.jpg" width="150" style="margin-bottom: 10px" /></a>
    <a href="./img/elephant-way-6.jpg" target="_blank"><img src="./img/elephant-way-6.jpg" width="150" style="margin-bottom: 10px" /></a>
    <a href="./img/elephant-way-7.jpg" target="_blank"><img src="./img/elephant-way-7.jpg" width="150" style="margin-bottom: 10px" /></a>
    <a href="./img/elephant-way-8.jpg" target="_blank"><img src="./img/elephant-way-8.jpg" width="150" style="margin-bottom: 10px" /></a>

    <p style="margin-top: 20px;"><?php echo $SPOILER_PIC; ?></p>
    <a href="./img/elephant-spoiler-1.jpg" target="_blank"><img src="./img/elephant-spoiler-1.jpg" width="150" /></a>
    <a href="./img/elephant-spoiler-2.jpg" target="_blank"><img src="./img/elephant-spoiler-2.jpg" width="150" /></a>

    <?php if ($_GET['user'] == 'wawawoom') { ?>
    <br /><a target="_blank" href="./step-2-649cffab-0699-4139-bf58-271cfa4bd4a3/">Solution</a>: HROSALJJRSFFI
    <?php } ?>
  </p>
</div>

<div class="separator">
  <img src="./img/frise2.png" />
</div>

<div class="waypointWrapper" id="bigben">
  <img class="sceneImage" src="./img/bigben.jpg" />
  <h1><?php echo $STEP; ?> 3: <?php echo $BIGBEN_TITLE; ?></h1>
  <p class="warning"><img src="./img/death.png" style="float: left; margin: 0 15px 15px 0;" />
    <?php echo $BIGBEN_WARNING; ?>
  </p>
  <p>
    <?php echo $BIGBEN_DESC; ?><br /><br />
    <h2><?php echo $BIGBEN_MISSION1; ?></h2>
    <?php echo $BIGBEN_MISSION1_DESC; ?>
    <br /><br />
    <?php echo $TERRAIN; ?>: ★★★★ / <a target="_blank" href="./img/bigben_path.jpg"><?php echo $AIR_VIEW; ?></a>
    
    <img src="./img/bigben-yellow.png" style="vertical-align: -7px; margin-right: 5px;" />
    <?php echo $PARKING; ?>: <strong>N 43° 43.908 E 007° 24.121</strong><br />
    
    <img src="./img/bigben-blue.png" style="vertical-align: -7px; margin-right: 5px;" />
    <?php echo $BIGBEN_START_DESCENT; ?>: <strong>N 43° 43.858 E 007° 24.137</strong><br />

    <img src="./img/bigben-green.png" style="vertical-align: -7px; margin-right: 5px;" />
    <?php echo $BIGBEN_THE_CAVE; ?>: <strong>N 43° 43.924 E 007° 24.279</strong><br /><br /><br />

     <h2><?php echo $BIGBEN_MISSION2; ?></h2>
    <?php echo $BIGBEN_MISSION2_DESC; ?>
    <br /><br />
    <?php echo $TERRAIN; ?>: ★★★★★<br />
    <?php echo $DIFFICULTY; ?>: ★★★<br />
    <p style="margin-top: 20px;">
      <a href="./img/BigBen-spoiler.jpg" target="_blank"><?php echo $SPOILER_PIC; ?></a>
    </p>
    <?php if ($_GET['user'] == 'wawawoom') { ?>
    <br /><a target="_blank" href="./step-3-e0906b3b-ff36-419c-8c4c-cee28c80374a/">Solution</a>: LPXAAWNFSKGDV
    <?php } ?>
  </p>
</div>

<div class="separator">
  <img src="./img/frise2.png" />
</div>

<div class="waypointWrapper" id="magnan">
  <img class="sceneImage" src="http://wawawoom.fr/geocaching/NEWS/80/img/magnan.jpg" />
  <h1><?php echo $STEP; ?> 4: <?php echo $MAGNAN_TITLE; ?></h1>
  <p>
     <?php echo $MAGNAN_DESC; ?><br /><br />
     <?php echo $TERRAIN; ?>: ★★★<br />
     <?php echo $DIFFICULTY; ?>: ★★★<br />
     <?php echo $PARKING; ?>: <strong>N 43° 45.615 E 007° 13.435</strong><br />
     <?php echo $MAGNAN_GODOWNHERE; ?>: <strong>N 43° 45.513 E 007° 13.529</strong><br />
     <?php echo $QRCODE_ONTREE; ?> : <strong>N 43° 45.328 E 007° 13.562</strong><br />
     <a href="./img/spoiler-magnan-1.jpg" target="_blank"><?php echo $SPOILER_PIC; ?> 1</a> -
     <a href="./img/spoiler-magnan-2.jpg" target="_blank"><?php echo $SPOILER_PIC; ?> 2</a> - 
     <a href="./img/spoiler-magnan-3.jpg" target="_blank"><?php echo $SPOILER_PIC; ?> 3</a>

     <?php if ($_GET['user'] == 'wawawoom') { ?>
    <br /><a target="_blank" href="./step-2-649cffab-0699-4139-bf58-271cfa4bd4a3/">Solution</a>: FDCIVXRYJOAUWPG
    <?php } ?>
  </p>
</div>

<div class="separator">
  <img src="./img/frise2.png" />
</div>

<div class="waypointWrapper" id="isoletta">
  <img class="sceneImage" src="http://wawawoom.fr/geocaching/NEWS/80/img/isoletta.jpg" />
  <h1><?php echo $STEP; ?> 5: <?php echo $ISOLETTA_TITLE; ?></h1>
  <p>
    <?php echo $ISOLETTA_DESC; ?>
    <br /><br />
    <?php echo $TERRAIN; ?>: ★★★<br />
    <?php echo $DIFFICULTY; ?>: ★★<br />
    <?php echo $PARKING; ?>: <strong>N 43° 43.184 E 007° 22.237</strong><br />
    <?php echo $SEA_ACCESS; ?>: <strong>N 43° 43.305 E 007° 21.977</strong><br />
    <?php echo $QRCODE_ONPEBBLE; ?>: <strong>N 43° 43.200 E 007° 22.031</strong><br />
    <a href="./img/spoiler-isoletta.jpg" target="_blank"><?php echo $SPOILER_PIC; ?></a>

    <?php if ($_GET['user'] == 'wawawoom') { ?>
    <br /><a target="_blank" href="./step-2-649cffab-0699-4139-bf58-271cfa4bd4a3/">Solution</a>: XHUSADMLJZBJVQF
    <?php } ?>
  </p>
</div>

<div class="separator">
  <img src="./img/frise2.png" />
</div>