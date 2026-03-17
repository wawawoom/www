<?php include '../php/global.php'; ?>
<?php include '../php/inc.php'; ?>
<!doctype html>
<html lang="en">
	<head>
		<?php include('../php/meta.php'); ?>
		<title>Step 1 - GC8GG1R - Capture the Flag</title>
	</head>
	<body>
		<div class="main">
			<div class="left-col" style="background-image: url(img/brendan_eich.jpg);">
				<a class="left-col-back-to-home" href=".">&lt; Back to home</a>
				<div class="left-col-number">- I -</div>
				<div class="left-col-title"><span style="font-size: 204px">JAVA</span><br />SCRIPT</div>
				<div class="left-col-desc">
				Against all odds, I created JavaScript in just 10 days and did one hell of a job. It has come to be the most widely used programming language and a special favourite for most developers. </div>
				<div style="text-align:center; margin: 20px 0;">
					<a href="<?php echo $steps[1]->getWiki(); ?>" target="_blank">
						<img src="img/wiki.png" />
					</a>
				</div>
				<div class="left-col-instructions">
					🏁 YOUR MISSION 🏁<br /> Make a successfull login to get the Flag
				</div>
			</div>
			<div class="right-col">
				<div class="right-col-content">
					<?php
					if (isset($_POST['submit']) && $_POST['submit'] === "Submit") {
						if (isset($_POST['login']) && $_POST['login'] === "brendan.eich") {
							if (isset($_POST['password']) && $_POST['password'] === "MozZilLa2014!") {
								echo 
									'<div class="result success">
										Well done ! Flag is <span class="badge badge-light text-monospace" style="font-size: 15px;">' . $steps[1]->getFlag() . '</span>
									</div>';
							} else {
								echo 
									'<div class="result error">
										Hello Brendan ! Good to see you again. Did you forget your password ? Check the source code.
									</div>';
							}
						} else {
							echo 
								'<div class="result error">
									Who am I ?
								</div>';
						}
					}
					?>
					<form action="" method="post">
						<div class="form-group">
							<label for="login">Login</label>
							
							<?php
							$login = '';
							if (
								isset($_POST['submit']) && 
								$_POST['submit'] === "Submit" && 
								isset($_POST['login']) && 
								$_POST['login'] !== ""
							) {
								$login = htmlentities($_POST['login'], ENT_QUOTES, "UTF-8");
							}
							?>

							<input 
								autocomplete="off"
								name="login" 
								type="text" 
								class="form-control" 
								id="login" 
								placeholder="Enter his login" 
								value="<?php echo $login; ?>" />

							<small style="display: none;" id="errorOnLogin">The login should match this regex /^[a-z.]+$/</small>
						</div>
						<div class="form-group">
							<label for="password">Password</label>
							<?php
							$password = '';
							if (
								isset($_POST['submit']) && 
								$_POST['submit'] === "Submit" && 
								isset($_POST['password']) && 
								$_POST['password'] !== ""
							) {
								$password = htmlentities($_POST['password'], ENT_QUOTES, "UTF-8");
							}
							?>
							<input 
								name="password" 
								type="password" 
								class="form-control" 
								id="password" 
								placeholder="Enter his password" 
								value="<?php echo $password; ?>" />
						</div>
						<div class="form-group mt-5">
							<input type="submit" name="submit" class="btn btn-danger" value="Submit" />
						</div>
					</form>
					
				</div>
			</div>
		</div>
		<?php include('../php/js.php'); ?>
		<script>
			var _0xa509 = ["\x4D\x6F\x7A\x5A\x69\x6C\x4C\x61\x32\x30\x31\x34\x21"];
			var _0xa510 = _0xa509[0];

			$(function () {
				$('#login').on('keyup', function () {
					var login = $(this).val();
					let regex = /^[a-z.]+$/;
					
					if (regex.test(login) || login === '') {
						$('#errorOnLogin').hide();
					}
					else {
						$('#errorOnLogin').show();
					}
				})
			});
		</script>
		<?php 
		echo '<img style="display: none;" src="http://www.wawawoom.fr/geocaching/analytics/analytics.php?url='.'http://'. $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'].'&amp;name=Capture%20the%20Flag%20-%20Step%201" />';
		?>
	</body>
</html>