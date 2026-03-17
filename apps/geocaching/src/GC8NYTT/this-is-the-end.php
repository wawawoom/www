<?php
include_once('./inc/php/functions.php');
include_once('./inc/php/config.php');
include_once('./inc/php/db.php');

// check if the cookie is valid
$user = getUser();

// if ($user === NULL) {
//     header('Location: ./logout.php');
//     exit();
// }
// else if ($user->USE_CurrentStep != 10) {
//     header('Location: ./logout.php');
//     exit();
// }
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

        <title>Bonne descente - Cauchemar</title>
    </head>
    <body>
        <div id="main">
            <div id="leftCol">

                <h3 style="margin-bottom: 30px;">Etape finale</h3>
                <h6 style="font-size: 0.85rem; margin-bottom: 30px;">
                    Retour à Levens.
                    <br /><br />
                    Waypoint de la boite : 
                    <br /><br />
                    <?php echo $COORDS_FINAL; ?>
                    <br /><br />
                    Terrain D1.5 / Difficulté D5
                    <br /><br />
                    Pas de spoiler. Demerdez-vous. Ou demandez moi, on sait jamais si je suis de bonne humeur...
                </h6>
                
            </div>

            <div id="rightCol">
                
                <img src="./inc/img/background-invert.png" id="back" />

                <div id="content">
                    
                    <div id="banner">
                        Bonne journée <?php echo $user->USE_Pseudo; ?>. 
                        <a href="./logout.php">Déconnexion</a><br />
                        <small>Votre numéro d'insomniaque: <?php echo $user->USE_GUID; ?></small>
                    </div>

                    <h1>C'est fini.</h1>
                    <h2>
                        Enfin, pas tout à fait.
                    </h2>
                    <p>
                    Vous devez redescendre maintenant. Mais vous avez tout votre temps...
                    <br /><br />
                    Encore bravo ! 
                    <br /><br />
                    <br /><br />
                    <a target="_blank" href="https://www.geocaching.com/p/default.aspx?guid=48f1b1dd-83d0-425d-b958-4fb057f4c0a9">wawawoom</a>, votre tortionnaire dévoué.
                    <br /><br />
                    <span style="font-size: 100px;">👹</span>
                    </p>
                    
                </div>
            </div>
        </div>

        <?php
        include_once('./inc/php/scripts.php');
        ?>

    </body>
</html>