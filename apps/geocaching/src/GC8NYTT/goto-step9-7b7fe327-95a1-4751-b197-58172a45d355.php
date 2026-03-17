<?php
include_once('./inc/php/config.php');
include_once('./inc/php/db.php');

$user = getUser();

if ($user === NULL) {
	header('Location: ./login.php?redirect='.urlencode($QRCODE_BAS_URL));
	exit();
}
?>

<!DOCTYPE html>
<html lang="en" class="invert">
    <head>
        <meta charset="utf-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossorigin="anonymous"
        />
        <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap"
            rel="stylesheet"
        />
        <link rel="stylesheet" href="./inc/css/styles.css" />

        <title>QR Code Bas - Cauchemar</title>
    </head>
    <body>
        <div id="main">
            <div id="leftCol" class="withMap">
				<div id="map"></div>
            </div>
            <div id="rightCol">
                
                <img src="./inc/img/background-invert.png" id="back" />

                <div id="content" class="smallPadding">
                    
                    <div id="banner">
                        Bonne journée <?php echo $user->USE_Pseudo; ?>. 
                        <a href="./logout.php">Déconnexion</a><br />
                        <small>Votre numéro d'insomniaque: <?php echo $user->USE_GUID; ?></small>
                    </div>
                
                    <h1>Bravo.</h1>
                    <p>
						Vous venez de scanner le QR Code "BAS". Je dois ensuite m'assurer que vous êtes bien sur place... 
						Appuyez sur le bouton ci dessous, jusqu'à ce que le marqueur soit dans la zone verte. 
						Vous devez être dans un rayon de <?php echo $QR_RADIUS_VALIDITY; ?> mètres pour valider cette étape.
						<br /><br />
						<img src="./inc/img/loader.gif" id="loader" />
						<input type="button" id="posButton" value="envoyer position" />
					</p>
					
                    <div class="alert alert-danger" id="too-far" style="display:none;" role="alert">
						Vous êtes trop loin, rapprochez vous du Waypoint "BAS"
					</div>
                </div>
            </div>
        </div>

        <?php
        include_once('./inc/php/scripts.php');
		?>
		
        <script>
			
			var map;
			var startCoord = {lat: 43.859917, lng: 7.227117};
			var qrCodePosPHP = '<?php echo $QR_BAS_COORDS_DEC; ?>'.split(',');
			var radiusValid = <?php echo $QR_RADIUS_VALIDITY; ?>;
			var qrCodePos;
			var circle;
			var userCoord;
			var marker;
			
			// credits to user:69083 for this specific function
			function positionIsInArea(checkPoint, centerPoint, meters) { 
				var ky = 40000 / 360;
				var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
				var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
				var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
				return Math.sqrt(dx * dx + dy * dy) <= (meters / 1000);
			}

			function initMap() {
				map = new google.maps.Map(document.getElementById('map'), {
					center: {lat: startCoord.lat, lng: startCoord.lng},
					zoom: 12
				});
 
				userCoord = new google.maps.LatLng(startCoord.lat, startCoord.lng);
				qrCodePos = new google.maps.LatLng(qrCodePosPHP[0], qrCodePosPHP[1]);

				circle = new google.maps.Circle({
					strokeColor: '#00b609',
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: '#00ff0c',
					fillOpacity: 0.35,
					map: map,
					center: {lat: qrCodePos.lat(), lng: qrCodePos.lng()},
					radius: radiusValid
				});
				
				marker = new google.maps.Marker({
					position: userCoord,
					map: map,
					title: 'Votre signal GPS est ici.'
				});
			}


			var posButton = document.getElementById('posButton');


			$('#posButton')
			.on('click', function () {
				
				var startPos;
				
				$('#loader').show('slow');
				$('#posButton').hide('slow');
				$('#too-far').hide();

				var geoSuccess = function(position) {
					
					$('#loader').hide('slow');
					$('#posButton').show('slow');

					if (position && position.coords) {
						userCoord.lat = position.coords.latitude;
						userCoord.lng = position.coords.longitude;
						marker.setPosition( new google.maps.LatLng( userCoord.lat, userCoord.lng ) );
						map.panTo( new google.maps.LatLng( userCoord.lat, userCoord.lng) );

						// Check if the user is in the acceptable zone
						if (positionIsInArea(
							userCoord,
							{
								lat: qrCodePos.lat(),
								lng: qrCodePos.lng(),
							},
							radiusValid
							)
						) {
							alert('Ok, vous êtes dans la zone. Soyez prêt pour la suite ca va piquer !')
							window.location = window.location.href.replace('.php', '-7b7fe327.php');
						} else {
							$('#too-far').show();
						}
					}
				};

				var geoError = function(error) {
					alert(error);
				};
				
				navigator.geolocation.getCurrentPosition(
					geoSuccess, 
					geoError,
					{
						maximumAge:10000, 
						timeout:10000, 
						enableHighAccuracy: true
					}
				);

			});
		</script>
		
		<script 
			async 
			defer 
			src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDpfqZ0NEkB7u72mf0gFirSMPicmXV34X4&callback=initMap"
			  type="text/javascript"></script>
    </body>
</html>