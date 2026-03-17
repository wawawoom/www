<?php
unset($_COOKIE['GC8NYTT']);
setcookie("GC8NYTT", '', time() - 3600, '/');
header('Location: ./index.php');
exit();
?>