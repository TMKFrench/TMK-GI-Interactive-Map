<?php
trait _fn {
    static public function nettoyage($valeur) {
        return preg_replace('/[^a-z0-9_]+/i','',$valeur);
    }

    static public function dd($d) {
        echo "<pre>";
        print_r($d);
        echo "</pre>";
        die();
    }

    static public function sanitize($d) {
        $d = trim($d);
        $d = stripslashes($d);
        $d = htmlspecialchars($d);
        return $d;
    }

    static public function session($key, $default=NULL) {
        return array_key_exists($key, $_SESSION) ? $_SESSION[$key] : $default;
    }

    static public function apiRequest($url, $post=FALSE, $headers=array()) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        $response = curl_exec($ch);


        if($post)
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));

        $headers[] = 'Accept: application/json';

        if($_SESSION['access_token'])
            $headers[] = 'Authorization: Bearer ' . $_SESSION['access_token'];

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);
        return json_decode($response);
    }
}