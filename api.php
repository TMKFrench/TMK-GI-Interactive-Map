<?php
@session_start();
require_once "assets/inc/sqlite3database.class.php";
require_once "assets/inc/mypdo.class.php";
require_once "assets/inc/api.class.php";

$api = new api();
$init = $api->init();
if ($init === true) { // Initialisation de l'API
    $api->process(); // Process de l'appel API
} else {
    $api->responseError("Initialisation impossible de l'API ".$init);
}