<?php
include_once ('simple_image_class.php');
include_once ('utils.php');

class Kalei
{
	private $UPLOAD_DIR;

	public function __construct()
	{
		$this->UPLOAD_DIR = __DIR__ . '/../save/';
	}

	private function resultToArray($result)
	{
		$rows = array();
		while ($row = mysqli_fetch_object($result)) {
			$rows[] = $row;
		}
		return $rows;
	}

	private function showSqlError($connex, $query)
	{
		$errorMessage = 'MYSQL ERROR';

		$errorData['sqlQuery'] = $query;
		$errorData['sqlError'] = mysqli_error($connex);

		return $this->response($errorMessage, $errorData);
	}

	private function response($message, $data)
	{
		return json_encode(
			[
				'message' => $message,
				'data' => $data
			]
		);
	}

	/**
	 * Save kalei PNG
	 */
	public function dataImage64ToJpg($data64, $guid)
	{
		$img = $data64;
		$img = str_replace('data:image/png;base64,', '', $img);
		$img = str_replace(' ', '+', $img);
		$data = base64_decode($img);
		$file = $this->UPLOAD_DIR . $guid . '_o.png';
		file_put_contents($file, $data);

		// Resize the saved image 500px width
		$image = new SimpleImage($this->UPLOAD_DIR . $guid . '_o.png');
		$image->resizeToWidth(500);
		$image->save($this->UPLOAD_DIR . $guid . '_s.png');

		// Resize the saved image 2000px width
		$image = new SimpleImage($this->UPLOAD_DIR . $guid . '_o.png');
		$image->resizeToWidth(2000);
		$image->save($this->UPLOAD_DIR . $guid . '_b.png');
	}

	/**
	 * Save kalei datas
	 * @return boolean
	 */
	public function save($params)
	{
		include (__DIR__ . '/../../cfg/sql.php');

		$KAL_USE_FacebookID = $params['KAL_USE_FacebookID'];
		$KAL_Data = $params['KAL_Data'];
		$KAL_GUID = $params['KAL_GUID'];
		$KAL_LastUpdate = date('Y-m-d H:i:s');
		$KAL_Settings = $params['KAL_Settings'];
		$image64 = $params['image64'];

		$query = "
			SELECT COUNT(`KAL_GUID`) AS `KaleiCount` FROM `kalei_draw` WHERE `KAL_GUID` = '" . $KAL_GUID . "'";
		$res = mysqli_query($connex, $query);

		if (!mysqli_error($connex)) {
			// Save image of disk
			$this->dataImage64ToJpg($image64, $KAL_GUID);

			// Create new entry in DB
			if (mysqli_fetch_object($res)->KaleiCount == 0) {
				$queryAdd = "
					INSERT INTO `kalei_draw` 
					(
						`KAL_USE_FacebookID`, 
						`KAL_Data`,
						`KAL_GUID`,
						`KAL_LastUpdate`,
						`KAL_Settings`
					) 
					VALUES 
					(
						'" . $KAL_USE_FacebookID . "', 
						'" . $KAL_Data . "',
						'" . $KAL_GUID . "',
						'" . $KAL_LastUpdate . "',
						'" . $KAL_Settings . "'
					); 
					";
				$resAdd = mysqli_query($connex, $queryAdd);

				if (!mysqli_error($connex)) {
					return $this->response('CREATE KALEI DONE', NULL);
				} else {
					header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
					return $this->showSqlError($connex, $queryAdd);
				}
			} else {
				$queryUpdate = "
					UPDATE `kalei_draw` 
					SET
						`KAL_Data` = '" . $KAL_Data . "',
						`KAL_LastUpdate` = '" . $KAL_LastUpdate . "',
						`KAL_Settings` = '" . $KAL_Settings . "'
					WHERE
						`KAL_GUID` = '$KAL_GUID'
					;";

				$resUpdate = mysqli_query($connex, $queryUpdate);

				if (!mysqli_error($connex)) {
					return $this->response('UPDATE KALEI DONE', NULL);
				} else {
					header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
					return $this->showSqlError($connex, $queryUpdate);
				}
			}
		} else {
			header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
			return $this->showSqlError($connex, $query);
		}

		mysqli_close($connex);
	}

	/**
	 * Save kalei datas
	 * @return boolean
	 */
	public function checkUser($params)
	{
		include (__DIR__ . '/../../cfg/sql.php');

		$USE_FacebookID = $params['userID'];
		$USE_Email = $params['email'];
		$USE_DisplayName = $params['name'];
		$USE_LastLoginDateTime = date('Y-m-d H:i:s');

		$query = "
			SELECT COUNT(`USE_ID`) AS `UsersCount` FROM `kalei_user` WHERE `USE_FacebookID` = '" . $USE_FacebookID . "'";
		$res = mysqli_query($connex, $query);

		if (!mysqli_error($connex)) {
			// Create new entry in DB
			if (mysqli_fetch_object($res)->UsersCount == 0) {
				$queryInsert = "
					INSERT INTO `kalei_user` 
					(
						`USE_ID`, 
						`USE_Email`, 
						`USE_DisplayName`, 
						`USE_FacebookID`,
						`USE_LastLoginDateTime`
					) 
					VALUES 
					(
						'', 
						'" . $USE_Email . "', 
						'" . $USE_DisplayName . "', 
						'" . $USE_FacebookID . "',
						'" . $USE_LastLoginDateTime . "'
					);
				";
				$resInsert = mysqli_query($connex, $queryInsert);

				if (!mysqli_error($connex)) {
					return $this->response('NEW USER', NULL);
				} else {
					header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
					return $this->showSqlError($connex, $queryInsert);
				}
			}
			// User already exists id DB
			// Just update the value of the last login date time
			else {
				$queryUpdate = "
					UPDATE `kalei_user` 
					SET 
						`USE_LastLoginDateTime` = '" . $USE_LastLoginDateTime . "' 
					WHERE 
						`USE_FacebookID` = '" . $USE_FacebookID . "';
				";
				$resUpdate = mysqli_query($connex, $queryUpdate);

				if (!mysqli_error($connex)) {
					return $this->response('EXISTING USER', NULL);
				} else {
					header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
					return $this->showSqlError($connex, $queryUpdate);
				}
			}
		} else {
			return $this->showSqlError($connex, $query);
		}

		mysqli_close($connex);
	}

	public function loadKalei($params)
	{
		$KAL_GUID = $params['KAL_GUID'];

		$GET_Data = isset($params['GET_Data']) && $params['GET_Data'] == false ? false : true;

		include (__DIR__ . '/../../cfg/sql.php');

		// Vérifier que la connexion a réussi
		if (!$connex) {
			header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
			return $this->response('Database connection failed', ['error' => 'Unable to connect to database']);
		}

		$query = '
			SELECT 
				' . ($GET_Data ? 'MAX(`KAL_Data`) AS `KAL_Data`,' : '') . " 
				MAX(`KAL_LastUpdate`) AS `KAL_LastUpdate`, 
				MAX(`KAL_Settings`) AS `KAL_Settings`, 
				MAX(`KAL_USE_FacebookID`) AS `KAL_USE_FacebookID`,
				MAX(`USE_DisplayName`) AS `USE_DisplayName`,
				COUNT(LIK_ID) AS `LikeCount`
			FROM `kalei_draw`
				LEFT JOIN `kalei_draw_like` ON (`KAL_GUID` = `LIK_KAL_GUID`)
				LEFT JOIN `kalei_user` ON (`KAL_USE_FacebookID` = `USE_FacebookID`)
			WHERE 
				`KAL_GUID` = '" . $KAL_GUID . "' 
			GROUP BY `KAL_GUID` 
		";

		$res = mysqli_query($connex, $query);

		if (!mysqli_error($connex)) {
			$arr = $this->resultToArray($res);

			// Check if the kalei exists
			if (sizeof($arr) == 0) {
				header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
				return $this->response('This Kaleï does not exists anymore.', NULL);
			}

			$arr[0]->currentUserLike = $this->doesUserLikesKalei($KAL_GUID, true);
			return $this->response('KALEI', $arr);
		} else {
			header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
			return $this->showSqlError($connex, $query);
		}

		mysqli_close($connex);
	}

	public function getMyKaleis()
	{
		include (__DIR__ . '/../../cfg/sql.php');

		$query = "
			SELECT 
				`KAL_GUID`, 
				MAX(`KAL_LastUpdate`) AS `KAL_LastUpdate`, 
				MAX(`USE_DisplayName`) AS `USE_DisplayName`,
				COUNT(LIK_ID) AS `LikeCount`
			FROM `kalei_draw`
				LEFT JOIN `kalei_user` ON (`KAL_USE_FacebookID` = `USE_FacebookID`)
				LEFT JOIN `kalei_draw_like` ON (`LIK_KAL_GUID` = `KAL_GUID`)
			WHERE 
				`KAL_USE_FacebookID` = '" . $_COOKIE['kaleiUserID'] . "' 
			GROUP BY `KAL_GUID` 
			ORDER BY MAX(`KAL_LastUpdate`) DESC
		";
		$res = mysqli_query($connex, $query);

		if (!mysqli_error($connex)) {
			$arr = $this->resultToArray($res);

			for ($i = 0; $i < sizeof($arr); $i++) {
				$arr[$i]->currentUserLike = $this->doesUserLikesKalei($arr[$i]->KAL_GUID, true);
			}

			return $this->response('MY KALEIS', $arr);
		} else {
			header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
			return $this->showSqlError($connex, $query);
		}

		mysqli_close($connex);
	}

	public function getFamousKaleis()
	{
		include (__DIR__ . '/../../cfg/sql.php');

		$query = '
			SELECT 
				`KAL_GUID`, 
				MAX(`KAL_LastUpdate`) AS `KAL_LastUpdate`, 
				MAX(`USE_DisplayName`) AS `USE_DisplayName`,
				COUNT(LIK_ID) AS `LikeCount`
			FROM `kalei_draw`
				LEFT JOIN `kalei_user` ON (`KAL_USE_FacebookID` = `USE_FacebookID`)
				LEFT JOIN `kalei_draw_like` ON (`LIK_KAL_GUID` = `KAL_GUID`)
			WHERE `LIK_ID` IS NOT NULL 
			GROUP BY `KAL_GUID` 
			ORDER BY `LikeCount` DESC
			LIMIT 0, 9 
		';

		$res = mysqli_query($connex, $query);

		if (!mysqli_error($connex)) {
			$arr = $this->resultToArray($res);

			for ($i = 0; $i < sizeof($arr); $i++) {
				if (!isset($_COOKIE['kaleiUserID'])) {
					$arr[$i]->currentUserLike = false;
				} else {
					$arr[$i]->currentUserLike = $this->doesUserLikesKalei($arr[$i]->KAL_GUID, true);
				}
			}

			return $this->response('FAMOUS KALEI', $arr);
		} else {
			header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
			return $this->showSqlError($connex, $query);
		}

		mysqli_close($connex);
	}

	public function getLatestKaleis()
	{
		include (__DIR__ . '/../../cfg/sql.php');

		$query = '
			SELECT 
				`KAL_GUID`, 
				MAX(`KAL_LastUpdate`) AS `KAL_LastUpdate`, 
				MAX(`USE_DisplayName`) AS `USE_DisplayName`,
				MAX(`KAL_ID`) AS `KAL_ID`,
				COUNT(LIK_ID) AS `LikeCount`
			FROM `kalei_draw`
				LEFT JOIN `kalei_user` ON (`KAL_USE_FacebookID` = `USE_FacebookID`)
				LEFT JOIN `kalei_draw_like` ON (`LIK_KAL_GUID` = `KAL_GUID`)
			GROUP BY `KAL_GUID` 
			ORDER BY MAX(`KAL_ID`) DESC
			LIMIT 0, 9 
		';

		$res = mysqli_query($connex, $query);

		if (!mysqli_error($connex)) {
			$arr = $this->resultToArray($res);

			for ($i = 0; $i < sizeof($arr); $i++) {
				if (!isset($_COOKIE['kaleiUserID'])) {
					$arr[$i]->currentUserLike = false;
				} else {
					$arr[$i]->currentUserLike = $this->doesUserLikesKalei($arr[$i]->KAL_GUID, true);
				}
			}

			return $this->response('LATEST KALEI', $arr);
		} else {
			header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
			return $this->showSqlError($connex, $query);
		}

		mysqli_close($connex);
	}

	private function testKaleiAuthor($KAL_GUID)
	{
		include (__DIR__ . '/../../cfg/sql.php');

		$query = "
			SELECT 
				COUNT(`KAL_GUID`) AS `userIsTheAuthorOfKalei`
			FROM `kalei_draw` 
			WHERE 
				`KAL_USE_FacebookID` = '" . $_COOKIE['kaleiUserID'] . "' AND 
				`KAL_GUID`  = '" . $KAL_GUID . "';
			";
		$res = mysqli_query($connex, $query);

		if (!mysqli_error($connex)) {
			return mysqli_fetch_object($res)->userIsTheAuthorOfKalei >= 1;
		} else {
			header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
			return $this->showSqlError($connex, $query);
		}

		mysqli_close($connex);
	}

	public function removeKalei($params)
	{
		$KAL_GUID = $params['KAL_GUID'];

		if ($this->testKaleiAuthor($KAL_GUID)) {
			include (__DIR__ . '/../../cfg/sql.php');

			$query = "DELETE FROM `kalei_draw` WHERE `KAL_GUID` = '" . $KAL_GUID . "';";
			$res = mysqli_query($connex, $query);

			if (!mysqli_error($connex)) {
				$this->removeAllLikesFromSpecificKalei($KAL_GUID);

				$this->removeKaleiPNGfile($this->UPLOAD_DIR . $KAL_GUID . '_o.png');
				$this->removeKaleiPNGfile($this->UPLOAD_DIR . $KAL_GUID . '_b.png');
				$this->removeKaleiPNGfile($this->UPLOAD_DIR . $KAL_GUID . '_s.png');

				return $this->response('Your Kaleï has been removed.', NULL);
			} else {
				header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
				return $this->showSqlError($connex, $query);
			}

			mysqli_close($connex);
		} else {
			header($_SERVER['SERVER_PROTOCOL'] . ' 403 Forbidden', true, 403);
			return $this->response("You're not authorized to remove this Kaleï", NULL);
		}
	}

	private function removeKaleiPNGfile($filename)
	{
		if (is_file($filename)) {
			chmod($filename, 0777);

			if (unlink($filename)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	public function removeAllLikesFromSpecificKalei($KAL_GUID)
	{
		include (__DIR__ . '/../../cfg/sql.php');

		$query = "DELETE FROM `kalei_draw_like` WHERE `LIK_KAL_GUID` = '" . $KAL_GUID . "';";
		$res = mysqli_query($connex, $query);

		if (!mysqli_error($connex)) {
			return $this->response('LIKES WHERE REMOVED', NULL);
		} else {
			header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
			return $this->showSqlError($connex, $query);
		}

		mysqli_close($connex);
	}

	public function doesUserLikesKalei($KAL_GUID, $returnBoolean = false)
	{
		if (gettype($KAL_GUID) === 'array') {
			$KAL_GUID = $KAL_GUID['KAL_GUID'];
		}

		if (!isset($_COOKIE['kaleiUserID'])) {
			if ($returnBoolean) {
				return false;
			} else {
				return $this->response('CURRENT USER LIKES KALEI', false);
			}
		}

		include (__DIR__ . '/../../cfg/sql.php');

		$query = "
			SELECT 
				COUNT(`LIK_ID`) AS `userLikesKalei`
			FROM `kalei_draw_like` 
			WHERE 
				`LIK_USE_FacebookID` = '" . $_COOKIE['kaleiUserID'] . "' AND 
				`LIK_KAL_GUID`  = '" . $KAL_GUID . "';
			";
		$res = mysqli_query($connex, $query);

		if (!mysqli_error($connex)) {
			if ($returnBoolean) {
				return mysqli_fetch_object($res)->userLikesKalei >= 1;
			} else {
				return $this->response('CURRENT USER LIKES KALEI', mysqli_fetch_object($res)->userLikesKalei >= 1);
			}
		} else {
			header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
			return $this->showSqlError($connex, $query);
		}

		mysqli_close($connex);
	}

	public function likeKalei($params)
	{
		$KAL_GUID = $params['KAL_GUID'];
		$LIK_Date = date('Y-m-d H:i:s');

		include (__DIR__ . '/../../cfg/sql.php');

		// If current user don't actually likes the kalei
		if (!$this->doesUserLikesKalei($KAL_GUID, true)) {
			$queryLike = "
				INSERT INTO `kalei_draw_like` 
					(
						`LIK_ID`, 
						`LIK_KAL_GUID`, 
						`LIK_USE_FacebookID`, 
						`LIK_Date`
					) 
				VALUES 
					(
						NULL, 
						'" . $KAL_GUID . "', 
						'" . $_COOKIE['kaleiUserID'] . "', 
						'" . $LIK_Date . "'
					);
			";
			$res = mysqli_query($connex, $queryLike);

			if (!mysqli_error($connex)) {
				return $this->response('LIKE SAVED', $this->getKaleilikesCount($KAL_GUID));
			} else {
				header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
				return $this->showSqlError($connex, $queryLike);
			}
		} else {
			$queryUnlike = "
				DELETE FROM `kalei_draw_like` 
				WHERE 
					`LIK_USE_FacebookID` = '" . $_COOKIE['kaleiUserID'] . "' AND 
					`LIK_KAL_GUID` = '" . $KAL_GUID . "'
			";
			$res = mysqli_query($connex, $queryUnlike);

			if (!mysqli_error($connex)) {
				return $this->response('UNLIKE SAVED', $this->getKaleilikesCount($KAL_GUID));
			} else {
				header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
				return $this->showSqlError($connex, $queryUnlike);
			}
		}

		mysqli_close($connex);
	}

	public function getKaleilikesCount($KAL_GUID)
	{
		include (__DIR__ . '/../../cfg/sql.php');

		$query = "
			SELECT COUNT(`LIK_ID`) AS `KaleiLikeCount` 
			FROM `kalei_draw_like`
			WHERE 
			`LIK_KAL_GUID` = '$KAL_GUID'
		";
		$res = mysqli_query($connex, $query);

		if (!mysqli_error($connex)) {
			return mysqli_fetch_object($res)->KaleiLikeCount;
		} else {
			header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
			return $this->showSqlError($connex, $query);
		}

		mysqli_close($connex);
	}
}

?>