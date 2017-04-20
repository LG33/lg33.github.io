<?php
if($_POST){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
	
	mail("louis.gaillard@live.fr", "[louisgaillard.fr] Message de " .$email, $message);
}
?>