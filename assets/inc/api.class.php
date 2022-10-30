<?php
require_once "assets/inc/_fn.php";
class api {

    const TMKMAP 			= "tmkmap.db"; // Base de données des utilisateurs
    const CONFIGDISCORD 	= "config.ini";// Configuration Discord SSO
    const HITSFILE 			= "hits.txt"; // Statistiques d'accès
    const MAP_TEYVAT 		= "t"; // Nom court de la map Teyvat
    const MAP_ENKANOMIYA	= "e"; // Nom court de la map Enkanomiya
    const MAP_GOUFFRE 		= "go"; // Nom court de la map du Gouffre
    const MAP_SE 			= "se"; // Nom court de la map Spécial Edition (généralement temporaire)

    // Liste des menus
    private $liste_map = [
        self::MAP_TEYVAT,
        self::MAP_ENKANOMIYA,
        self::MAP_GOUFFRE,
        //self::MAP_SE
    ];

    // Liste des markers par map
    private $liste_markers_map = [
        self::MAP_TEYVAT 		=> "teyvat", // Nom des marqueurs Teyvat
        self::MAP_ENKANOMIYA 	=> "enka", // Nom des marqueurs enkanomiya
        self::MAP_GOUFFRE 		=> "gouffre", // Nom des marqueurs gouffre
        self::MAP_SE 			=> "se" // Nom des marqueurs spécial édition
    ];

    // Table chargement pour chaque map
    private $liste_chargement = [
      self::MAP_TEYVAT 		=> ["menu" => "menut", "btn" => "btnt",	"region" => "region",	"chest" => "chest",	"markers" => "markersteyvat"],
      self::MAP_ENKANOMIYA 	=> ["menu" => "menue", "btn" => "btne", "region" => "",			"chest" => "",		"markers" => "markersenka"],
      self::MAP_GOUFFRE 	=> ["menu" => "menugo","btn" => "btngo","region" => "",			"chest" => "",		"markers" => "markersgouffre"],
      self::MAP_SE 			=> ["menu" => "menuse","btn" => "btnse","region" => "",			"chest" => "",		"markers" => "markersse"],
    ];

    use _fn;
    private $method; // Méthode employée (GET ou POST)
    private $config; // Contenu du fichier fichier Config Discord
    private $db; // Accès à la BDD
    private $dbuser; // Info utilisateur récupéré
    private $path_info; // Info requête API dans URL
    private $request; // Info de requête exploité
    private $root; // Root du site (host https)
    private $map; // Map détectée
    private $action; // Action à faire
    private $id; // Identifiant de l'objet à traiter
    private $code; // Code retour Discord

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
            if (in_array($this->method,["get","post"])) {
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
            if (count($this->request) >= 2) {
                $this->map = self::nettoyage(array_shift($this->request));
                if (empty($this->map) || !in_array($this->map,$this->liste_map)) {
                  return " (no map)";
                }
                $this->action = self::nettoyage(array_shift($this->request));
                if (empty($this->action)) {
                  return " (no action)";
                }
                $this->id = self::sanitize(self::nettoyage(array_shift($this->request)));
                return true;
            } else {
                return " (wrong request form)";
            }
        } else {
            return " (http method not allowed)";
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
                            ]);
                        } else {
                            $this->setToDbUser(["last_login" => date('Y-m-d H:i:s')], $user["uid"]);
                        }
                        foreach ($this->liste_chargement[$this->map] as $champ => $contenu) {
                          if (!empty($contenu)) {
                            $user[$champ] = $this->getFromDbUser($contenu);
                          }
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
     * @return JsonSerializable response normal or error
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
                                $this->setToDbUser([$db_menu => $menu], $user["uid"]);
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
                                $this->setToDbUser([$db_menu => $menu], $user["uid"]);
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
                                $this->setToDbUser([$db_btn => $btn], $user["uid"]);
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
                                $this->setToDbUser([$db_btn => $btn], $user["uid"]);
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
                            $this->setToDbUser(["region" => $user["region"]], $user["uid"]);
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
                            unset($user["region"][array_search($this->id,$user["region"])]);
                            $this->setToDbUser(["region" => $user["region"]], $user["uid"]);
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
                            $this->setToDbUser(["chest" => $user["chest"]], $user["uid"]);
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
                            $this->setToDbUser(["chest" => $user["chest"]], $user["uid"]);
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
             * Mise à jour des markers
             */
            case "updatemarkers":
                if (isset($_SESSION["user"])){
                    $user = $_SESSION["user"];
                    $this->getUserFromDb($user['uid']);
                    if (is_object($this->dbuser)) {
                        $user["updatemv3"] = $this->getFromDbUser("updatemv3");
                        if (!in_array($this->liste_markers_map[$this->map],$user["updatemv3"])) {
                          	if (!empty($_POST["newm"]) && !empty($_POST["oldm"])) {
                          		$newm = json_decode($_POST["newm"],true);
                          		$n1 = (json_last_error() == JSON_ERROR_NONE);
                          		$oldm = json_decode($_POST["oldm"],true);
                          		$n2 = (json_last_error() == JSON_ERROR_NONE);
                          		if ($n1 && $n2) {
                          			$user["updatemv3"][] = $this->liste_markers_map[$this->map];
                          			$this->setToDbUser([
                          					"markers".$this->liste_markers_map[$this->map] => $newm,
                          					"markers" => $oldm,
                          					"updatemv3" => $user["updatemv3"]
                          			], $user["uid"]);
                          			return $this->response([]);
                          		} else {
                          			$this->responseError("Data seem's to be not good !");
                          		}
                          	} else {
                          		$this->responseError("Data seem's to be not good !");
                          	}
                        } else {
                        	return $this->response([]); // Déjà fait ...
                        }
                    } else {
                        $this->responseError("User not found in db");
                    }
                } else {
                    $this->responseError("Not logged-in or not identified");
                }
            break;

            /**
             * Ajout d'un marqueur
             */
            case "addmarker":
                if (isset($_SESSION["user"])){
                    $user = $_SESSION["user"];
                    $this->getUserFromDb($user['uid']);
                    if (is_object($this->dbuser)) {
                        $markers = "markers".$this->liste_markers_map[$this->map];
                        $user[$markers] = $this->getFromDbUser($markers);
                        if (!in_array($this->id, $user[$markers])) {
                            $user[$markers][] = $this->id;
                            $this->setToDbUser([$markers => $user[$markers]], $user["uid"]);
                        }
                        return $this->response([$markers => $user[$markers]]);
                    } else {
                        $this->responseError("User not found in db");
                    }
                } else {
                    $this->responseError("Not logged-in or not identified");
                }
            break;

            /**
             * Suppression d'un marqueur
             */
            case "removemarker":
              if (isset($_SESSION["user"])){
                $user = $_SESSION["user"];
                $this->getUserFromDb($user['uid']);
                if (is_object($this->dbuser)) {
                  $markers = "markers".$this->liste_markers_map[$this->map];
                  $user[$markers] = $this->getFromDbUser($markers);
                  if (in_array($this->id, $user[$markers])) {
                    unset($user[$markers][array_search($this->id,$user[$markers])]);
                    $this->setToDbUser([$markers => $user[$markers]], $user["uid"]);
                  }
                  return $this->response([$markers => $user[$markers]]);
                } else {
                  $this->responseError("User not found in db");
                }
              } else {
                $this->responseError("Not logged-in or not identified");
              }
            break;

            /**
             * Reset des marqueurs des Maps + spécial edition
             */
            case "resetsemap":
              $map = self::MAP_SE;
            case "resetmarkers":
            	$map = (!isset($map))?$this->map:self::MAP_SE;
              if (isset($_SESSION["user"])){
                $user = $_SESSION["user"];
                $this->getUserFromDb($user['uid']);
                if (is_object($this->dbuser)) {
                  $markers = "markers".$this->liste_markers_map[$map];
                  $user[$markers] = [];
                  $this->setToDbUser([$markers => []], $user["uid"]);
                  return $this->response([$markers => $user[$markers]]);
                } else {
                  $this->responseError("User not found in db");
                }
              } else {
                $this->responseError("Not logged-in or not identified");
              }
            break;

            /**
             * Merge des marqueurs
             */
            case "mergemarkers":
              if (isset($_SESSION["user"])){
                $user = $_SESSION["user"];
                $this->getUserFromDb($user['uid']);
                if (is_object($this->dbuser) && isset($_POST["data"])) {
                  $new_markers = json_decode($_POST["data"]);
                  if (json_last_error() == JSON_ERROR_NONE) {
                    $markers = "markers".$this->liste_markers_map[$this->map];
                    $user[$markers] = $this->getFromDbUser($markers);
                    $this->setToDbUser([$markers => $new_markers], $user["uid"]);
                    return $this->response([]);
                  } else {
                    $this->responseError("Data seem's to be not good !");
                  }
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
     * Récupération d'une valeur du tableau user récupéré en base
     * @param string $valeur
     * @return array|mixed
     */
    private function getFromDbUser(string $valeur,$default=[]) {
        return ($this->dbuser) ? (is_null($this->dbuser->{$valeur})?$default:(empty($this->dbuser->{$valeur})?$default:json_decode($this->dbuser->{$valeur},true))):$default;
    }

    /**
     * Enregistre en base le tableau pour un utilisateur
     * @param string $colonne
     * @param array $valeur
     * @param string $uid
     * @return bool|NULL
     */
    private function setToDbUser(array $donnees,string $uid):?bool {
    	foreach ($donnees as $colonne => $valeur) {
      		$maj = $this->db->update('users', [$colonne => json_encode($valeur)], ['uid' => $uid]);
      		if (!$maj) return false;
    	}
    	return true;
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
