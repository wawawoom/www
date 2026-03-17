<?php
/*
Exemple d'utilisation:
Pour afficher l'image du checker 2
<img src="http://wawawoom.fr/geocaching/GC8M8NT/checker2.php?id=zxXYOiT2E" />

Si jamais quelqu'un essaye de jouer avec les id, du genre
<img src="http://wawawoom.fr/geocaching/GC8M8NT/checker2.php?id=trucbidule" />
<img src="http://wawawoom.fr/geocaching/GC8M8NT/checker2.php?id=" />
<img src="http://wawawoom.fr/geocaching/GC8M8NT/checker2.php?id" />
<img src="http://wawawoom.fr/geocaching/GC8M8NT/checker2.php" />
ca renvoie une image d'un checker coupé :)
*/

$ids = [];
$ids[] = (object) ["checkerNum" => 2, "id" => "zxXYOiT2E", "guid" => "6394840a952c6c5-ba79-489d-87e5-4401cb59690b"];
$ids[] = (object) ["checkerNum" => 3, "id" => "B6KpY0lyh", "guid" => "63948493cb5d73c-e2c9-4d4c-9514-f4a15c696aa8"];
$ids[] = (object) ["checkerNum" => 4, "id" => "4XEmmAF2j", "guid" => "6394850595509e0-b519-48bd-b0bd-d42a7d7598e0"];
$ids[] = (object) ["checkerNum" => 5, "id" => "vvSMCJ2fk", "guid" => "63948519ebf70ce-d483-4058-83f4-61f278fa1405"];
$ids[] = (object) ["checkerNum" => 6, "id" => "H_e1SQFkL", "guid" => "639485285075f0b-3432-4629-8a20-db70f71d59f7"];
$ids[] = (object) ["checkerNum" => 7, "id" => "B9Wnq6zdr", "guid" => "6394853b68df5e3-a4ab-44c0-af9f-d816f9f2f494"];
$ids[] = (object) ["checkerNum" => 8, "id" => "hTb_QGgBV", "guid" => "639485435d1b9f8-dfab-41be-9a63-26b8e979bace"];
$ids[] = (object) ["checkerNum" => 9, "id" => "Z6TSc6F4C", "guid" => "6394872aa2db9c4-9600-4f4f-80cf-a27842343f96"];
$ids[] = (object) ["checkerNum" => 10, "id" => "OaeOKCRUD", "guid" => "63948738459183f-4701-4512-aaa7-2dcb4f966dd8"];
$ids[] = (object) ["checkerNum" => 11, "id" => "wW5T4QVvJ", "guid" => "6394874cbfccb6e-a79c-4c8b-ad96-33a9670d7e94"];
$ids[] = (object) ["checkerNum" => 12, "id" => "Mady7yVDu", "guid" => "63948751184019f-39d9-4f61-ad69-d203ffe8bb59"];
$ids[] = (object) ["checkerNum" => 13, "id" => "4e7ey97FC", "guid" => "6394876caf651ef-f849-4ded-aba3-560cf5326a4a"];
$ids[] = (object) ["checkerNum" => 14, "id" => "nkPeN3NJh", "guid" => "6394877bc0dfe6c-a67f-479d-a04b-84534823c784"];
$ids[] = (object) ["checkerNum" => 15, "id" => "pYnPTfqym", "guid" => "6394878ae69e7e1-85f2-41da-a546-044e77f2865b"];
$ids[] = (object) ["checkerNum" => 16, "id" => "RVsPSOoBb", "guid" => "63948793c3a8745-16e9-45e1-95b6-5c14b2f1d313"];
$ids[] = (object) ["checkerNum" => 17, "id" => "ugyuIYhtH", "guid" => "639488074b9abc6-61f6-4889-bd85-77142da5a863"];
$ids[] = (object) ["checkerNum" => 18, "id" => "4w_jrG1Js", "guid" => "6395342a82c6142-a8e3-4437-83aa-b4e7e9fb9dbc"];
$ids[] = (object) ["checkerNum" => 19, "id" => "9nRprVWMp", "guid" => "6395343a4602b08-4547-49e6-b5b0-b490c3fe3fcb"];
$ids[] = (object) ["checkerNum" => 20, "id" => "4TnaFtswT", "guid" => "6395344f1ac082a-eaf8-468c-8a9d-2c3bb64c7d19"];

header('Content-type: image/png');

// check if the id param is set
if (!isset($_GET['id']) || $_GET['id'] === "") {
	echo file_get_contents("http://wawawoom.fr/geocaching/GC8M8NT/hacked.png"); 
}
else {
	$foundId = NULL;
	// check if the id param is found in the array definition
	foreach ($ids as $id) {
		if ($id->id === $_GET['id']) {
			$foundId = $id;
			break;
		}; 
	}

	if ($foundId !== NULL) {
		echo file_get_contents("https://geocheck.org/geocheck_small.php?gid=" . $foundId->guid );	
	} else {
		echo file_get_contents("http://wawawoom.fr/geocaching/GC8M8NT/hacked.png");
	}
}
?>