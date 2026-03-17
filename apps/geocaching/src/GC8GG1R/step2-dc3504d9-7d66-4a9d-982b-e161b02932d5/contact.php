<?php include '../php/global.php'; ?>
<?php include '../php/inc.php'; ?>
<!doctype html>
<html lang="en">

<head>
  <?php include ('../php/meta.php'); ?>
  <title>Step 2 - GC8GG1R - Capture the Flag</title>
</head>

<body>
  <div class="main">
    <div class="left-col" style="background-image: url(img/jeremiah_grossmann.jpg);">
      <a class="left-col-back-to-home" href=".">&lt; Back to home</a>
      <div class="left-col-number">- II -</div>
      <div class="left-col-title">
        <div style="font-size: 240px; line-height: 184px;">XSS</div>
        <div style="font-size: 91px">INJECTION</div>
      </div>
      <div class="left-col-desc">
        Cross-site scripting (XSS) is a type of computer security vulnerability typically found in web applications. XSS
        enables attackers to inject client-side scripts into web pages viewed by other users.
        <div style="text-align:center; margin: 20px 0;">
          <a href="<?php echo $steps[2]->getWiki(); ?>" target="_blank">
            <img src="img/wiki.png" />
          </a>
        </div>
      </div>
      <div class="left-col-instructions">
        🏁 YOUR MISSION 🏁<br />
        Steal the administrator cookies.<br />
        Then login to get the Flag.
      </div>
    </div>
    <div class="right-col right-col-flex-start">
      <div class="right-col-content">
        <?php
				if (
					(isset($_POST['submit']) && $_POST['submit'] === 'Submit') &&
					(isset($_POST['message']) && $_POST['message'] !== '')
				) {
					// Save message in a txt file on hard drive
					$filename = 'messages/' . guidv4() . '.txt';
					try {
						file_put_contents($filename, $_POST['message']);
					} catch (Exception $e) {
						print_r($e);
					}

					echo '<div class="result success">
								The administrator will read your message within a minute (and will delete it after reading)<br />
								<hr />
								Your message: ' . $_POST['message'] . '
							</div>';
				}
				?>

        <ul class="nav nav-tabs mb-4">
          <li class="nav-item">
            <a class="nav-link" href="step2-dc3504d9-7d66-4a9d-982b-e161b02932d5/index.php">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="step2-dc3504d9-7d66-4a9d-982b-e161b02932d5/contact.php">Contact</a>
          </li>
        </ul>

        <form action="" method="post">
          <div class="form-group">
            <label for="message">Contact the administrator here.</label>

            <textarea name="message" class="form-control" id="message" rows="8"
              placeholder="Enter your message here"></textarea>

          </div>

          <div class="form-group mt-5">
            <input type="submit" name="submit" class="btn btn-danger" value="Submit" />
          </div>
        </form>

      </div>
    </div>
  </div>
  <?php include ('../php/js.php'); ?>
  <?php
	echo '<img style="display: none;" src="http://www.wawawoom.fr/geocaching/analytics/analytics.php?url=' . 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'] . '&amp;name=Capture%20the%20Flag%20-%20Step%202-ContactForm" />';
	?>
</body>

</html>