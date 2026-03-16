<div id="header">
  <a id="logo" href="/tictac"><span>tictac</span>.tel</a>
  <?php
// User is authentified
if ($user->checkAuth()) {
	?>
  <a id="disconnectButton" href="disconnect.php">Disconnect</a>
  <?php
} else {
	?>
  <a href="javascript:void(0);" id="registerButton">Register</a>
  <a href="javascript:void(0);" id="loginButton">Login</a>
  <?php
}
?>
</div>