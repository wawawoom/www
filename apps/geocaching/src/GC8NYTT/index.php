<?php
include_once('./inc/php/functions.php');
include_once('./inc/php/db.php');
include_once('./inc/php/config.php');

// check if the form was posted
// Register process
// And redirect to step sleep.php
if (
    isset($_POST['submit']) && 
    (isset($_POST['pseudo']) && $_POST['pseudo'] !== '') &&
    (isset($_POST['guid']) && $_POST['guid'] !== '')
    ) {

    insertUser($_POST['guid'], $_POST['pseudo']);
    setcookie("GC8NYTT", $_POST['guid'].$COOKIE_SEPARATOR.$_POST['pseudo'], time() + 3600*24*365*10, '/');
    header('Location: ./sleep.php');
    exit();
}

$user = getUser();
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

        <title>GC8NYTT</title>
    </head>
    <body>
        <div id="main">
            <div id="leftCol">
                <a href="http://coord.info/GC8NYTT">J'ai peur, je m'en vais.</a>
            </div>
            <div id="rightCol">

                <img src="./inc/img/background.png" id="back" />

                <div id="content">
                    
                    <div id="banner">
                        <?php
                        if ($user !== NULL) {
                        ?>
                            Bonne nuit <?php echo $user->USE_Pseudo; ?>. 
                            <a href="./logout.php">Déconnexion</a><br />
                            <small>Votre numéro d'insomniaque: <?php echo $user->USE_GUID; ?></small>
                        <?php
                        } else {
                        ?>
                            Déjà insomniaque ? <a href="./login.php">connectez-vous</a>.
                        <?php
                        }
                        ?>
                    </div>

                    <h1>Cauchemar</h1>
                    <h2>
                        Non, ceci n'est pas un cauchemar.<br />
                        Tout ceci est bien réel.<br />
                        Vous êtes insomniaque.<br />
                        Ou pas encore, mais vous allez le devenir.
                    </h2>

                    <?php
                    if ($user !== NULL) {
                    ?>
                        
                        <p>
                            <a href="./sleep.php">Fatigué ?</a>
                        </p>

                    <?php
                    } else {
                    ?>
                        <p>
                            Respirez un bon coup, car ce qui vous attend ne sera pas de tout
                            repos. Vous pouvez partir tout de suite. Je vous le
                            conseille d'ailleurs.
                            <br /><br />
                            Fuyez, vite. Vous n'êtes pas à la hauteur. Seuls les
                            meilleurs réussiront !
                            <br /><br />
                            En faites-vous parti ? J'en doute fort.
                            <br /><br />
                            Je vous aurai prévenu. Tant pis pour vous.
                            <br /><br />
                        </p>
                        
                        <form action="" method="post" id="registerForm">
                            <strong>Tout d'abord, voici votre numéro d'insomniaque:</strong><br/>
                            Gardez le précieusement, il vous sera demandé en cas de déconnexion.
                            <br /><br />
                            <input type="text" name="guid" class="form-control" value="<?php echo create_small_guid(); ?>" id="guid" readonly="readonly" />
                            <br /><br />
                            Ensuite, entrez votre pseudo Géocaching.
                            <br /><br />
                            <input type="text" name="pseudo" class="form-control" id="pseudo" />
                            <br /><br />
                            Ensuite, et si seulement vous le souhaitez toujours,
                            <br /><br />
                            cliquez sur le bouton ci-dessous:
                            <br /><br /><br />
                            <input id="register" name="submit" type="submit" class="btn btn-primary" value="Je n'ai pas peur. Je m'inscris." />
                        </form>

                    <?php
                    }
                    ?>

                </div>
            </div>
        </div>
        
        <?php
        include_once('./inc/php/scripts.php');
        ?>
        
        <script>

            $(function() {
                $('form').on('submit', function (e) {
                    if ($.trim($('#pseudo').val()) === '') {
                        alert('Veuillez entrer votre pseudo géocaching !');
                        return false;
                    }
                })
            });

        </script>
    </body>
</html>
