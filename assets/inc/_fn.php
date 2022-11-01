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

    static public function discordApiRequest($url, $post=false, $headers=array()) {
        $verbose = fopen('php://temp', 'rw+');
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_STDERR , $verbose);
        if ($post) {
            curl_setopt($ch, CURLOPT_POST,true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
        }
        $headers[] = 'accept: application/json';
        if (isset($_SESSION['access_token']) && !empty($_SESSION["access_token"])) $headers[] = 'Authorization: Bearer ' . $_SESSION['access_token'];
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($ch);
        fclose($verbose);
        if (empty($response)) {
            rewind($verbose);
            $fh = fopen("logs/".uniqid("log-curl-discord").".log", "w");
            if ($fh) {
                fwrite($fh, $verbose);
                unset($verbose);
                fclose($fh);
            }
            throw new Exception(curl_error($ch));
        }
        return json_decode($response);
    }
}