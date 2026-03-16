<?php
error_reporting(E_ALL);

class User
{
	private $USE_Id;
	private $USE_Email;
	private $USE_Password;
	private $USE_PasswordMD5;

	private function checkCredentials($USE_Email, $USE_Password, $createCookies = false)
	{
		include dirname(__FILE__) . '/../../cfg/sql.php';

		$sql = mysqli_query($connex, "SELECT count(*) FROM `tictac_users` WHERE `USE_Email`= '$USE_Email' AND `USE_Password` = '$USE_Password' ");
		if (!$sql) {
			die('Impossible d\'exécuter la requête :' . mysqli_error($connex));
		}
		$data = mysqli_fetch_array($sql);
		mysqli_free_result($sql);

		if ($data[0] > 0) {
			if ($createCookies) {
				// SET COOKIES
				setcookie("USE_Email", "", time() - 48 * 360000, "/"); // Desctruction ancien cookie
				setcookie("USE_Email", $USE_Email, time() + 360000, '/'); // Création cookie

				setcookie("USE_Password", "", time() - 48 * 360000, "/"); // Desctruction ancien cookie
				setcookie("USE_Password", $USE_Password, time() + 360000, '/'); // Création cookie
			}
			return true;

		} else {
			return false;
		}
	}

	public function login($USE_Email, $USE_Password)
	{

		if (isset($USE_Email) && isset($USE_Password)) {
			return $this->checkCredentials($USE_Email, $USE_Password, true);
		} else {
			return false;
		}


	}

	public function register($USE_Email, $USE_Password)
	{

		if (
			(isset($USE_Email) && !empty($USE_Email)) &&
			(isset($USE_Password) && !empty($USE_Password))
		) {

			$atom = '[-a-z0-9!#$%&\'*+\\/=?^_`{|}~]';   // caractères autorisés avant l'arobase
			$domain = '([a-z0-9]([-a-z0-9]*[a-z0-9]+)?)'; // caractères autorisés après l'arobase (nom de domaine)

			$regex = '/^' . $atom . '+' .   // Une ou plusieurs fois les caractères autorisés avant l'arobase
				'(\.' . $atom . '+)*' .         // Suivis par zéro point ou plus
				// séparés par des caractères autorisés avant l'arobase
				'@' .                           // Suivis d'un arobase
				'(' . $domain . '{1,63}\.)+' .  // Suivis par 1 à 63 caractères autorisés pour le nom de domaine
				// séparés par des points
				$domain . '{2,63}$/i';          // Suivi de 2 à 63 caractères autorisés pour le nom de domaine


			// Teste la validité de l'email
			if (preg_match($regex, $USE_Email)) {

				include dirname(__FILE__) . '/../../cfg/sql.php';

				// Check if user already exists
				$sql = mysqli_query($connex, "SELECT count(*) FROM `tictac_users` WHERE `USE_Email`= '$USE_Email'");
				if (!$sql) {
					die('Impossible d\'exécuter la requête :' . mysqli_error($connex));
				}
				$data = mysqli_fetch_array($sql);
				mysqli_free_result($sql);

				// User already exists
				if ($data[0] > 0) {
					return 'This email is already used by another user';

				} else {
					// User don't exists, i can create it.
					$USE_RegisterDate = date('Y-m-d H:i:s');
					$USE_LastConnexionDate = date('Y-m-d H:i:s');
					$sql = mysqli_query($connex, "
										INSERT INTO 
											`tictac_users` 
										VALUES (
											NULL,
											'$USE_Email',
											'$USE_Password',
											'$USE_RegisterDate',
											'$USE_LastConnexionDate'
										);");
					if (!$sql) {
						die('Impossible d\'exécuter la requête :' . mysqli_error($connex));
					}

					// Create cookies
					return $this->checkCredentials($USE_Email, $USE_Password, true);

				}
			} else {
				return 'Your email is not a valid email.';
			}

		} else {
			return 'Please fill in email and password';
		}

	}

	public function getUserId($USE_Email)
	{
		include dirname(__FILE__) . '/../../cfg/sql.php';
		$sql = mysqli_query($connex, "SELECT USE_Id FROM `tictac_users` WHERE `USE_Email`= '$USE_Email'");
		if (!$sql) {
			die('Impossible d\'exécuter la requête :' . mysqli_error($connex));
		}
		$data = mysqli_fetch_array($sql);
		mysqli_free_result($sql);
		return $data['USE_Id'];
	}

	public function logout()
	{
		setcookie("USE_Email", "", time() - 48 * 36000, "/");
		setcookie("USE_Password", "", time() - 48 * 36000, "/");
		header("Location: index.php");
	}

	public function checkAuth()
	{

		if (isset($_COOKIE['USE_Email']) && $_COOKIE['USE_Email'] != '') {
			$USE_Email = $_COOKIE['USE_Email'];
		} else {
			return false;
		}

		if (isset($_COOKIE['USE_Password']) && $_COOKIE['USE_Password'] != '') {
			$USE_Password = $_COOKIE['USE_Password'];
		} else {
			return false;
		}

		if (isset($USE_Email) && isset($USE_Password)) {
			return $this->checkCredentials($USE_Email, $USE_Password);
		} else {
			return false;
		}
	}
}
?>