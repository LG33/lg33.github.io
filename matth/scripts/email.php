<?php
if($_POST){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
	
	mail("lopez.matthieu1996@gmail.com", "[SITE WEB] Message de ".$name." (".$email.")", $message);
}
?>