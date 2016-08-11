<?php

$t_mail     = $_GET["mail"];
$t_name     = $_GET["name"];
$t_text     = $_GET["text"];
$t_tel      = $_GET["tel"];
$t_adress   = $_GET["adress"];

// multiple recipients
$to  = 'sgarbi@personalfoods.com.br' . ', '; // note the comma
$to  = 'gihad@personalfoods.com.br' . ', '; // note the comma
$to  = 'sabrina@personalfoods.com.br' . ', '; // note the comma
$to  = 'itsme@juliosgarbi.com.br' . ', '; // note the comma
$to .= 'pedidos@personalfoods.com.br';
// subject
$subject = "Pedido personalFoods";

// message
$message = $t_text;

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

// Additional headers
$headers .= 'To: PersonalFoods <pedidos@personalfoods.com.br>, Sgarbi <sgarbi@personalfoods.com.br>, Sabrina <sabrina@personalfoods.com.br>, Gihad <gihad@personalfoods.com.br>' . "\r\n";
$headers .= 'From: '. $t_name. '<'.$t_mail.'>';

// Mail it
mail($to, $subject, $message, $headers);
?>