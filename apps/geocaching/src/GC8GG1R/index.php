<?php include 'php/global.php'; ?>
<!doctype html>
<html lang="en">
	<head>
		<?php include('php/meta.php'); ?>
		<title>GC8GG1R - Capture the Flag</title>
		<style>
			#linkGC {
				color: #FFFFFF;
			}
			#linkGC:hover {
				text-decoration: none;
			}
		</style>
	</head>
	<body>
		<div class="main">
			<div class="left-col" style="background-image: url(img/home.jpg);">
				<div class="left-col-number">
					<a 
						id="linkGC"
						target="_blank"
						href="https://www.geocaching.com/geocache/GC8GG1R_capture-the-flag">
						- GC8GG1R -
					</a>
					<div style="text-align: center; margin-top: 10px;">
						<a 
							target="_blank" 
							href="http://geocheck.org/geo_inputchkcoord.php?gid=6381714cf34581d-40f7-465a-8c11-8208fdd475da">
							<img src="http://geocheck.org/geocheck_small.php?gid=6381714cf34581d-40f7-465a-8c11-8208fdd475da" 
								title="Check your solution" 
								border="0" />
						</a>
					</div>
				</div>
				<div class="left-col-title">
					<span style="font-size: 104px;">CAPTURE</span>
					<br />
					<span style="font-size: 104px; margin-top: -18px; display: block;">THE FLAG</span>
				</div>
				<div class="left-col-desc">
					A capture the flag contest is a special kind of cybersecurity competition designed to challenge its participants to solve computer security problems by hacking into or defending computer systems.
				</div>
			</div>
			<div class="right-col">
				<div class="right-col-content">

					<h2 class="mb-4">Got a flag ? Test it here.</h2>
					
					<?php
					if (isset($_POST['submit']) && $_POST['submit'] === "Test") {
						if (isset($_POST['flag']) && $_POST['flag'] !== "") {
							
							include('php/inc.php');
							
							$flagIsFound = false;

							for ($i = 0; $i < count($steps); $i++) {
								if ($_POST['flag'] === $steps[$i]->getFlag()) {
									
									$flagIsFound = true;
									echo '<div class="result success">';
									echo $steps[$i]->getWellDoneMessage();
									
									if ($i < count($steps) - 1) {
										echo ' ';
										echo 'Now go to ';
										echo '<a href="';
										echo $steps[($i+1)]->getURL();
										echo '" class="badge badge-light text-monospace" style="font-size: 15px;">';
										echo 'Step ';
										echo $i + 1;
										echo '</a>';
									}
									
									echo '</div>';
								}
							}

							// Bad flag
							if ($flagIsFound === false) {
								echo 
									'<div class="result error">
										This is not a valid Flag. Go away.
									</div>';
							}
						}
					}
					?>
					<form action="" method="post">
						<div class="form-group">
							<?php
							$flag = '';
							if (
								isset($_POST['submit']) && 
								$_POST['submit'] === "Submit" && 
								isset($_POST['flag']) && 
								$_POST['flag'] !== ""
							) {
								$flag = htmlentities($_POST['flag'], ENT_QUOTES, "UTF-8");
							}
							?>

							<input 
								autocomplete="off"
								name="flag" 
								type="text" 
								class="form-control" 
								id="flag" 
								placeholder="Enter a flag here" 
								value="<?php echo $flag; ?>" />

						</div>
						
						<div class="form-group mt-5">
							<input type="submit" name="submit" class="btn btn-danger" value="Test" />
						</div>
					</form>
					
				</div>
			</div>
		</div>
		<?php include('php/js.php'); ?>
		<?php 
		echo '<img style="display: none;" src="http://www.wawawoom.fr/geocaching/analytics/analytics.php?url='.'http://'. $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'].'&amp;name=Capture%20the%20Flag%20-%20Home" />';
		?>
	</body>
</html>