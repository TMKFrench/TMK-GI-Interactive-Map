<?php
require_once "assets/inc/sqlite3database.class.php";
require_once "assets/inc/mypdo.class.php";
require_once "assets/inc/api.class.php";
require_once "assets/inc/_fn.php";

$api = new api();
if ($api->init()) {
    $api->process();
} else {
    $api->responseError("Initialisation impossible de l'API");
}