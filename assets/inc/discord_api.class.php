<?php

class discord_api {

	use _fn;

	const CONFIGDISCORD = "config.ini"; // Configuration Discord SSO

	private $config; // Contenu du fichier fichier Config Discord
	private $code; // Code de retour OAuth
	private $map; // Map en cours
	private $root; // URL du site

	public function __construct(string $root,string $map) {
		$this->root = $root;
		$this->map = $map;
		if (file_exists ( "config.ini" )) {
			$this->config = parse_ini_file ( self::CONFIGDISCORD, true );
			$this->code = isset ( $_GET ["code"] ) ? $_GET ["code"] : null;
		} else {
			throw new Exception ( "Config Discord not found" );
		}
	}

	public function login() {
		$params = [
			'client_id' => $this->config ['discord'] ['client_id'],'redirect_uri' => $this->root . 'api/' . $this->map . '/code',
			'response_type' => 'code',
			'scope' => 'identify'
		];

		// Redirect the user to Discord's authorization page
		header ( 'Location: ' . $this->config ['discord'] ['url_authorize'] . '?' . http_build_query ( $params ) );
		die ();
	}

	public function code() {
		if (! is_null ( $this->code )) {
			$token = $this->discordApiRequest (
				$this->config ['discord'] ['url_token'],
				[
					'grant_type' => 'authorization_code',
					'client_id' => $this->config ['discord'] ['client_id'],
					'client_secret' => $this->config ['discord'] ['client_secret'],
					'redirect_uri' => $this->root . 'api/' . $this->map . '/code',
					'code' => $this->code,
					'scope' => 'indentify'
				]
			);
			if ($token && is_object($token) && property_exists ( $token, "access_token" )) {
				$_SESSION ['discord_token'] = $token->access_token;
				$_SESSION ['discord_refresh_token'] = $token->refresh_token;
				$_SESSION ['discord_token_type'] = $token->token_type;

				$user = $this->discordApiRequest ( $this->config ['discord'] ['url_user'] );
				if ($user && is_object($user) && property_exists($user,"id")) {
					$data = [
						'uid' => $user->id,'username' => $user->username . '#' . $user->discriminator,
						'avatar' => 'https://cdn.discordapp.com/avatars/' . $user->id . '/' . $user->avatar . '.png',
						'avatar_default' => 'https://cdn.discordapp.com/embed/avatars/' . ($user->discriminator % 5) . '.png',
						'logout' => $this->root . 'api/' . $this->map . '/logout'
					];
					return $data;
				} else {
					return "Discord user info not valid : " . $user->message;
				}
			} else {
				return "Token Discord no valid : " . $token->error;
			}
		} else {
			return "Discord code not valid";
		}
	}

	public function revokeToken() {
		$token = self::session("discord_token");
		if ($token) {
			$retour = $this->discordApiRequest($this->config['discord']['url_revoke'],["token" => $token]);
		}
	}

	private function discordApiRequest($url, $post=false, $headers=array()) {
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
		if (isset($_SESSION['discord_token']) && !empty($_SESSION["discord_token"])) $headers[] = 'Authorization: Bearer ' . $_SESSION['discord_token'];
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
		$retour = json_decode($response);
		if (json_last_error() == JSON_ERROR_NONE) {
			return $retour;
		} else {
			throw new Exception("Discord data not consistent.");
		}
	}
}