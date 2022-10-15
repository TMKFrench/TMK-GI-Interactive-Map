<?php

class api {
    use _fn;
    private $method;
    private $config;
    private $db;
    private $path_info;
    private $request;
    private $root;
    private $map;
    private $action;
    private $id;

    public function __construct() {
        @session_start();
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->path_info = isset($_SERVER['ORIG_PATH_INFO'])?$_SERVER['ORIG_PATH_INFO']:'';
        $this->root = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . str_replace('api.php', '', $_SERVER['SCRIPT_NAME']);
        $this->config = parse_ini_file("config.ini", true);
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
            case "GET":


            break;
            case "POST":

            break;
        }
    }

    public function responseError($erreur) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(["error" => $erreur]);
    }
}