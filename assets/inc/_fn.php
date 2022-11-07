<?php
trait _fn {
    static public function nettoyage($valeur) {
        return preg_replace('/[^a-z0-9_]+/i','',$valeur);
    }

    static public function dd($d,$die=true) {
        echo "<pre>".print_r($d,true)."</pre>";
        if ($die) die();
    }

    static public function sanitize($d) {
        return trim(stripslashes(htmlspecialchars($d)));
    }

    static public function session($key, $default=NULL) {
        return array_key_exists($key, $_SESSION) ? $_SESSION[$key] : $default;
    }

    static public function loadConfig() {
    	if (file_exists ( api::CONFIG )) {
    		return parse_ini_file ( api::CONFIG, true );
    	} else {
    		throw new Exception("SSO config file not found");
    	}
    }
}