<?php include '../php/global.php'; ?>
<!doctype html>
<html lang="en">
	<head>
		<?php include('../php/meta.php'); ?>
	</head>
	<body>
		<?php
		$dir = 'messages';
		$messages = scandir($dir);

		foreach($messages as $message) {
			if ($message !== '.' && $message !== '..') {
				echo file_get_contents( $dir . '/' . $message );
				unlink ($dir . '/' . $message);
			}
		}
		?>
	</body>
</html>