<?php include '../php/global.php'; ?>
<?php include '../php/inc.php'; ?>

<!doctype html>
<html lang="en">
	<head>
		<?php include('../php/meta.php'); ?>
		<title>Step 6 - GC8GG1R - Capture the Flag</title>
		<style>
		.quote {
			font-family: 'Abril Fatface', cursive;
			color: #FFFFFF;
			font-size: 25px;
		}
		.author {
			margin-top: 20px;
		}
		.link {
			color: #dc3545;
			opacity: 0.7;
			padding: 0 20px;
			font-size: 14px;
			margin-top: 30px;
			display: inline-block;
		}
		.link:hover {
			opacity: 1;
			color: #dc3545;
			text-decoration: none;
		}
		</style>
	</head>
	<body>
		<div class="main">
			<div class="left-col" style="background-image: url(img/donald_d_chamberlin.jpg);">
				<a class="left-col-back-to-home" href=".">&lt; Back to home</a>
				<div class="left-col-number">- VI -</div>
				<div class="left-col-title">
					<div style="font-size: 88px; line-height: 50px;">INJECTION</div>
					<div style="font-size: 222px; line-height: 167px; margin-bottom: 70px;">SQL</div>
				</div>
				<div class="left-col-desc">
					SQL injection is a code injection technique, used to attack data-driven applications, in which malicious SQL statements are inserted into an entry field for execution (e.g. to dump the database contents to the attacker). SQL injection must exploit a security vulnerability in an application's software, for example, when user input is either incorrectly filtered for string literal escape characters embedded in SQL statements or user input is not strongly typed and unexpectedly executed.
					<div style="text-align:center; margin: 20px 0;">
						<a href="<?php echo $steps[6]->getWiki(); ?>" target="_blank">
							<img src="img/wiki.png" />
						</a>
					</div>
				</div>
				<div class="left-col-instructions">
					🏁 YOUR MISSION 🏁<br />
					Hack the database, and get the flag.
				</div>
			</div>
			<div class="right-col">
				<div class="right-col-content" style="text-align: center;">
				<?php
				if (!isset($_GET['id'])) {
					$id = 1;
				} else {
					$id = $_GET['id'];
				}
				
				include '../php/connex.php';

				// Create connection
				$conn = new mysqli($servername, $username, $password, $dbname);

				// Check connection
				if ($conn->connect_error) {
					die("Connection failed: " . $conn->connect_error);
				}

				$sql = "SELECT * FROM `data` WHERE `id` = $id";
				$result = $conn->query($sql);

				if ($result && $result->num_rows > 0) {
					while($row = $result->fetch_assoc()) {
						echo "<div class=\"quote\">" . $row["text"] . "</div>";
						echo "<div class=\"author\">" . $row["author"] . "</div>";
					}
					if ($id > 1) {
						echo "<a class=\"link\" href=\"".$steps[6]->getURL()."?id=".(intval($id) - 1)."\">Previous</a>";
					}
					if ($id < 1595) {
						echo "<a class=\"link\" href=\"".$steps[6]->getURL()."?id=". (intval($id) + 1) ."\">Next</a>";
					}
				} else {
					echo "This quote doesn't exists.";
				}
				$conn->close();
				?>
				</div>
			</div>
		</div>
		<?php include('../php/js.php'); ?>
		<?php 
		echo '<img style="display: none;" src="http://www.wawawoom.fr/geocaching/analytics/analytics.php?url='.'http://'. $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'].'&amp;name=Capture%20the%20Flag%20-%20Step%206" />';
		?>
	</body>
</html>