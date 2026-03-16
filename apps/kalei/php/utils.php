<?php
function logIt($message) {
  $date = date("Y-m-d H:i:s");
  file_put_contents(
    $_SERVER['DOCUMENT_ROOT'].'/kalei/log/log.txt', 
    $date.": ".$message."\r\n", 
    FILE_APPEND | LOCK_EX
  );
}
?>