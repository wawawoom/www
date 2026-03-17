<?php include '../php/global.php'; ?>
<?php include '../php/inc.php'; ?>
<!doctype html>
<html lang="en">
	<head>
		<?php include('../php/meta.php'); ?>
		<title>Step 3 - GC8GG1R - Capture the Flag</title>
	</head>
	<body>
		<div class="main">
			<div class="left-col" style="background-image: url(img/gregor_clegane.jpg);">
				<a class="left-col-back-to-home" href=".">&lt; Back to home</a>
				<div class="left-col-number">- III -</div>
				<div class="left-col-title">
					<div style="font-size: 244px; line-height: 184px;">ZIP</div>
					<div style="font-size: 116px;">CRACK</div>
				</div>
				<div class="left-col-desc">
					Brute-force attacks work by calculating every possible combination that could make up a password and testing it to see if it is the correct password. As the password's length increases, the amount of time, on average, to find the correct password increases exponentially.
					<div style="text-align:center; margin: 20px 0;">
						<a href="<?php echo $steps[3]->getWiki(); ?>" target="_blank">
							<img src="img/wiki.png" />
						</a>
					</div>
				</div>
				<div class="left-col-instructions">
				🏁 YOUR MISSION 🏁<br/>
				Get the Flag in the ZIP file.
				</div>
			</div>
			<div class="right-col">
				<div class="right-col-content" style="text-align: center;">
					<a href="step3-fc9ce305-7e29-4e22-a18f-ff8d442c618c/step3.zip" target="_blank"><img src="img/zip.png" /></a>
					<p>
						<code>/[a-z0-9]{7}/</code>
					</p>
				</div>
			</div>
		</div>
		<?php include('../php/js.php'); ?>
		<?php 
		echo '<img style="display: none;" src="http://www.wawawoom.fr/geocaching/analytics/analytics.php?url='.'http://'. $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'].'&amp;name=Capture%20the%20Flag%20-%20Step%203" />';
		?>
	</body>
</html>