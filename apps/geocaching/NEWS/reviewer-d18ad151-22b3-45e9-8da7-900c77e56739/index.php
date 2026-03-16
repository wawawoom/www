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

    <!-- Custom styles for this template -->
    <style>
    body {
      padding-top: 5rem;
    }
    .starter-template {
      padding: 3rem 1.5rem;
      text-align: center;
    }

    .imageEnigme {
      width: 147px;
      margin: 3px;
    }
    </style>

  </head>

  <body>

    <?php include('inc/nav.php'); ?>

    <main class="container-fluid">

      <table class="table table-sm" style="font-size: 12px;">
        <thead>
          <tr>
            <th width="20%">ID / GC</th>
            <th width="30%">Enigme</th>
            <th width="25%">Checker</th>
            <th width="25%">Boite</th>
          </tr>
        </thead>
        <tbody>
          
          <?php
          try {
            $mysqli = new mysqli($SERVER, $USER, $PASSWORD, $DATABASE);
            $mysqli->set_charset("utf8");

            $query = "SELECT * FROM caches";
            
            $imageWidth = 120;

            if ($result = $mysqli->query($query)) {
                while ($row = $result->fetch_array(MYSQLI_BOTH)) {
                  echo '<tr>';
                  
                  // ID / GC
                  echo '  <td>';
                  echo '    <div style="font-size: 16px; font-weight: bold;">'.$row['ID'].'-'.$row['Name'].'</div>';
                  echo '    <div><a target="_blank" href="https://coord.info/'.$row['GC'].'">'.$row['GC'].'</a></div>';
                  echo '    <div><strong>'.$row['CoordListingDegreesMinutes'].'</strong><br/>'.$row['CoordListing'].'</div>';
                  echo '  </td>';
                  
                  // Enigme
                  echo '  <td>';

                  if ($row['ID'] != '80') {
                    echo '    <div style="font-size: 16px; font-weight: bold;"><a target="_blank" href="'.$row['LinkWebPageInChecker'].'">'.$row['PlaceName'].'</a></div>';
                    echo '    <div>'.$row['Hint'].'</div>';
                    echo '    <div>Difficulté: ';
                    for ($i = 0; $i < $row['Difficulty']; $i++) {
                      echo '★';
                    }
                    echo '    </div>';
                    echo '    <div style="margin: 5px 0;">';
                    echo '      <a href="http://wawawoom.fr/geocaching/NEWS/'.$row['ID'].'/NORTH.jpg" target="_blank"><img class="imageEnigme" src="http://wawawoom.fr/geocaching/NEWS/'.$row['ID'].'/NORTH_th.jpg" /></a>';
                    echo '      <a href="http://wawawoom.fr/geocaching/NEWS/'.$row['ID'].'/EAST.jpg" target="_blank"><img class="imageEnigme" src="http://wawawoom.fr/geocaching/NEWS/'.$row['ID'].'/EAST_th.jpg" /></a>';
                    echo '      <a href="http://wawawoom.fr/geocaching/NEWS/'.$row['ID'].'/SOUTH.jpg" target="_blank"><img class="imageEnigme" src="http://wawawoom.fr/geocaching/NEWS/'.$row['ID'].'/SOUTH_th.jpg" /></a>';
                    echo '      <a href="http://wawawoom.fr/geocaching/NEWS/'.$row['ID'].'/WEST.jpg" target="_blank"><img class="imageEnigme" src="http://wawawoom.fr/geocaching/NEWS/'.$row['ID'].'/WEST_th.jpg" /></a>';
                    echo '    </div>';
                  }
                  else {
                    echo '    <div>';
                    echo '    STEP 1 - CIMA: <a href="http://wawawoom.fr/geocaching/NEWS/80/img/QR-cima.jpg" target="_blank">RRDKPPQHWAZBEDDKHT</a> - <a href="http://wawawoom.fr/geocaching/NEWS/80/step-1-a40633b2-5bed-4339-a82f-d7152549aa3f/" target="_blank">lien direct</a><br />';
                    echo '    STEP 2 - ELEPHANT: <a href="http://wawawoom.fr/geocaching/NEWS/80/img/QR-elephant.jpg" target="_blank">HROSALJJRSFFI</a> - <a href="http://wawawoom.fr/geocaching/NEWS/80/step-2-649cffab-0699-4139-bf58-271cfa4bd4a3/" target="_blank">lien direct</a><br />';
                    echo '    STEP 3 - BIG BEN: <a href="http://wawawoom.fr/geocaching/NEWS/80/img/QR-BigBen.jpg" target="_blank">LPXAAWNFSKGDV</a> - <a href="http://wawawoom.fr/geocaching/NEWS/80/step-3-e0906b3b-ff36-419c-8c4c-cee28c80374a/" target="_blank">lien direct</a><br />';
                    echo '    STEP 4 - VALLON MAGNAN: <a href="http://wawawoom.fr/geocaching/NEWS/80/img/QR-VallonDeMagnan.jpg" target="_blank">FDCIVXRYJOAUWPG</a> - <a href="http://wawawoom.fr/geocaching/NEWS/80/step-4-bb617003-222b-4e19-89ab-6bda01c9f315/" target="_blank">lien direct</a><br />';
                    echo '    STEP 5 - ISOLETTA: <a href="http://wawawoom.fr/geocaching/NEWS/80/img/QR-Isoletta.jpg" target="_blank">XHUSADMLJZBJVQF</a> - <a href="http://wawawoom.fr/geocaching/NEWS/80/step-5-46c9e5e5-bd18-4c68-b759-55c3f5c79f34/" target="_blank">lien direct</a><br /><br />';
                    
                    echo '    Texte encrypté complet : RRDKPPQHWAZBEDDKHTHROSALJJRSFFILPXAAWNFSKGDVFDCIVXRYJOAUWPGXHUSADMLJZBJVQF<br />';
                    echo '    Texte décodé complet : NORTHFOURTHREEFOURSIXDOTZEROSEVENNINEEASTZEROZEROSEVENONEFOURDOTONEFIVEONE<br /><br />';
                    
                    echo '    NORTH FOUR THREE FOUR SIX DOT ZERO SEVEN NINE EAST ZERO ZERO SEVEN ONE FOUR DOT ONE FIVE ONE<br /><br />';
                    
                    echo '    => N 43 46.079 E 007 14.151<br />';
                    echo '    </div>';
                  }
                  echo '  </td>';

                  //==========Checker
                  echo '  <td>';
                  echo '    <a href="http://geocheck.org/geo_inputchkcoord.php?gid='.$row['CheckerID'].'" target="_blank"><img alt="GeoCheck.org" src="http://geocheck.org/geocheck_small.php?gid='.$row['CheckerID'].'" title="Vérifier votre solution" style="border-width:0px;border-style:solid;height:40px;width:150px;" /></a>';
                  echo '    <div>';
                  if ($row['BoxID'] == '13') { //79
                    echo 'Message in checker: <strong>USE ALL THE LETTERS FOUND IN GEOCHECK.ORG AS THE KEY TO DECRYPT THE VIGENERE ENCRYPTED TEXT YOU FOUND BY GETTING ALL THE HINTS IN THE DIFFERENTS WAYPOINTS OF THE CACHE GC7W8EV. </strong>';
                  }
                  else if ($row['BoxID'] == '80') {
                    echo '';
                  }
                  else {
                    echo 'Letter in checker: <strong>'.$row['LetterKeyInChecker'].'</strong>';
                  }
                  echo '</div>';
                    
                  echo '    <div><strong>'.$row['CoordCheckerDegreesMinutes'].'</strong><br/>'.$row['CoordCheckerDegrees'].'</div>';
                  echo '  </td>';

                  //==========Box
                  echo '  <td>';
                  echo '    <div>ID: '.$row['BoxID'].'</div>';
                  echo '      <a href="http://wawawoom.fr/geocaching/NEWS/'.$row['ID'].'/spoiler-'.$row['GUID_Spoiler'].'.jpg" target="_blank"><img class="imageEnigme" src="http://wawawoom.fr/geocaching/NEWS/'.$row['ID'].'/spoiler-'.$row['GUID_Spoiler'].'_th.jpg" /></a>';
                  echo '    <div><strong>'.$row['BoxCoordDegreesMinutes'].'</strong><br/><a href="https://www.google.com/maps/place/'.$row['BoxCoord'].'" target="_blank">'.$row['BoxCoord'].'</a></div>';
                  echo '  </td>';

                  echo '</tr>';
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
        </tbody>
      </table>

    </main><!-- /.container -->

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  
  </body>
</html>
