<?php
require_once "assets/inc/_fn.php";
class api {

    const TMKMAP = "tmkmap.db";
    const CONFIGDISCORD = "config.ini";
    const HITSFILE = "hits.txt";
    const MAP_TEYVAT = "t";
    const MAP_ENKANOMIA = "e";
    const MAP_GOUFFRE = "go";
    const MAP_SE = "se"; // Plus utilisé ?

    // Liste des menus
    private $liste_map = [
        self::MAP_TEYVAT,
        self::MAP_ENKANOMIA,
        self::MAP_GOUFFRE,
        //self::MAP_SE
    ];

    use _fn;
    private $method;
    private $config;
    private $db;
    private $dbuser;
    private $path_info;
    private $request;
    private $root;
    private $map;
    private $action;
    private $id;
    private $code;

    /**
     *
     * @throws Exception
     */
    public function __construct() {
        if (!session_id()) @session_start();
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->path_info = isset($_SERVER['ORIG_PATH_INFO'])?$_SERVER['ORIG_PATH_INFO']:$_SERVER['PATH_INFO'];
        $this->root = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . str_replace('api.php', '', $_SERVER['SCRIPT_NAME']);
        if (file_exists("config.ini")) {
            $this->config = parse_ini_file("config.ini", true);
            $this->code = isset($_GET["code"])?$_GET["code"]:null;
            $this->db = new SQLite3Database(self::TMKMAP);
            if (!$this->db) {
                throw new Exception("Impossible d'initialiser la base de donnees");
                die();
            }
            if (in_array($this->method,["GET","POST"])) {
                throw new Exception("Method not allowed");
            }
        } else {
            throw new Exception("Config Discord not found");
        }
    }

    /**
     * Initialisation de l'API
     * @throws Exception
     * @return boolean
     */
    public function init(){
        if ($this->method) {
            $this->request = explode('/', trim($this->path_info,'/'));
            if (count($this->request) == 3) {
                $this->map = self::nettoyage(array_shift($this->request));
                $this->action = self::nettoyage(array_shift($this->request));
                $this->id = self::sanitize(self::nettoyage(array_shift($this->request)));
                return true;
            } else {
                return false;
            }
        } else {
            throw new Exception("Initialisation impossible");
        }
    }

    /**
     * Exécution
     */
    public function process() {
        switch ($this->method) {
            case "GET": $this->processGet();break;
            case "POST": $this->processPost();break;
            default: $this->responseError("Méthode non reconnue.");break;
        }
    }

    /**
     * Gestion des demandes
     */
    private function processGet() {
        switch ($this->action) {
            /**
             * Test de l'API
             */
            case "test":
                die("test ok");
            break;

            /**
             * Login Oauth2 par Discord
             */
            case "login":
                if (!empty($this->map)) {
                    $params = array(
                        'client_id' => $this->config['discord']['client_id'],
                        'redirect_uri' => $this->root . 'api/' . $this->map . '/code',
                        'response_type' => 'code',
                        'scope' => 'identify'
                    );

                    // Redirect the user to Discord's authorization page
                    header('Location: ' . $this->config['discord']['url_authorize'] . '?' . http_build_query($params));
                    die();
                } else {
                    $this->responseError("Map non valide");
                }
            break;

            /**
             * Récupération du token et de l'image Discord
             */
            case "code":
                if (!is_null($this->code)) {
                    $token = self::apiRequest($this->config['discord']['url_token'], [
                        'grant_type' => 'authorization_code',
                        'client_id' => $this->config['discord']['client_id'],
                        'client_secret' => $this->config['discord']['client_secret'],
                        'redirect_uri' => $this->root . 'api/' . $this->map . '/code',
                        'code' => $this->code,
                        'scope' => 'indentify'
                    ]);
                    if ($token && property_exists($token,"access_token")) {
                        $_SESSION['access_token'] = $token->access_token;

                        $user = self::apiRequest($this->config['discord']['url_user']);
                        $data = [
                            'uid' => $user->id,
                            'username' =>  $user->username . '#' . $user->discriminator,
                            'avatar' =>  'https://cdn.discordapp.com/avatars/' . $user->id . '/' . $user->avatar . '.png',
                            'avatar_default' => 'https://cdn.discordapp.com/embed/avatars/' . ($user->discriminator % 5) . '.png',
                            'logout' => $this->root . 'api/' . $this->map . '/logout'
                        ];

                        $_SESSION['user'] = $data;
                        header('Location: ' . $this->root);
                        die();
                    } else {
                        $this->responseError("Token Disord invalide : ".$token->error);
                    }
                } else {
                    $this->responseError("Code non valide");
                }
            break;

            /**
             * Récupération ou création de l'utilisateur en base de données
             */
            case "user":
                $dbCountUsers = $this->db->get_row("SELECT COUNT(*) AS total FROM users");
                if (!self::session('visited')){
                    $counter = (int) file_get_contents(self::HITSFILE) + 1;
                    file_put_contents(self::HITSFILE, $counter);
                } else {
                    $counter = (int) file_get_contents(self::HITSFILE);
                }

                $_SESSION['visited'] = true;

                if ($user = self::session('user')) {
                    if (isset($user['uid'])) {
                        $this->getUserFromDb($user['uid']);
                        if (!is_object($this->dbuser)) {
                            $this->db->insert('users', [
                                'uid' => $user['uid'],
                                'created_at' => date('Y-m-d H:i:s'),
                                'last_login' => date('Y-m-d H:i:s')
                                // 'markers' => [],
                                // 'region' => [], 'chest' => [],
                                // 'menut' => [], 'btnt' => [],
                                // 'menue' => [], 'btne' => [],
                                // 'menuse' => [], 'btnse' => [],
                                // 'last_coordt' => [], 'last_coorde' =>[], 'last_coordse' =>[]
                            ]);
                        } else {
                            $this->db->update('users', [ 'last_login' => date('Y-m-d H:i:s') ], [ 'uid' => $user['uid'] ]);
                        }

                        switch($this->map) {
                            case self::MAP_TEYVAT:
                                $user['menu']       = $this->getFromDbUser("menut");
                                $user['btn']        = $this->getFromDbUser("btnt");
                                $user['region']     = $this->getFromDbUser("region");
                                $user['chest']      = $this->getFromDbUser("chest");
                                $user['markers']    = $this->getFromDbUser("markersteyvat");
                            break;
                            case self::MAP_ENKANOMIA:
                                $user['menu']       = $this->getFromDbUser("menue");
                                $user['btn']        = $this->getFromDbUser("btne");
                                $user['markers']    = $this->getFromDbUser("markersenka");
                            break;
                            case self::MAP_GOUFFRE:
                                $user['menu']       = $this->getFromDbUser("menugo");
                                $user['btn']        = $this->getFromDbUser("btngo");
                                $user['markers']    = $this->getFromDbUser("markersgouffre");
                            break;
                            case self::MAP_SE:
                                $user['menu']       = $this->getFromDbUser("menuse");
                                $user['btn']        = $this->getFromDbUser("btnse");
                                $user['markers']    = $this->getFromDbUser("markersse");
                            break;
                        }
                        $user['users'] = $dbCountUsers->total;
                        $user['visits'] = $counter;
                        $user['oldmarkers'] = $this->getFromDbUser("markers");
                        $user['updatemv3'] = $this->getFromDbUser("updatemv3");
                        $this->response($user);
                    }
                }
                $this->response(['login' => $this->root . 'api/' . $this->map . '/login', 'users' => $dbCountUsers->total, 'visits' => $counter]);
            break;

            /**
             * Déconnexion de Discord et logout session
             */
            case "logout":
                session_destroy();
                header('Location: ' . $this->root);
                die();
            break;

            /**
             * Action par défaut
             */
            default:
                $this->response(['method' => $this->method, 'action' => $this->action, 'id' => $this->id]);
            break;
        }
    }

    /**
     * Gestion des réceptions
     * @return Json response normal or error
     */
    private function processPost() {
        switch ($this->action) {

            /**
             * Ajout du menu en base pour l'utilisateur (méthode générique)
             */
            case "addmenu":
                if (isset($_SESSION["user"])){
                    $user = $_SESSION["user"];
                    $this->getUserFromDb($user["uid"]);
                    if (is_object($this->dbuser)) {
                        if (in_array($this->map,$this->liste_map)) {
                            $db_menu = "menu".$this->map;
                            $menu = $this->getFromDbUser($db_menu);
                            if (!in_array($this->id, $menu)) {
                                $menu[] = $this->id;
                                $this->db->update('users', [$db_menu => json_encode($menu)], ['uid' => $user['uid']]);
                            }
                            return $this->response($menu);
                        } else {
                            $this->responseError("Menu id not allowed");
                        }
                    } else {
                        $this->responseError("User not found in db");
                    }
                } else {
                    $this->responseError("Not logged-in or not identified");
                }
            break;

            /**
             * Suppression du menu en base pour l'utilisateur (méthode générique)
             */
            case "removemenu":
                if (isset($_SESSION["user"])){
                    $user = $_SESSION["user"];
                    $dbUser = $this->getUserFromDb($user['uid']);
                    if (is_object($dbUser) && $user) {
                        if (!in_array($this->map,$this->liste_map)) {
                            $db_menu = "menu".$this->map;
                            $menu = $this->getFromDbUser($db_menu);
                            if (in_array($this->id, $menu)) {
                                unset($menu[array_search($this->id,$menu)]);
                                $this->db->update('users', [$db_menu => json_encode($menu)], ['uid' => $user['uid']]);
                            }
                            return $this->response($menu);
                        } else {
                            $this->responseError("Menu id not allowed");
                        }
                    } else {
                        $this->responseError("User not found in db");
                    }
                } else {
                    $this->responseError("Not logged-in or not identified");
                }
            break;

            /**
             * Ajout d'un bouton en base pour l'utilisateur (méthode générique)
             */
            case "addbtn":
                if (isset($_SESSION["user"])){
                    $user = $_SESSION["user"];
                    $this->getUserFromDb($user['uid']);
                    if (is_object($this->dbuser)) {
                        if (in_array($this->map,$this->liste_map)) {
                            $db_btn = "btn".$this->map;
                            $btn = $this->getFromDbUser($db_btn);
                            if (!in_array($this->id, $btn)) {
                                $btn[] = $this->id;
                                $this->db->update('users', [$db_btn => json_encode($btn)], ['uid' => $user['uid']]);
                            }
                            return $this->response($btn);
                        } else {
                            $this->responseError("Btn id not allowed");
                        }
                    } else {
                        $this->responseError("User not found in db");
                    }
                } else {
                    $this->responseError("Not logged-in or not identified");
                }
            break;

            /**
             * Suppression d'un bouton en base pour l'utilisateur (méthode générique)
             */
            case "removebtn":
                if (isset($_SESSION["user"])){
                    $user = $_SESSION["user"];
                    $this->getUserFromDb($user['uid']);
                    if (is_object($this->dbuser)) {
                        if (!in_array($this->map,$this->liste_map)) {
                            $db_btn = "btn".$this->map;
                            $btn = $this->getFromDbUser($db_btn);
                            if (in_array($this->id, $btn)) {
                                unset($btn[array_search($this->id,$btn)]);
                                $this->db->update('users', [$db_btn => json_encode($btn)], ['uid' => $user['uid']]);
                            }
                            return $this->response($btn);
                        } else {
                            $this->responseError("Btn id not allowed");
                        }
                    } else {
                        $this->responseError("User not found in db");
                    }
                } else {
                    $this->responseError("Not logged-in or not identified");
                }
            break;

            /**
             * Ajout d'une région en base pour l'utilisateur (méthode générique)
             */
            case "addregion":
                if (isset($_SESSION["user"])){
                    $user = $_SESSION["user"];
                    $this->getUserFromDb($user['uid']);
                    if (is_object($this->dbuser)) {
                        $user["region"] = $this->getFromDbUser("region");
                        if (!in_array($this->id, $user["region"])) {
                            $user["region"][] = $this->id;
                            $this->db->update('users', ["region" => json_encode($user["region"])], ['uid' => $user['uid']]);
                        }
                        return $this->response(["region" => $user["region"]]);
                    } else {
                        $this->responseError("User not found in db");
                    }
                } else {
                    $this->responseError("Not logged-in or not identified");
                }
            break;

            /**
             * Suppression d'une région en base pour l'utilisateur (méthode générique)
             */
            case "removeregion":
                if (isset($_SESSION["user"])){
                    $user = $_SESSION["user"];
                    $this->getUserFromDb($user['uid']);
                    if (is_object($this->dbuser)) {
                        $user["region"] = $this->getFromDbUser("region");
                        if (in_array($this->id, $user["region"])) {
                            unset($user["region"][array_search($this->id,$user["regtion"])]);
                            $this->db->update('users', ["region" => json_encode($user["region"])], ['uid' => $user['uid']]);
                        }
                        return $this->response(["region" => $user["region"]]);
                    } else {
                        $this->responseError("User not found in db");
                    }
                } else {
                    $this->responseError("Not logged-in or not identified");
                }
            break;

            /**
             * Ajout d'un coffre en base pour l'utilisateur (méthode générique)
             */
            case "addchest":
                if (isset($_SESSION["user"])){
                    $user = $_SESSION["user"];
                    $this->getUserFromDb($user['uid']);
                    if (is_object($this->dbuser)) {
                        $user["chest"] = $this->getFromDbUser("chest");
                        if (!in_array($this->id, $user["chest"])) {
                            $user["chest"][] = $this->id;
                            $this->db->update('users', ["chest" => json_encode($user["chest"])], ['uid' => $user['uid']]);
                        }
                        return $this->response(["chest" => $user["chest"]]);
                    } else {
                        $this->responseError("User not found in db");
                    }
                } else {
                    $this->responseError("Not logged-in or not identified");
                }
            break;

            /**
             * Suppression d'un coffre en base pour l'utilisateur (méthode générique)
             */
            case "removechest":
                if (isset($_SESSION["user"])){
                    $user = $_SESSION["user"];
                    $this->getUserFromDb($user['uid']);
                    if (is_object($this->dbuser)) {
                        $user["chest"] = $this->getFromDbUser("chest");
                        if (in_array($this->id, $user["chest"])) {
                            unset($user["chest"][array_search($this->id,$user["chest"])]);
                            $this->db->update('users', ["chest" => json_encode($user["chest"])], ['uid' => $user['uid']]);
                        }
                        return $this->response(["chest" => $user["chest"]]);
                    } else {
                        $this->responseError("User not found in db");
                    }
                } else {
                    $this->responseError("Not logged-in or not identified");
                }
            break;
        }
    }

    /**
     * Retourne les informations d'un utilisateur en base
     * @param string $uid
     * @return string
     */
    private function getUserFromDb(string $uid) {
        $this->dbuser = $this->db->get_row("SELECT * FROM users WHERE uid = {$uid}");
    }

    /**
     * Récupération d'une valeur de l'objet user récupéré en base
     * @param string $valeur
     * @return array|mixed
     */
    private function getFromDbUser(string $valeur,$default=[]) {
        return ($this->dbuser) ? (is_null($this->dbuser->{$valeur})?$default:json_decode($this->dbuser->{$valeur})):$default;
    }

    /**
     * Renvoi d'une réponse
     * @param array $reponse
     */
    public function response(array $reponse) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($reponse);
        die(); // Fin de Procédure
    }

    /**
     * Renvoi d'une réponse type erreur
     * @param string $erreur
     */
    public function responseError(string $erreur) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(["error" => $erreur]);
        die(); // Fin de Procédure
    }
}
