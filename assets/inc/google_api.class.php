<?php
require_once "vendor/google/vendor/autoload.php";

class google_api {

	use _fn;

	private $config; // Configuration SSO
	private $code; // Code de retour OAuth
	private $map; // Map en cours
	private $root; // URL du site

	private $client;

	public function __construct(string $root,string $map) {
		$this->config = self::loadConfig(); // Chargement du fichier de configuration SSO
		$this->root = $root;
		$this->map = $map;
		$this->code = isset ( $_GET ["code"] ) ? $_GET ["code"] : null;
		$this->client = new Google\Client();
		$this->client->setAuthConfig($this->config["google"]["config_file"]);
	}

	public function login() {
		$this->configureClient();
		$auth_url = $this->client->createAuthUrl();
		header('Location: ' . filter_var($auth_url, FILTER_SANITIZE_URL));
		die ();
	}

	public function code() {
		$this->configureClient();
		if (! is_null ( $this->code )) {
			$creds = $this->client->fetchAccessTokenWithAuthCode($this->code);
			if (is_array($creds) && !isset($creds["error"])) {
				$_SESSION['google_token'] = $this->client->getAccessToken();
				header('Location: ' . filter_var($this->getReturnUri(), FILTER_SANITIZE_URL));
				die();
			} else {
				return "Google error : ".$creds["error"];
			}
		} elseif (isset($_SESSION["google_token"]) && $_SESSION["google_token"]) {
			$this->client->setAccessToken($_SESSION['google_token']);
			$user = new Google\Service\Oauth2($this->client);
			$infouser = $user->userinfo->get();
			if (is_object($infouser)) {
				$data = [
					'uid' => $infouser->id,
					'username' => $infouser->name,
					'avatar' => $infouser->picture,
					'avatar_default' => $infouser->picture,
					'logout' => $this->root . 'api/' . $this->map . '/logout',
					'sso' => "google"
				];
				return $data;
			} else {
				return "Google no info found";
			}
		} else {
			return false;
		}
	}

	public function revokeToken() {
		$token = self::session("google_token");
		if ($token) {
			$this->client->revokeToken($_SESSION[$token]);
		}
	}

	private function configureClient() {
		$this->client->setRedirectUri($this->getReturnUri());
		$this->client->addScope(Google\Service\Oauth2::USERINFO_PROFILE);
	}

	private function getReturnUri() {
		return $this->root . 'api/' . $this->map . '/codeg';
	}
}