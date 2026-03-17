<?php
include_once('./inc/php/functions.php');
include_once('./inc/php/config.php');
include_once('./inc/php/db.php');

// check if the cookie is valid
$user = getUser();

if ($user === NULL) {
    header('Location: ./logout.php');
    exit();
} else if ($user->USE_CurrentStep > 7) {
    header('Location: ./run.php');
    exit();
}

$currentStep = $STEPS[$user->USE_CurrentStep - 1];
$nextActionDateTime = strtotime($user->USE_NextActionDateTime); 
$now = strtotime(date("Y-m-d H:i:s"));
$delaySeconds = $nextActionDateTime - $now;
$position = '';
$message = '';


if ($now < $nextActionDateTime) {
    $position = 'early';
    $message = 'Revenez le<br />' . date('d/m/Y', $nextActionDateTime) . ' à ' . date('H:i:s', $nextActionDateTime) . '<br /><small>&nbsp;</small>';
}
else if ($now < $nextActionDateTime + (60 * $MINUTES_AVAILABLE_MESSAGE)) {
    $position = 'intime';
    $message = 'Vous voilà. Juste à temps.<br /><small>&nbsp;</small>';
} 
else {
    if ($user->USE_CurrentStep < 7) {
        $position = 'late';
        $message = 'Trop tard !<br /><small><a href="./logout.php"><br />Dommage...</a></small>';
    }
    else {
        $position = 'finish';
        $message = 'Reconstituez l\'URL obtenue avec les QR codes. On se retrouve la bas.';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
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

        <title><?php echo $user->USE_CurrentStep; ?> - Cauchemar</title>
    </head>
    <body>
        <div id="main">
            <div id="leftCol">
                <h3>Etape <?php echo $currentStep->getIndex(); ?>/<?php echo sizeof($STEPS); ?></h3>
                <?php echo $message; ?>
            </div>
            <div id="rightCol">
                
                <img src="./inc/img/background.png" id="back" />

                <div id="content">
                    
                    <div id="banner">
                        Bonne nuit <?php echo $user->USE_Pseudo; ?>. 
                        <a href="./logout.php">Déconnexion</a><br />
                        <small>Votre numéro d'insomniaque: <?php echo $user->USE_GUID; ?></small>
                    </div>
                
                    <h1>Bonsoir.</h1>
                    <h2>
                        Surtout ne ratez pas le rendez-vous, ou vous devriez tout recommencer.
                    </h2>
                    <p>
                    L'insomnie définit le plus souvent des problèmes de sommeil chez un individu. 
                    Ce terme est créé au xvie siècle sur la base du latin insomnia (du latin somniculus, 
                    &quot; état de celui qui dort &quot;) et signifie stricto sensu la privation de sommeil. 
                    Dans l'acception commune et courante, l'insomnie est la diminution de la durée habituelle 
                    du sommeil et/ou l'atteinte de la qualité du sommeil avec répercussion sur la qualité 
                    de la veille du lendemain. Un sommeil interrompu durant la nuit, ou sommeil polyphasique, 
                    est souvent confondu avec l'insomnie, menant la plupart du temps à une prescription de 
                    somnifères.
                    </p>
                    
                </div>
            </div>
        </div>

        <?php
        include_once('./inc/php/scripts.php');
        ?>



        <?php
        if ($position !== 'late') {
            ?>
            <script>
                var countDown = {

                    targetTime: new Date('<?php echo $user->USE_NextActionDateTime; ?>'.replace(/\-/gi, '/')),
                    
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

                        // reload page
                        if ( timeNow.toString() === this.targetTime.toString() ) {
                            document.location.reload(true);
                        }
                        
                        // early
                        else if (timeNow < this.targetTime) {

                            diff = this.dateDiff(timeNow, this.targetTime);

                            var message = 'Dans ';

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
                                message += diff.sec + ' seconde' + (diff.sec > 1 ? 's' : '');
                            }

                            $('#leftCol small').text(message);
                        }

                        // intime
                        else if (timeNow > this.targetTime && timeNow.getTime() < this.targetTime.getTime() + (<?php echo $MINUTES_AVAILABLE_MESSAGE; ?> * 60 * 1000)) {

                            diff = this.dateDiff(timeNow, new Date(this.targetTime.getTime() + (<?php echo $MINUTES_AVAILABLE_MESSAGE; ?> * 60 * 1000)));

                            var message = '<br />Vous avez<br />';

                            if (diff.min > 0) {
                                message += diff.min + ' minute' + (diff.min > 1 ? 's' : '') + ' ';
                            }
                            if (diff.sec > 0) {
                                message += diff.sec + ' seconde' + (diff.sec > 1 ? 's' : '');
                            }

                            <?php
                            if ($user->USE_CurrentStep < 7) {
                                ?>
                                message += '<br /> pour d\'abord scanner ce QR code ET ENSUITE cliquer sur le lien ci-dessous, afin de passer à l\'étape suivante.';

                                <?php
                            } else {
                                ?>
                                message += '<br /> pour scanner ce QR code.';
                                <?php
                            }
                            ?>

                            
                            $('#leftCol small').html(message);

                            <?php
                            if ($position = 'intime') {
                                ?>
                                if ($('#qrCode').length === 0) {

                                    $('#leftCol').append('<div id="qrCode"></div>');

                                    new QRCode("qrCode", {
                                        text: "<?php echo $currentStep->getQRCodeMessage(); ?>",
                                        width: 128,
                                        height: 128,
                                        colorDark : "#000000",
                                        colorLight : "#ffffff",
                                        correctLevel : QRCode.CorrectLevel.H
                                    });
                                }

                                if ($('#nextStep').length === 0) {
                                    <?php
                                    if ($user->USE_CurrentStep < 7) {
                                        ?>
                                            $('#leftCol').append('<br /><br /><a href="<?php echo $currentStep->getNextUrl(); ?>" id="nextStep">Etape suivante</a>');
                                        <?php
                                    } else {
                                        ?>
                                            $('#leftCol').append('<br /><br /><span id="nextStep">Reconstituez l\'URL obtenue avec les QR codes. On se retrouve la bas.</span>');
                                        <?php
                                    }
                                    ?>
                                }
                                <?php
                            }
                            ?>
                           
                        }

                        // late
                        else {
                            <?php
                            if ($user->USE_CurrentStep < 7) {
                                ?>
                                    document.location.reload(true);
                                <?php
                            }
                            ?>
                        }
                    
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
            <?php
        }
        ?>
    </body>
</html>
