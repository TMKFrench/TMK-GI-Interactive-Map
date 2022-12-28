<?php
require_once "assets/inc/_fn.php";

class api {

	use _fn; // Utilisation des outils communs

	const CONFIG = "config.ini"; // Configuration Discord et Google SSO

	const TMKMAP 			= "tmkmap.db"; // Base de données des utilisateurs
	const DEVMAP			= "devmarkers.db"; // Base de données des markers pour dev
	const HITSFILE 			= "hits.txt"; // Statistiques d'accès
	const MAP_TEYVAT 		= "t"; // Nom court de la map Teyvat
	const MAP_ENKANOMIYA 	= "e"; // Nom court de la map Enkanomiya
	const MAP_GOUFFRE 		= "go"; // Nom court de la map du Gouffre
	const MAP_SE 			= "se"; // Nom court de la map Spécial Edition (généralement temporaire)
	const MAP_DEV			= "dev"; // Nom court de la map dev

	// Liste des menus
	private $liste_map = [ self::MAP_TEYVAT,self::MAP_ENKANOMIYA,self::MAP_GOUFFRE,self::MAP_DEV // self::MAP_SE
	];

	// Liste des markers par map
	private $liste_markers_map = [
		self::MAP_TEYVAT 		=> "teyvat", // Nom des marqueurs Teyvat
		self::MAP_ENKANOMIYA 	=> "enka", // Nom des marqueurs enkanomiya
		self::MAP_GOUFFRE 		=> "gouffre", // Nom des marqueurs gouffre
		self::MAP_SE 			=> "se", // Nom des marqueurs spécial édition
		self::MAP_DEV			=> "dev" // Spécifique pour la map dev
	];

	private $liste_fichier_map = [
		self::MAP_TEYVAT 		=> "index.html", // Nom du fichier pour Teyvat
		self::MAP_ENKANOMIYA 	=> "enka.html", // Nom du fichier pour Enkanomiya
		self::MAP_GOUFFRE 		=> "gouffre.html", // Nom du fichier pour Gouffre
		self::MAP_SE 			=> "se.html", // Nom du fichier pour spécial édition
		self::MAP_DEV			=> "dev.html" // Nom du fichier pour la map dev
	];

	// Table chargement pour chaque map
	private $liste_chargement = [
		self::MAP_TEYVAT 		=> [ "menu" => "menut"	,"btn" 	=> "btnt"	,"region" => "region"	,"chest" => "chest","markers" => "markersteyvat" ],
		self::MAP_ENKANOMIYA 	=> [ "menu" => "menue"	,"btn" 	=> "btne"	,"region" => ""			,"chest" => "",		"markers" => "markersenka" ],
		self::MAP_GOUFFRE 		=> [ "menu" => "menugo"	,"btn" 	=> "btngo"	,"region" => ""			,"chest" => "",		"markers" => "markersgouffre" ],
		self::MAP_SE 			=> [ "menu" => "menuse"	,"btn" 	=> "btnse"	,"region" => ""			,"chest" => "",		"markers" => "markersse" ],
		self::MAP_DEV			=> [ "mneu" => ""		,"btn"	=> ""		,"region" => ""			,"chest" => "",		"markers" => ""]
	];

	private $method; // Méthode employée (GET ou POST)
	private $db; // Accès à la BDD
	private $dbuser; // Info utilisateur récupéré
	private $path_info; // Info requête API dans URL
	private $request; // Info de requête exploité
	private $root; // Root du site pour accès API (host https)
	private $map; // Map détectée
	private $action; // Action à faire
	private $id; // Identifiant de l'objet à traiter
	private $data; // Données postées (pour map dev)

	private $discord; // Classe discord
	private $google; // Classe google

	/**
	 * Constructeur de l'API
	 * @throws Exception
	 */
	public function __construct() {
		if (! session_id ()) @session_start ();
		$this->method = $_SERVER ['REQUEST_METHOD'];
		$this->path_info = isset ( $_SERVER ['ORIG_PATH_INFO'] ) ? $_SERVER ['ORIG_PATH_INFO'] : $_SERVER ['PATH_INFO'];
		$this->root =  $_SERVER ['REQUEST_SCHEME'] . '://' . $_SERVER ['HTTP_HOST'] . str_replace ( 'api.php', '', $_SERVER ['SCRIPT_NAME'] );
		if (in_array ( $this->method, [ "get","post" ] )) {
			throw new Exception ( "Method not allowed" );
		}
		$init = $this->init();
		if ($init === true) {
			switch ($this->map) {
				case self::MAP_DEV:
					$this->db = new SQLite3Database ( self::DEVMAP );
				break;
				default:
					$this->db = new SQLite3Database ( self::TMKMAP );
					$this->discord = new discord_api($this->root,$this->map);
					if (!is_object($this->discord)) {
						throw new Exception ( "Discord API not ready" );
					}
					$this->google = new google_api($this->root,$this->map);
					if (!is_object($this->google)) {
						throw new Exception ( "Google API not ready" );
					}
				break;
			}
			if (! $this->db) {
				throw new Exception ( "Impossible d'initialiser la base de donnees" );
				die ();
			}
		} else {
			throw new Exception("Initialisation error : ".$init);
		}
	}

	/**
	 * Initialisation de l'API
	 *
	 * @throws Exception
	 * @return boolean
	 */
	private function init() {
		if ($this->method) {
			$this->request = explode ( '/', trim ( $this->path_info, '/' ) );
			if (count ( $this->request ) >= 2) {
				$this->map = self::nettoyage ( array_shift ( $this->request ) );
				if (empty ( $this->map ) || ! in_array ( $this->map, $this->liste_map )) {
					return " (no map)";
				}
				$this->action = self::nettoyage ( array_shift ( $this->request ) );
				if (empty ( $this->action )) {
					return " (no action)";
				}
				$this->id = self::sanitize ( self::nettoyage ( array_shift ( $this->request ) ) );
				if (isset($_POST["data"])) {
					$this->data = (is_array($_POST["data"]))?array_map(fn($v) => self::sanitize(self::nettoyage($v)),$_POST["data"]):self::sanitize(self::nettoyage($_POST["data"]));
				}
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
			case "GET" :
				$this->processGet ();
			break;
			case "POST" :
				$this->processPost ();
			break;
			default :
				$this->responseError ( "Méthode non reconnue." );
			break;
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
			case "test" :
				die ( "test ok" );
			break;

			/**
			 * Permet de récupérer les markers en base de données et de les envoyer
			 */
			case "import" :
				$map = [];
				$markers = $this->db->get_rows('SELECT * FROM dev_markers');
				foreach($markers as $m =>$marker) {
					$map[$m] = [
						'uid' => $marker->uid,
						'mid' => $marker->mid,
						'mgroup' => $marker->mgroup,
						'x' => $marker->x,
						'y' => $marker->y,
					];
					// if(isset($marker->under)) {
					//     $map[$m] = ['under' => $marker->under];
					// };
				}
				$this->response($map);
			break;

			/**
			 * Login Oauth2 par Discord
			 */
			case "login" :
				if (is_null($this->getCurrentToken())) {
					if (! empty ( $this->map )) {
						$this->discord->login();
					} else {
						$this->responseError ( "Map non valide" );
					}
				} else {
					$this->responseError("Déjà connecté");
				}
			break;

			/**
			 * Login Oauth2 par Google
			 */
			case "loging" :
				if (is_null($this->getCurrentToken())) {
					if (! empty ( $this->map )) {
						$this->google->login();
					} else {
						$this->responseError ( "Map non valide" );
					}
				} else {
					$this->responseError("Déjà connecté");
				}
			break;

			/**
			 * Récupération du token et de l'image Discord après Oauth2 Discord
			 */
			case "code" :
				$data = $this->discord->code();
				if (is_array($data)) {

					$_SESSION ['user'] = $data;
					header ( 'Location: ' . $this->getMapUrl() );
					die();
				} elseif (!empty($data)) {
					$this->responseError ( $data );
				} else {
					header ( 'Location: ' . $this->root );
					die();
				}
			break;

			/**
			 * Récupération du token et de l'image Discord après Oauth2 Discord
			 */
			case "codeg" :
				$data = $this->google->code();
				if (is_array($data)) {

					$_SESSION ['user'] = $data;
					header ( 'Location: ' . $this->getMapUrl() );
					die();
				} elseif (!empty($data)) {
					$this->responseError ( $data );
				} else {
					header ( 'Location: ' . $this->root );
					die();
				}
			break;

			/**
			 * Récupération ou création de l'utilisateur en base de données
			 */
			case "user" :
				$dbCountUsers = $this->db->get_row ( "SELECT COUNT(*) AS total FROM users" );
				if (! self::session ( 'visited' )) {
					$counter = ( int ) file_get_contents ( self::HITSFILE ) + 1;
					file_put_contents ( self::HITSFILE, $counter );
				} else {
					$counter = ( int ) file_get_contents ( self::HITSFILE );
				}

				$_SESSION ['visited'] = true;
				$user = self::session ( 'user' );
				if ($user) {
					if (isset ( $user ['uid'] )) {
						$this->getUserFromDb ( $user ['uid'], $user['sso'] );
						if (! is_object ( $this->dbuser )) {
							$this->db->insert ( 'users', [ 'uid' => $user ['uid'],'created_at' => date ( 'Y-m-d H:i:s' ),'last_login' => date ( 'Y-m-d H:i:s' ), 'sso' => $user["sso"] ] );
						} else {
							$this->setToDbUser ( [ "last_login" => date ( 'Y-m-d H:i:s' ) ], $user ["uid"] );
						}
						foreach ( $this->liste_chargement [$this->map] as $champ => $contenu ) {
							if (! empty ( $contenu )) {
								$user [$champ] = $this->getFromDbUser ( $contenu );
							}
						}

						$user ['users'] 		= $dbCountUsers->total;
						$user ['visits'] 		= $counter;
						$user ['oldmarkers'] 	= $this->getFromDbUser ( "markers" );
						$user ['updatemv3'] 	= $this->getFromDbUser ( "updatemv3" );
						$user ['logout'] 		= $this->root . 'api/' . $this->map . '/logout';
						$this->response ( $user );
					}
				}
				$this->response ( [ 'login' => $this->root . 'api/' . $this->map . '/login','loging' => $this->root . 'api/' . $this->map . '/loging', 'users' => $dbCountUsers->total,'visits' => $counter ] );
			break;

			/**
			 * Déconnexion de Discord et logout session
			 */
			case "logout" :
				$url = $this->getMapUrl();
				$user = self::session("user");
				if ($user) {
					switch ($user["sso"]) {
						case "discord": $this->discord->revokeToken();break;
						case "google": $this->google->revokeToken();break;
					}
				}
				session_destroy ();
				header ( 'Location: ' . $url );
				die ();
			break;

			/**
			 * Action par défaut
			 */
			default :
				$this->response ( [ 'method' => $this->method,'action' => $this->action,'id' => $this->id ] );
			break;
		}
	}

	/**
	 * Gestion des réceptions
	 *
	 * @return JsonSerializable response normal or error
	 */
	private function processPost() {
		switch ($this->action) {

			/**
			 * Ajout d'un marker en base pour la map dev
			 */
			case "add":
				if ($this->map == self::MAP_DEV && !empty($this->data) && is_array($this->data)) {
					$this->db->insert('dev_markers', [
						'uid' 		=> $this->data[0],
						'mid' 		=> $this->data[1],
						'mgroup'	=> $this->data[2],
						'x' 		=> $this->data[3],
						'y' 		=> $this->data[4]
					]);
					$this->response(["ok" => "marker ".$this->data['uid']." ajouté"]);
				} else {
					$this->responseError("Wrong map");
				}
			break;

			/**
			 * Suppression d'un marker en base pour la map dev
			 */
			case "delete":
				if ($this->map == self::MAP_DEV && !empty($this->data)) {
					$this->db->delete('dev_markers', ['uid' => $this->data]);
					$this->response(["ok" => "marker ".$this->data." effacé"]);
				} else {
					$this->responseError("Wrong map");
				}
			break;

			/**
			 * Ajout du menu en base pour l'utilisateur
			 */
			case "addmenu" :
				$db_menu = "menu" . $this->map;
				$retour = $this->addToData ( $db_menu, $this->id );
				if (is_array ( $retour ))
					return $this->response ( [ $db_menu	 => $retour ] );
				else
					return $this->responseError ( $retour );
			break;

			/**
			 * Suppression du menu en base pour l'utilisateur
			 */
			case "removemenu" :
				$db_menu = "menu" . $this->map;
				$retour = $this->removeFromData ( $db_menu, $this->id );
				if (is_array ( $retour ))
					return $this->response ( [ $db_menu => $retour ] );
				else
					return $this->responseError ( $retour );
			break;

			/**
			 * Ajout d'un bouton en base pour l'utilisateur
			 */
			case "addbtn" :
				$db_btn = "btn" . $this->map;
				$retour = $this->addToData ( $db_btn, $this->id );
				if (is_array ( $retour ))
					return $this->response ( [ $db_btn => $retour ] );
				else
					return $this->responseError ( $retour );
			break;

			/**
			 * Suppression d'un bouton en base pour l'utilisateur
			 */
			case "removebtn" :
				$db_btn = "btn" . $this->map;
				$retour = $this->removeFromData ( $db_btn, $this->id );
				if (is_array ( $retour ))
					return $this->response ( [ $db_btn => $retour ] );
				else
					return $this->responseError ( $retour );
			break;

			/**
			 * Ajout d'une région en base pour l'utilisateur
			 */
			case "addregion" :
				$retour = $this->addToData ( "region", $this->id );
				if (is_array ( $retour ))
					return $this->response ( [ "region" => $retour ] );
				else
					return $this->responseError ( $retour );
			break;

			/**
			 * Suppression d'une région en base pour l'utilisateur
			 */
			case "removeregion" :
				$retour = $this->removeFromData ( "region", $this->id );
				if (is_array ( $retour ))
					return $this->response ( [ "region" => $retour ] );
				else
					return $this->responseError ( $retour );
			break;

			/**
			 * Ajout d'un coffre en base pour l'utilisateur
			 */
			case "addchest" :
				$retour = $this->addToData ( "chest", $this->id );
				if (is_array ( $retour ))
					return $this->response ( [ "chest" => $retour ] );
				else
					return $this->responseError ( $retour );
				die();
			break;

			/**
			 * Suppression d'un coffre en base pour l'utilisateur
			 */
			case "removechest" :
				$retour = $this->removeFromData ( "chest", $this->id );
				if (is_array ( $retour ))
					return $this->response ( [ "chest" => $retour ] );
				else
					return $this->responseError ( $retour );
			break;

			/**
			 * Mise à jour des markers
			 */
			case "updatemarkers" :
				if (isset ( $_SESSION ["user"] )) {
					$user = $_SESSION ["user"];
					$this->getUserFromDb ( $user ['uid'] , $user["sso"]);
					if (is_object ( $this->dbuser )) {
						$user ["updatemv3"] = $this->getFromDbUser ( "updatemv3" );
						if (! in_array ( $this->liste_markers_map [$this->map], $user ["updatemv3"] )) {
							if (! empty ( $_POST ["newm"] ) && ! empty ( $_POST ["oldm"] )) {
								$newm = json_decode ( $_POST ["newm"], true );
								$n1 = (json_last_error () == JSON_ERROR_NONE);
								$oldm = json_decode ( $_POST ["oldm"], true );
								$n2 = (json_last_error () == JSON_ERROR_NONE);
								if ($n1 && $n2) {
									$user ["updatemv3"] [] = $this->liste_markers_map [$this->map];
									$this->setToDbUser ( [ "markers" . $this->liste_markers_map [$this->map] => $newm,"markers" => $oldm,"updatemv3" => $user ["updatemv3"] ], $user ["uid"] );
									return $this->response ( [ ] );
								} else {
									$this->responseError ( "Data seem's to be not good !" );
								}
							} else {
								$this->responseError ( "Data seem's to be not good !" );
							}
						} else {
							return $this->response ( [ ] ); // Déjà fait ...
						}
					} else {
						$this->responseError ( "User not found in db" );
					}
				} else {
					$this->responseError ( "Not logged-in or not identified" );
				}
			break;

			/**
			 * Ajout d'un marqueur
			 */
			case "addmarker" :
				$markers = "markers" . $this->liste_markers_map [$this->map];
				$retour = $this->addToData ( $markers, $this->id );
				if (is_array ( $retour ))
					// return $this->response ( [ $markers => $retour ] );
					return $this->response ( [ 'markers' => $retour ] );
				else
					return $this->responseError ( $retour );
			break;

			/**
			 * Suppression d'un marqueur
			 */
			case "removemarker" :
				$markers = "markers" . $this->liste_markers_map [$this->map];
				$retour = $this->removeFromData ( $markers, $this->id );
				if (is_array ( $retour ))
					return $this->response ( [ 'markers' => $retour ] );
				else
					return $this->responseError ( $retour );
			break;

			/**
			 * Reset des marqueurs des Maps + spécial edition
			 */
			case "resetsemap" :
				$map = self::MAP_SE;
			case "resetmarkers" :
				$map = (! isset ( $map )) ? $this->map : self::MAP_SE;
				if (isset ( $_SESSION ["user"] )) {
					$user = $_SESSION ["user"];
					$this->getUserFromDb ( $user ['uid'] , $user["sso"] );
					if (is_object ( $this->dbuser )) {
						$markers = "markers" . $this->liste_markers_map [$map];
						$user [$markers] = [ ];
						$this->setToDbUser ( [ $markers => [ ] ], $user ["uid"] );
						return $this->response ( [ $markers => [ ] ] );
					} else {
						$this->responseError ( "User not found in db" );
					}
				} else {
					$this->responseError ( "Not logged-in or not identified" );
				}
			break;

			/**
			 * Merge des marqueurs
			 */
			case "mergemarkers" :
				if (isset ( $_SESSION ["user"] )) {
					$user = $_SESSION ["user"];
					$this->getUserFromDb ( $user ['uid'] , $user["sso"] );
					if (is_object ( $this->dbuser ) && isset ( $_POST ["data"] )) {
						$new_markers = json_decode ( $_POST ["data"] );
						if (json_last_error () == JSON_ERROR_NONE) {
							$markers = "markers" . $this->liste_markers_map [$this->map];
							$user [$markers] = $this->getFromDbUser ( $markers );
							$this->setToDbUser ( [ $markers => $new_markers ], $user ["uid"] );
							return $this->response ( [ ] );
						} else {
							$this->responseError ( "Data seem's to be not good !" );
						}
					} else {
						$this->responseError ( "User not found in db" );
					}
				} else {
					$this->responseError ( "Not logged-in or not identified" );
				}
			break;
		}
	}

	/**
	 * Ajoute une valeur dans une liste et sauvegarde en base de données
	 * @param string $colonne
	 * @param string $value
	 * @return string
	 */
	private function addToData( string $colonne, string $value ) {
		if (isset ( $_SESSION ["user"] )) {
			$user = $_SESSION ["user"];
			$this->getUserFromDb ( $user ['uid'] , $user["sso"] );
			if (is_object ( $this->dbuser )) {
				$user [$colonne] = $this->getFromDbUser ( $colonne );
				if (! in_array ( $value, $user [$colonne] )) {
					$user [$colonne] [] = $value;
					$this->setToDbUser ( [ $colonne => $user [$colonne] ], $user ["uid"] );
				}
				return $user [$colonne];
			} else {
				return "User not found in db";
			}
		} else {
			return "Not logged-in or not identified";
		}
	}

	/**
	 * Enlève une valeur dans une liste et sauvegarde en base de données
	 * @param string $colonne
	 * @param string $value
	 */
	private function removeFromData( string $colonne, string $value ) {
		if (isset ( $_SESSION ["user"] )) {
			$user = $_SESSION ["user"];
			$this->getUserFromDb ( $user ['uid'] , $user["sso"] );
			if (is_object ( $this->dbuser )) {
				$user [$colonne] = $this->getFromDbUser ( $colonne );
				if (in_array ( $value, $user [$colonne] )) {
					unset ( $user [$colonne] [array_search ( $value, $user [$colonne] )] );
					$this->setToDbUser ( [ $colonne => $user [$colonne] ], $user ["uid"] );
				}
				return $user [$colonne];
			} else {
				$this->responseError ( "User not found in db" );
			}
		} else {
			$this->responseError ( "Not logged-in or not identified" );
		}
	}

	/**
	 * Retourne les informations d'un utilisateur en base
	 *
	 * @param string $uid
	 * @return string
	 */
	private function getUserFromDb( string $uid, string $sso) {
		$this->dbuser = $this->db->get_row ( "SELECT * FROM users WHERE uid = '".$uid."' AND sso = '".$sso."'" );
	}

	/**
	 * Récupération d'une valeur du tableau user récupéré en base
	 *
	 * @param string $valeur
	 * @return array|mixed
	 */
	private function getFromDbUser( string $valeur, $default = [ ] ) {
		return ($this->dbuser) ? (is_null ( $this->dbuser->{$valeur} ) ? $default : (empty ( $this->dbuser->{$valeur} ) ? $default : json_decode ( $this->dbuser->{$valeur}, true ))) : $default;
	}

	/**
	 * Enregistre en base le tableau pour un utilisateur
	 *
	 * @param string $colonne
	 * @param array $valeur
	 * @param string $uid
	 * @return bool|NULL
	 */
	private function setToDbUser( array $donnees, string $uid ): ?bool {
		foreach ( $donnees as $colonne => $valeur ) {
			$maj = $this->db->update ( 'users', [ $colonne => json_encode ( ((is_array($valeur))?array_values($valeur):$valeur))], [ 'uid' => $uid ] );
			if (! $maj)
				return false;
		}
		return true;
	}

	private function getMapUrl() {
		$url = $this->liste_fichier_map[self::MAP_TEYVAT];
		if ($this->map) $url =  (isset($this->liste_fichier_map[$this->map]))?$this->liste_fichier_map[$this->map]:$this->liste_fichier_map[self::MAP_TEYVAT];
		return $this->root.$url;
	}

	/**
	 * Récupère le token en Session
	 * @return string
	 */
	public function getCurrentToken() {
		$liste = ["google_token","discord_token"];
		$resultat = null;
		foreach ($liste as $l) $resultat = (self::session($l))?(empty($resultat)?$l:"error"):$resultat;
		return $resultat;
	}

	/**
	 * Renvoi d'une réponse
	 *
	 * @param array $reponse
	 */
	public function response( array $reponse ) {
		header ( 'Content-Type: application/json; charset=utf-8' );
		echo json_encode ( $reponse );
		die (); // Fin de Procédure
	}

	/**
	 * Renvoi d'une réponse type erreur
	 *
	 * @param string $erreur
	 */
	public function responseError( string $erreur ) {
		header ( 'Content-Type: application/json; charset=utf-8' );
		echo json_encode ( [ "error" => $erreur ] );
		die (); // Fin de Procédure
	}
}
