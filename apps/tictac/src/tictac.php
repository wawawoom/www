<?php
include('_master.php');
if (!$user->checkAuth()) {
	$user->logout();
}
?>
<!doctype html>
<html lang="fr">

<head>
  <meta charset="utf-8">
  <title>TicTac.tel</title>
  <link href="//fonts.googleapis.com/css?family=Lato:400,100" rel="stylesheet" type="text/css" />
  <link type="text/css" rel="stylesheet" href="css/styles.php" />
  <link type="text/css" rel="stylesheet" href="css/bootstrap.css" />
  <link href="css/ui-lightness/jquery-ui-1.10.3.custom.css" rel="stylesheet">

  <script src="js/jquery-2.0.3.min.js"></script>
  <script src="js/jquery-ui-1.10.3.custom.min.js"></script>
  <script src="js/bootstrap.min.js"></script>

  <script src="js/utils.js"></script>
  <script src="js/tictac.js"></script>
  <script src="js/tictac.factory.js"></script>
  <script src="js/tictac.chrono.js"></script>
  <script src="js/tictac.interface.js"></script>
  <script src="js/tictac.tasks.js"></script>
  <script src="js/tictac.popup.js"></script>
  <script src="js/tictac.tooltip.js"></script>
</head>

<body>

  <?php include ('_header.php'); ?>

  <div id="taskListWrapper">

    <div id="actions">
      <a title="New task" class="ion-ios7-plus-outline newTask timerTooltip" href="javascript:void(0);"
        data-tooltip-position="right"></a>
      <a title="Search task" class="ion-ios7-search searchTask timerTooltip" href="javascript:void(0);"
        data-tooltip-position="right"></a>
      <a title="View all tasks" class="ion-social-buffer-outline viewAllTasks timerTooltip" href="javascript:void(0);"
        data-tooltip-position="right"></a>
    </div>

    <div id="newTaskWrapper">
      <input type="text" id="newTaskInput" placeholder="NEW TASK : enter a name and hit ENTER" value="" />
      <div class="loader16"></div>
    </div>

    <div id="searchTaskWrapper">
      <input type="text" id="searchTaskInput" placeholder="SEARCH TASKS : enter a name" value="" />
      <div class="loader16"></div>
    </div>

    <ul>

    </ul>

  </div>

  <div id="chronoWrapper">
    <div id="chronoControllers">
      <a class="ion-ios7-play-outline timerTooltip" id="start" href="javascript:void(0);" title="start Timer"></a>
      <a class="ion-ios7-pause-outline timerTooltip" id="pause" href="javascript:void(0);" title="pause Timer"></a>
      <a class="ion-ios7-close-outline timerTooltip" id="stop" href="javascript:void(0);" title="stop Timer"></a>
    </div>

    <div id="chrono">00:00:00</div>
  </div>
</body>

</html>