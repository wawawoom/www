<?php
include_once('./inc/php/functions.php');
include_once('./inc/php/db.php');
include_once('./inc/php/config.php');

$ERROR = 0;

if (
    isset($_POST['login']) && 
    (isset($_POST['pseudo']) && $_POST['pseudo'] !== '') &&
    (isset($_POST['guid']) && $_POST['guid'] !== '')
    ) {

    if (loginUser($_POST['guid'], $_POST['pseudo'])) {

        setcookie("GC8NYTT", $_POST['guid'].$COOKIE_SEPARATOR.$_POST['pseudo'], time()+3600*24*365*10, '/');
        
        if (isset($_GET['redirect']) && $_GET['redirect'] !== '') {
            header('Location: ' . urldecode($_GET['redirect']));
            exit();
        } else {
            $user = getUser();

            echo $user->USE_CurrentStep;

            if ($user->USE_CurrentStep <= 7) {
                header('Location: ./sleep.php');
            }
            else if ($user->USE_CurrentStep <= 9) {
                header('Location: ./run.php');
            }
            else if ($user->USE_CurrentStep == 10) {
                header('Location: ./this-is-the-end.php');
            }
            exit();
        }
    } else {
        $ERROR = 1;
        $errorMessage = 'Désolé je ne vous reconnais pas.<br />Rééssayez ou retournez <a href="./index.php">d\'où vous venez.</a>';
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

        <title>Connexion - GC8NYTT</title>
    </head>
    <body>
        <div id="main">
            <div id="leftCol">
                <a href="./index.php">Mais où suis-je ?</a>
            </div>
            <div id="rightCol">

                <img src="./inc/img/background.png" id="back" />

                <div id="content">
                    
                    <?php
                    if ($ERROR === 1) {
                        echo '<div class="errorMessage">' . $errorMessage . '</div>';
                    }
                    ?>

                    <h1>Cauchemar</h1>
                    <h2>
                        Vous vous êtes égaré ?<br />
                        Très bien, vous revoila.<br />
                        Impressionant.<br />
                        Connectez-vous ci-dessous:
                    </h2>

                    <form action="" method="post" id="loginForm">
                        Votre numéro d'insomniaque :
                        <br /><br />
                        <input type="text" name="guid" class="form-control" value="<?php if ($ERROR === 1 && (isset($_POST['guid']) && $_POST['guid'] !== '')) { echo $_POST['guid']; } ?>" id="guid" />
                        <br /><br /><br />
                        Votre pseudo géocaching :
                        <br /><br />
                        <input type="text" name="pseudo" class="form-control" id="pseudo" value="<?php if ($ERROR === 1 && (isset($_POST['pseudo']) && $_POST['pseudo'] !== '')) { echo $_POST['pseudo']; } ?>" />
                        <br /><br /><br />
                        <input id="login" name="login" type="submit" class="btn btn-primary" value="Je me connecte." />
                    </form>


                </div>
            </div>
        </div>

        <?php
        include_once('./inc/php/scripts.php');
        ?>

        <script>

            $(function() {
                $('form').on('submit', function (e) {
                    if ($.trim($('#guid').val()) === '') {
                        alert('Veuillez entrer votre numéro d\'insomnique !');
                        return false;
                    }
                    if ($.trim($('#pseudo').val()) === '') {
                        alert('Veuillez entrer votre pseudo géocaching !');
                        return false;
                    }
                })
            });

        </script>
    </body>
</html>
