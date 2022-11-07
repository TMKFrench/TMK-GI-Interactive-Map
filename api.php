<?php
if (!session_id()) @session_start();

spl_autoload_register("loadClass");

$api = new api();
$api->process(); // Process de l'appel API

/**
 * Fonction de chargement automatique des classes
 * @param string $class_name
 * @return boolean|Exception
 */
function loadClass(string $class_name) {
	if (!empty($class_name)) {
		$class_name .= ".class.php";
		if ( file_exists("assets/inc/".$class_name)) {
			require_once "assets/inc/".$class_name;
			return true;
		} else {
			return new Exception("Class ".$class_name." not found.");
		}
	} else {
		return new Exception("Empty class not allowed.");
	}
}