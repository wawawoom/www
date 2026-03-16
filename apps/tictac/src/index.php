<?php
include ('_master.php');
$isAuth = $user->checkAuth();
?>
<!doctype html>
<html lang="fr">

<head>
  <meta charset="utf-8">
  <title>TicTac.Tel</title>
  <link href="//fonts.googleapis.com/css?family=Lato:400,100" rel="stylesheet" type="text/css" />
  <link type="text/css" rel="stylesheet" href="css/styles.php" />
  <link type="text/css" rel="stylesheet" href="css/bootstrap.css" />

  <script src="js/jquery-2.0.3.min.js"></script>
  <script src="js/bootstrap.min.js"></script>

  <script src="js/tictac.js"></script>
  <script src="js/tictac.factory.js"></script>
  <script src="js/tictac.popup.js"></script>
  <script src="js/tictac.user.js"></script>
  <script src="js/utils.js"></script>

</head>

<body>

  <?php include ('_header.php'); ?>

  <script>
  $(function() {

    var b1 = document.getElementById('b1');
    var b2 = document.getElementById('b2');
    var b3 = document.getElementById('b3');
    var b4 = document.getElementById('b4');
    var b5 = document.getElementById('b5');
    var b6 = document.getElementById('b6');

    var deg = 0;
    var direction = 'up';
    var max = 55;
    var start = 22;
    var count = 0;
    var rythm = 55;

    var isEven = function(someNumber) {
      return (someNumber % 2 == 0) ? true : false;
    };

    var i = setInterval(
      function() {
        if (direction == 'up') {
          if (deg == 0) {
            deg = start;
          } else {
            deg += Math.ceil((max - deg) / 2);
          }
          if (deg >= max) {
            direction = 'down';
          }
        } else {
          if (deg == max) {
            deg = start;
          } else {
            deg -= Math.ceil((max - deg) / 2);
            if (deg < 0.01) {
              deg = 0;
              direction = 'up';
              setTimeout(function() {
                count++;
              }, 30);
            }
          }
        }

        if (isEven(count)) {
          b1.style.transform = 'rotate(' + Math.ceil(deg) + 'deg)';
          b2.style.transform = 'rotate(' + Math.ceil(deg / 10) + 'deg)';
          b3.style.transform = 'rotate(' + Math.ceil(deg / 15) + 'deg)';
          b4.style.transform = 'rotate(' + Math.ceil(deg / 26) + 'deg)';
        } else {
          b3.style.transform = 'rotate(' + Math.ceil(-deg / 26) + 'deg)';
          b4.style.transform = 'rotate(' + Math.ceil(-deg / 15) + 'deg)';
          b5.style.transform = 'rotate(' + Math.ceil(-deg / 10) + 'deg)';
          b6.style.transform = 'rotate(' + Math.ceil(-deg) + 'deg)';
        }



      },
      rythm
    );


  });
  </script>

  <div id="ballsClockWrapper">
    <div id="ballsClock">
      <div class="aBallWrapper" id="b1">
        <div class="aLine"></div>
        <div class="aBall">t</div>
      </div>
      <div class="aBallWrapper" id="b2">
        <div class="aLine"></div>
        <div class="aBall">i</div>
      </div>
      <div class="aBallWrapper" id="b3">
        <div class="aLine"></div>
        <div class="aBall">c</div>
      </div>
      <div class="aBallWrapper" id="b4">
        <div class="aLine"></div>
        <div class="aBall">t</div>
      </div>
      <div class="aBallWrapper" id="b5">
        <div class="aLine"></div>
        <div class="aBall">a</div>
      </div>
      <div class="aBallWrapper" id="b6">
        <div class="aLine"></div>
        <div class="aBall">c</div>
      </div>
    </div>

    <div id="chapo">

      <h1>Track time</h1>
      <h2>spent on differents tasks</h2>
      <?php
      if ($isAuth) {
        ?>
      <a href="tictac.php" class="btn btn-primary" style="margin-top:20px;">
        <span class="ion-play" style="margin-right:10px"></span>
        Start tracking !
      </a>
      <?php
      } else {
      ?>
      <p>TicTac est un outil simple et efficace pour suivre le temps passé sur vos différentes tâches. Créez vos projets, lancez le chronomètre et analysez votre productivité. Gérez vos tâches en toute simplicité et visualisez votre temps de travail en temps réel.
      </p>
      <?php
      }
      ?>
    </div>

    <div style="clear:both;"></div>

  </div>

</body>

</html>