<?php
include_once('./inc/php/functions.php');
include_once('./inc/php/config.php');
include_once('./inc/php/db.php');

// check if the cookie is valid
$user = getUser();

if ($user === NULL) {
    header('Location: ./logout.php');
    exit();
}
else if ($user->USE_CurrentStep < 8) {
    header('Location: ./logout.php');
    exit();
}

$currentStep = $user->USE_CurrentStep;
$now = strtotime(date("Y-m-d H:i:s"));
$expires = strtotime($user->USE_NextActionDateTime); 

// Si le scan du Ferion n'a pas été fait a temps
if ($currentStep == 9 && $now > $expires) {
    header('Location: ./logout.php');
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

        <title><?php echo $currentStep == 8 ? '1' : '2'; ?> - Cauchemar</title>
    </head>
    <body>
        <div id="main">
            <div id="leftCol">

            <?php
            if ($currentStep == 8) {
                ?>

                <h3 style="margin-bottom: 30px;">Etape <?php echo $currentStep == 8 ? '1' : '2'; ?>/2</h3>
                <h6 style="font-size: 0.85rem; margin-bottom: 30px;">
                    L'aven Amok.
                    <br /><br />
                    Waypoint QR Code BAS: 
                    <br /><br />
                    <?php echo $QR_BAS_COORDS; ?>
                    <br /><br />
                    Terrain D4 / Difficulté D2 <br/><br /><a target="_blank" href="./inc/img/spoiler-bas.jpg">Spoiler</a><br/><br />
                    <img src="./inc/img/tete.jpg" />
                </h6>
                <?php 
                if ($SHOW_QR_CODES_RUN) {
                    echo '<img style="width: 100px; margin-bottom: 20px;" src="./inc/img/bas-50f28edb-149a-4eb6-b329-d29883516db3.svg" />';
                }
                ?>
                
                <?php
            } else {
                ?>

                <h3 style="margin-bottom: 30px;">Etape <?php echo $currentStep == 8 ? '1' : '2'; ?>/2</h3>
                <h6 style="font-size: 0.85rem; margin-bottom: 30px;">
                    Le majestueux Férion.
                    <br /><br />
                    Waypoint QR Code HAUT: 
                    <br /><br />
                    <?php echo $QR_HAUT_COORDS; ?>
                    <br /><br />
                    Terrain D3 / Difficulté D2 / <a target="_blank" href="./inc/img/spoiler-haut.jpg">Spoiler</a>
                </h6>
                <?php 
                if ($SHOW_QR_CODES_RUN) {
                    echo '<img style="width: 100px; margin-bottom: 20px;" src="./inc/img/haut-76187035-1249-43af-a740-181c09435da4.svg" />';
                }
                ?>

                <small style="color: #e83e8c;"></small>

                <?php
            }
            ?>
                
            </div>
            <div id="rightCol">
                
                <img src="./inc/img/background-invert.png" id="back" />

                <div id="content">
                    
                    <div id="banner">
                        Bonne journée <?php echo $user->USE_Pseudo; ?>. 
                        <a href="./logout.php">Déconnexion</a><br />
                        <small>Votre numéro d'insomniaque: <?php echo $user->USE_GUID; ?></small>
                    </div>

                    <?php
                    if ($currentStep == 8) {
                    ?>
                    <h1>Re, bonjour.</h1>
                    <h2>
                        Bravo, vous êtes du genre coriace. J'apprécie votre ténacité.
                    </h2>
                    <p>
					Mais si vous pensiez trouver les coordonnées de la boite sur cette page,
					c'est que vous me connaissez bien mal. Je suis bien plus impitoyable que çà.
					Vous voila maintenant épuisé et ce qui vous attend va vous mettre le coup fatal.
					A moins que vous ayez trop peur pour continuer ?<br /><br />
					A vous de voir.
                    <br /><br />
                    <strong>Si vous décidez d'aller plus loin, lisez ATTENTIVEMENT ce qui suit.</strong>
                    <br /><br />
                    Tres bien. Je vous aurais prévenu. Votre cauchemar : aller à un waypoint nommé &quot;BAS&quot;. A cet endroit vous trouverez une boite canister dans laquelle se trouve un un QR Code. Scannez ce Qrcode, et suivez les instructions. 
                    Vous aurez ensuite <?php echo $HOURS_TO_SCAN_QRCODE_B; ?> heures pour vous rendre au waypoint
                    &quot;HAUT&quot;. Vous y trouvez également un deuxième QR Code. <strong>Attention ce délai est un véritable compte 
                    à rebours. Ce qui veut dire que si vous scannez le deuxième qr code après ce delai, il ne vous délivrera pas 
                    l'emplacement de la boite finale...</strong> Et vous n'aurez plus qu'à retourner scanner le QR Code au waypoint &quot;BAS&quot;.
                    <br /><br />
                    Vous voyez le genre ? Tout simplement démoniaque.
                    <br /><br />
					Attention, les scans des Qr codes &quot;BAS&quot; et &quot;HAUT&quot; devront être faits <strong>avec le même téléphone</strong>.
					Si ce n'est pas le cas, le scan du QR code &quot;HAUT&quot;, ne vous donnera pas l'emplacement
                    de la boite finale. N'essayez pas non plus de gruger en prenant en photo le QR Code &quot;BAS&quot;
                    pour le scanner plus tard, car je detecte votre position au moment du scan. <strong>Bref, n'essayez pas de tricher,
                    car à la moindre détection de triche, votre compte sera supprimé.</strong>
                    <br /><br />
                    <strong>Prévoyez : (car votre périple sera éprouvant.)</strong>
                    <br />De l'eau, à manger et votre numéro d'insomniaque. Il vous sera <strong>INDISPENSABLE</strong> lors du scan des QR codes.
                    
                    <?php
                    } else {
                    ?>
                    <h1>Bravo.</h1>
                    <h2>
                        Bien. C'est maintenant que les choses vont se corser.
                    </h2>
                    <p>
                    Ne m'en voulez pas. Derrière chaque cache, il y a une histoire. Et 
                    celle-ci ne déroge pas à cette règle. Courage. Je suis certain que vous 
                    allez y arriver. N'oubliez pas, le compte à rebours a commencé. A tout à 
                    l'heure pour le scan du QRCode du point "Haut". Prenez à boire, à manger,
                    votre numéro d'insomniaque, et le plus important: <strong>utilisez le meme 
                    téléphone pour scanner le prochain QRCode.</strong>
                    <?php
                    }
                    ?>

                    
                    <br /><br />
                    Bonne chance !
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

        <script>

            var countDown = {

                targetTime: new Date(<?php echo $expires * 1000; ?>),
                
                init: function(){
                    this.tick();
                    window.setInterval(
                        function () {
                            countDown.tick();
                        }, 1000
                    );
                },
                
                tick: function() {
                    
                    var timeNow  = new Date();
                    var diff;

                    $('#leftCol small').text('');

                    diff = this.dateDiff(timeNow, this.targetTime);

                    var message = 'Dépéchez-vous !<br />Le délai expire le <br /><?php echo date('d/m/Y', $expires) . ' à ' . date('H:i:s', $expires); ?> <br /><br />dans ';

                    if (diff.day > 0) {
                        message += diff.day + ' jour' + (diff.day > 1 ? 's' : '') + ' ';
                    }
                    if (diff.hour > 0) {
                        message += diff.hour + ' heure' + (diff.hour > 1 ? 's' : '') + ' ';
                    }
                    if (diff.min > 0) {
                        message += diff.min + ' minute' + (diff.min > 1 ? 's' : '') + ' ';
                    }
                    if (diff.sec > 0) {
                        message += diff.sec + ' seconde' + (diff.sec > 1 ? 's.' : '.');
                    }

                    $('#leftCol small').html(message);
                   
                
                },
                
                dateDiff: function(date1, date2){
                    var diff = {}                           // Initialisation du retour
                    var tmp = date2 - date1;
            
                    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
                    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
                    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
                    diff.min = tmp % 60;                    // Extraction du nombre de minutes
                    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
                    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
                    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
                    diff.day = tmp;
            
                    return diff;
                }
            };
            
            countDown.init();
            
        </script>
    </body>
</html>