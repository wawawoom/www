<!doctype html>
<html lang="en">
	<head>
		<?php include('../php/meta.php'); ?>
		<title>GC8GG1R - Enter flags</title>
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
			<div class="left-col" style="background-image: url(../img/home.jpg);">
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

					<h2 class="mb-4">Enter a Flag</h2>
					
					<?php
					if (isset($_POST['submit']) && $_POST['submit'] === "Submit") {
						if (isset($_POST['flag']) && $_POST['flag'] !== "") {
							
							include('../php/inc.php');
							print_r($steps);

							// Step 0 (Geoaching listing) is completed
							if ($_POST['flag'] === "My_First-FLaG") {
								echo 
									'<div class="result success">
										Well done ! Welcome in the Capture the Flag mystery cache challenge. Now go to <a href="../step1-e1531b13-e877-4c69-a71d-ac8eed4171ef" class="badge badge-light text-monospace" style="font-size: 15px;">Step 1</a>
									</div>';
							}
							
							// Step 1 completed
							else if ($_POST['flag'] === "StEp1ComPletEd_!") {
								echo 
									'<div class="result success">
										Well done ! Flag for step 1 is OK. Now go to <a href="../step2-dc3504d9-7d66-4a9d-982b-e161b02932d5" class="badge badge-light text-monospace" style="font-size: 15px;">Step 2</a>
									</div>';
							}

							// Step 2 completed
							else if ($_POST['flag'] === "*XsSisVerYdangeRous*") {
								echo 
									'<div class="result success">
										Well done ! Flag for step 2 is OK. Now go to <a href="../step3" class="badge badge-light text-monospace" style="font-size: 15px;">Step 3</a>
									</div>';
							}

							else {
								echo 
									'<div class="result error">
										This is not a valid Flag. Go away.
									</div>';
							}
						}
					}
					?>
					<form action="./" method="post">
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
								placeholder="Enter a flag" 
								value="<?php echo $flag; ?>" />

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
			
		</script>
	</body>
</html>