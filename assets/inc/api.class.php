<?php
require_once "assets/inc/_fn.php";
class api {

    const TMKMAP = "tmkmap.db";
    const HITSFILE = "hits.txt";
    const MAP_TEYVAT = "t";
    const MAP_ENKANOMIA = "e";
    const MAP_GOUFFRE = "go";
    const MAP_SE = "se"; // Plus utilisé ?

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

    public function __construct() {
        @session_start();
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->path_info = isset($_SERVER['ORIG_PATH_INFO'])?$_SERVER['ORIG_PATH_INFO']:'';
        $this->root = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . str_replace('api.php', '', $_SERVER['SCRIPT_NAME']);
        $this->config = parse_ini_file("config.ini", true);
        $this->code = isset($_GET["code"])?$_GET["code"]:null;
        $this->db = new SQLite3Database(self::TMKMAP);
        if (!db) {
            throw new Exception("Impossible d'initialiser la base de donnees");
            die();
        }
    }

    public function init(){
        if ($this->method) {
            $this->request = explode('/', trim($this->path_info,'/'));
            $this->map = self::nettoyage(array_shift($this->request));
            $this->action = self::nettoyage(array_shift($this->request));
            $this->id = self::sanitize(self::nettoyage(array_shift($this->request)));
            return true;
        } else {
            throw new Exception("Initialisation impossible");
        }
    }

    public function process() {
        switch ($this->method) {
            case "GET": $this->processGet();break;
            case "POST": $this->processPost();break;
            default: $this->responseError("Méthode non reconnue.");break;
        }
    }

    private function processGet() {
        switch ($this->action) {
            case "login": // Login avec Discord
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
            case "code":
                if (!is_null($this->code)) {
                    $token = self::apiRequest($this->config['discord']['url_token'], [
                        "grant_type" => "authorization_code",
                        'client_id' => $this->config['discord']['client_id'],
                        'client_secret' => $this->config['discord']['client_secret'],
                        'redirect_uri' => $this->root . 'api/' . $this->map . '/code',
                        'code' => $this->code
                    ]);
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
                    $this->responseError("Code non valide");
                }
            break;
            case "user":
                header('Content-Type: application/json');

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
                        $this->dbuser = $this->db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
                        if (!$this->dbuser) {
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
        }
    }

    private function processPost() {

    }

    private function getFromDbUser($valeur) {
        return ($this->dbuser) ? json_decode($this->dbuser->{$valeur}) : [];
    }

    public function response($reponse) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($reponse);
        die(); // Fin de Procédure
    }

    public function responseError($erreur) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(["error" => $erreur]);
        die(); // Fin de Procédure
    }
}