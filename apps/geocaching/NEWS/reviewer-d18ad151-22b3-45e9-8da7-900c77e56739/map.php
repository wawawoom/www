<?php
include_once("inc/globals.php");
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<title>News</title>

<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="./map/tingle.min.css" />
<style>
	html, body {
		height: 100%;
		margin: 0;
		padding: 28px 0 0 0;
		font-family: helvetica;
	}
	.navbar {
		z-index: 800 !important;
	}
	#controller {
		width: auto;
		height: auto;
		position: absolute;
		bottom: 11px;
		left: 11px;
		background-color: white;
		z-index: 2;
		padding: 3px 8px;
		font-family: helvetica;
		font-size: 11px;
	}
	#cacheSelector {
		width: 100%;
	}
	.hidden {
		display: none !important;
	}

	.starter-template {
		padding: 3rem 1.5rem;
		text-align: center;
	}

	.imageEnigme {
		width: 147px;
		margin: 3px;
	}

	#map {
		height: 100%;
	}
</style>

</head>

<body>

	<?php include('inc/nav.php'); ?>

	<div id="list"></div>
	<div id="map"></div>
	<div id="controller">
		<div id="filters">
			<label for="listings">
				<input type="checkbox" value="listings" id="listings" /> Listings
			</label>
			<label for="boxes">
				<input type="checkbox" value="boxes" id="boxes" checked="checked" /> Boxes
			</label>
			<label for="circles">
				<input type="checkbox" value="circles" id="circles" /> 161m.
			</label>
		</div>
		<div style="margin-top: 5px; padding-bottom: 5px;">
			<select id="cacheSelector">
				<option value="all">All</option>
				<?php
				try {
					$mysqli = new mysqli($SERVER, $USER, $PASSWORD, $DATABASE);
					$mysqli->set_charset("utf8");

					$query = "SELECT ID, Name FROM caches ORDER BY ID ASC";
					
					if ($result = $mysqli->query($query)) {
							while ($row = $result->fetch_array(MYSQLI_BOTH)) {
								echo '<option value="'.$row['ID'].'">'.$row['ID'].'-'.$row['Name'].'</option>';
							}
							$result->free();
					}
				} 
				catch (mysqli_sql_exception $e) {
						echo "MySQLi Error Code: " . $e->getCode() . "<br />";
						echo "Exception Msg: " . $e->getMessage();
						exit; // exit and close connection.
				}
				$mysqli->close(); // finally, close the connection
				?>
			</select>
		</div>
	</div>
	
	<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
	<script src="./map/tingle.min.js"></script>
	<script async defer src="https://maps.googleapis.com/maps/api/js?&libraries=geometry&key=AIzaSyB09Pbnmzz4zfTEiM0p1W4siCf8xYM2o1U&callback=initMap"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

	<script>
		
		var map;
		var listings;
		var boxes;
		var modal;

		var initMap = function () {

			listings = [

				<?php
				try {
					$mysqli = new mysqli($SERVER, $USER, $PASSWORD, $DATABASE);
					$mysqli->set_charset("utf8");

					$query = "SELECT * FROM caches ORDER BY ID ASC";
					
					if ($result = $mysqli->query($query)) {
							while ($row = $result->fetch_array(MYSQLI_BOTH)) {

								$latlng = explode(', ', $row['CoordListing']);
								$description = $row['ID'] == 80 ? '' : addslashes($row['Description']);

								echo "{";
								echo "id: ".$row['ID'].", ";
								echo "lat: ".$latlng[0].", ";
								echo "lng: ".$latlng[1].", ";
								echo "gc: '".$row['GC']."', ";
								echo "checker: '".addslashes($row['CoordCheckerDegreesMinutes'])."', ";
								echo "checkerID: '".$row['CheckerID']."', ";
								echo "box: '".$row['BoxCoordDegreesMinutes']."', ";
								echo "place: '".$description."', ";
								echo "guidSpoiler: '".$row['GUID_Spoiler']."', ";
								echo "boxId: ".$row['BoxID']."},\r\n";
							}
							$result->free();
					}
				} 
				catch (mysqli_sql_exception $e) {
						echo "MySQLi Error Code: " . $e->getCode() . "<br />";
						echo "Exception Msg: " . $e->getMessage();
						exit; // exit and close connection.
				}
				$mysqli->close(); // finally, close the connection
				?>
			];

			boxes = [
				<?php
				try {
					$mysqli = new mysqli($SERVER, $USER, $PASSWORD, $DATABASE);
					$mysqli->set_charset("utf8");

					$query = "SELECT * FROM caches ORDER BY BoxID ASC";
					
					if ($result = $mysqli->query($query)) {
							while ($row = $result->fetch_array(MYSQLI_BOTH)) {

								$latlng = explode(', ', $row['BoxCoord']);
								
								echo "{";
								echo "id: ".$row['BoxID'].", ";
								echo "lat: ".$latlng[0].", ";
								echo "lng: ".$latlng[1].", ";
								echo "icon: 'map/groupA.png', ";
								echo "status: 'done'},\r\n";
							}
							$result->free();
					}
				} 
				catch (mysqli_sql_exception $e) {
						echo "MySQLi Error Code: " . $e->getCode() . "<br />";
						echo "Exception Msg: " . $e->getMessage();
						exit; // exit and close connection.
				}
				$mysqli->close(); // finally, close the connection
				?>

			];


			var startMap = function () {
				map = new google.maps.Map(
					document.getElementById("map"),
					{
						center: new google.maps.LatLng(43.762950, 7.240733),
						zoom: 12,
						//mapTypeId: google.maps.MapTypeId.SATELLITE
					}
				);
				map.setTilt(0); // Removes 45°
			}
			
			var getListingFromId = function (id) {
				for (var i = 0; i < listings.length; i++) {
					if (id === listings[i].id) {
						return listings[i];
					}
				}
			}

			var getListingFromBoxId = function (id) {
				for (var i = 0; i < listings.length; i++) {
					if (id === listings[i].boxId) {
						return listings[i];
					}
				}
			}

			var placeListings = function () {
				
				for (var i = 0; i < listings.length ; i++) {
					listings[i].marker = new google.maps.Marker(
						{
							map: map,
							position: new google.maps.LatLng(listings[i].lat, listings[i].lng),
							title: 'LISTING_ID: ' + listings[i].id,
							o: listings[i],
							icon: 'map/intero.png',
							customInfo: "Marker A"
						}
					);
					
					if (listings[i].boxId) {
						for (var j=0; j < boxes.length; j++) {
							if (boxes[j].id === listings[i].boxId) {
								boxes[j].used = true;
								break;
							}
						}
						
					}
					listings[i].marker.addListener('click', function() {
								console.log('LISTING: ' + this.title);
									drawCircle(this.internalPosition.lat(), this.internalPosition.lng());
							});
				}
			}

			var placeBoxes = function () {
				
				for (var i = 0; i < boxes.length ; i++) {
					
					boxes[i].marker = new google.maps.Marker(
						{
							map: map,
							position: new google.maps.LatLng(boxes[i].lat, boxes[i].lng),
							title: 'BOX_ID: ' + boxes[i].id,
							o: getListingFromBoxId(boxes[i].id),
							icon: boxes[i].id === 80 ? 'map/multi.png' : 'map/box.png'
						}
					);


					boxes[i].marker.addListener('click', function() {

								// instanciate new modal
						modal = new tingle.modal({
								footer: false,
								stickyFooter: false,
								closeMethods: ['button'],
								closeLabel: "Close",
								cssClass: ['custom-class-1', 'custom-class-2'],
								onOpen: function() {
										//console.log('modal open');
								},
								onClose: function() {
										//console.log('modal closed');
								},
								beforeClose: function() {
										// here's goes some logic
										// e.g. save content before closing the modal
										return true; // close the modal
										//return false; // nothing happens
								}
						});

						var listing = getListingFromId(this.o.id);
						
						var _html = '';

						_html += '<h1 style="margin-top: 0;">' + listing.place + '</h1>';
						_html += '<p style="line-height: 130%">';
						_html += 'GCCODE: <strong>' + listing.gc + '</strong><br />';
						_html += 'CACHE ID: <strong>' + listing.id + '</strong><br />';
						_html += 'BOX ID: <strong>' + listing.boxId + '</strong><br />';
						_html += 'COORDINATES CHECKER: <strong>' + listing.checker + '</strong><br />';
						_html += 'COORDINATES BOX: <strong>' + listing.box + '</strong>';
						_html += '</p>';
						_html += '<a target="_blank" href="https://www.waze.com/ul?ll=' + this.position.lat() + '%2C' + this.position.lng() + '&navigate=yes&zoom=17">WAZE</a><br /><br />';
						_html += '<a target="_blank" href="https://coord.info/' + listing.gc + '">GEOCACHING APP</a><br /><br />';
						
						_html += '<div style="margin: 20px 0;"><a target="_blank" href="http://geocheck.org/geo_inputchkcoord.php?gid='+listing.checkerID+'" rel="noopener noreferrer"><img src="http://geocheck.org/geocheck_small.php?gid='+listing.checkerID+'" title="Check your solution" border="0"></a></div>';
						_html += '<img src="http://www.wawawoom.fr/geocaching/NEWS/' + listing.id + '/spoiler-' + listing.guidSpoiler + '.jpg" style="max-width: 100%;" />';


						// set content
						modal.setContent(_html);

						// open modal
						modal.open();

					});
				}
			}

			var placesCircles = function () {

				for (var i = 0; i < boxes.length ; i++) {
					boxes[i].circle = new google.maps.Circle({
									strokeColor: '#FFFFFF',
									strokeOpacity: 0.5,
									strokeWeight: 2,
									fillColor: '#FF0000',
									fillOpacity: 0.25,
									map: map,
									center: {lat: boxes[i].lat, lng: boxes[i].lng},
									radius: 161
							});
					}

			}

			
			var circle32;

			var drawCircle = function (lat, lng) {
				
				if (!circle32) {
					circle32 = new google.maps.Circle(
						{
							strokeColor: '#FF0000',
							strokeOpacity: 0.8,
							strokeWeight: 2,
							fillColor: '#FF0000',
							fillOpacity: 0.35,
							map: map,
							radius: 3200
						}
					);
				}

				circle32.setCenter(new google.maps.LatLng(lat,lng));
			}
			
			var hideListings = function () {
				listings.forEach(function(i) {
					i.marker.setVisible(false);
				});
			}

			var showListings = function () {
				listings.forEach(function(i) {
					i.marker.setVisible(true);
				});
			}

			var hideCircles = function () {
				boxes.forEach(function(i) {
					i.circle.setVisible(false);
				});
			}

			var showCircles = function () {
				boxes.forEach(function(i) {
					i.circle.setVisible(true);
				});
			}

			var hideBoxes = function () {
				boxes.forEach(function(i) {
					i.marker.setVisible(false);
				});
			}

			var showBoxes = function () {
				boxes.forEach(function(i) {
					i.marker.setVisible(true);
				});
			}

			

			var bindFilters = function () {
				
				$('#listings').on('click', function () {
					if ($(this).is(':checked')) {
						showListings();
					}
					else {
						hideListings();
					}
				});

				$('#boxes').on('click', function () {
					if ($(this).is(':checked')) {
						showBoxes();
					}
					else {
						hideBoxes();
					}
				});

				$('#circles').on('click', function () {
					if ($(this).is(':checked')) {
						showCircles();
					}
					else {
						hideCircles();
					}
				});


				$('#cacheSelector').on('change', function () {
					var cacheID = $(this).val();
					var boxId;
					var dest;

					if (cacheID === 'all') {
						$('#filters').show();

						if ($('#circles').is(':checked')) {
							showCircles();
						}
						if ($('#boxes').is(':checked')) {
							showBoxes();
						}
						if ($('#listings').is(':checked')) {
							showListings();
						}
						map.setZoom(12);

					}

					else {
						
						$('#filters').hide();

						hideCircles();
						hideBoxes();
						hideListings();

						listings.forEach(function(i) {
							if (i.id === parseInt(cacheID, 10)) {
								i.marker.setVisible(true);
								boxId = i.boxId;
							}
						});

						boxes.forEach(function(i) {
							if (i.id === boxId) {
								i.marker.setVisible(true);
								i.circle.setVisible(true);
								dest = new google.maps.LatLng(i.lat, i.lng);
							}
						});

						map.setZoom(17);
						map.panTo(dest);

					}
				});
				

			}

			var locateMe = function () {

				navigator.geolocation.getCurrentPosition(function(position) {

					var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

					new google.maps.Marker(
						{
							map: map,
							position: geolocate,
							icon: 'map/car.png'
						}
					);

					map.setCenter(geolocate);

				});
			}

			startMap();
			placeListings();
			placeBoxes();
			bindFilters();
			placesCircles();
			hideListings();
			hideCircles();
			//locateMe();

		}
		
	</script>

</body>
</html>