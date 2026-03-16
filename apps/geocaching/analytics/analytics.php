<?php
function getDomainFromURL($url)
{
	return parse_url($url, PHP_URL_HOST);
}

function returnImage()
{
	// Créer une image 1x1 pixel transparente
	$img = imagecreatetruecolor(1, 1);
	$transparent = imagecolorallocatealpha($img, 0, 0, 0, 127);
	imagefill($img, 0, 0, $transparent);
	imagesavealpha($img, true);

	// Envoyer les headers avant toute sortie
	header('Content-Type: image/png');
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Thu, 01 Jan 1970 00:00:00 GMT');

	// Générer et envoyer l'image
	imagepng($img);
	imagedestroy($img);
	exit;
}

function sendMail($message, $subject = '--- New stat ---')
{
	$to = 'geonissart@gmail.com';
	$subject = $subject;
	$message = $message;
	$headers = 'From: geonissart@gmail.com' . "\r\n"
		. 'Reply-To: geonissart@gmail.com' . "\r\n"
		. 'X-Mailer: PHP/' . phpversion();
	mail($to, $subject, $message, $headers);
}

function saveToDB($obj)
{
	// Utiliser le fichier de configuration SQL
	include (__DIR__ . '/../../cfg/sql.php');

	if (!$connex) {
		// Si la connexion échoue, ne pas bloquer l'affichage de l'image
		return;
	}

	// Échapper les valeurs pour éviter les injections SQL
	$referer = mysqli_real_escape_string($connex, $obj->STA_Referer);
	$domain = mysqli_real_escape_string($connex, $obj->STA_DomainName);
	$ip = mysqli_real_escape_string($connex, $obj->STA_IP);

	$query = "
		INSERT INTO 
			`stats` 
			(
				`STA_ID`, 
				`STA_Referer`, 
				`STA_DomainName`, 
				`STA_Timestamp`,
				`STA_IP`
			) 
		VALUES 
			(
				NULL, 
				'$referer', 
				'$domain',
				CURRENT_TIMESTAMP,
				'$ip'
			)
	";

	@mysqli_query($connex, $query);  // @ pour ignorer les erreurs et ne pas bloquer l'image
}

// Sauvegarder en DB seulement si referer existe (mais toujours afficher l'image)
if (!empty($_SERVER['HTTP_REFERER'])) {
	$object = (object) [
		'STA_Referer' => $_SERVER['HTTP_REFERER'],
		'STA_DomainName' => getDomainFromURL($_SERVER['HTTP_REFERER']),
		'STA_IP' => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : ''
	];

	saveToDB($object);

	if (isset($_GET['name'])) {
		@sendMail($_SERVER['REMOTE_ADDR'] . ' : ' . $_SERVER['HTTP_REFERER'], $_GET['name']);
	}
} else if (isset($_GET['url']) && $_GET['url'] != '') {
	if (isset($_GET['name'])) {
		@sendMail($_SERVER['REMOTE_ADDR'] . ' : ' . $_GET['url'], $_GET['name']);
	}
}

// Toujours retourner l'image, même en cas d'erreur
returnImage();
?>