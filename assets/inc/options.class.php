<?php

class options {

	use _fn;

	private $db; // Base de données
	private $uid; // Uid de l'utilisateur
	private $sso; // Type de sso

	const ETAT_MARKERS_TROUVES 			= "oemt"; // Option état markers trouvés
	const ETAT_AFFICHAGE_UNDERGROUND 	= "oeau"; // Option état affichage underground
	const ETAT_AFFICHAGE_REGION 		= "oear"; // Option état affichage région

	// Différents type d'option :
	// 	OuiNon => retour true/false
	//  Liste  => retour Tableau de valeur
	private $types = [
		self::ETAT_MARKERS_TROUVES 			=> "OuiNon",
		self::ETAT_AFFICHAGE_UNDERGROUND	=> "OuiNon",
		self::ETAT_AFFICHAGE_REGION			=> "OuiNon"
	];

	public function __construct(SQLite3Database $db) {
		$this->db = $db;
	}

	public function init($uid,$sso) {
		$this->uid = $uid;
		$this->sso = $sso;
	}

	public function getOption($type) {
		$type = is_string($type)?[$type]:$type;
		if (empty($this->uid) or empty($this->sso)) {
			return null;
		} else {
			$type = array_intersect(array_keys($this->types),$type);
		}
		$options = $this->db->get_rows ( "SELECT type,option FROM options WHERE uid = '".$this->uid."' AND sso = '".$this->sso."' AND type IN ('".implode("','",$type)."')" , true);
		$options = is_null($options)?[]:$options;
		$retour = [];
		foreach ($type as $t) {
			$v = array_filter($options,fn($o) => $o["type"] == $t);
			switch ($this->types[$t]) {
				case "OuiNon":
					$retour[$t] = !(empty($v))?"true":"false";
				break;
				case "Liste":
					$retour[$t] = (empty($v))?[]:json_decode($v);
				break;
				default:
					$retour[$t] = null;
			}
		}
		return $retour;
	}

	public function putOption($options) {
		if (empty($this->uid) or empty($this->sso) or !is_array($options)) {
			return null;
		}
		foreach ($options as $type => $option) {
			if (!isset($this->types[$type]))
				continue;
			switch ($this->types[$type]) {
				case "OuiNon":
					$option = ($option)?"true":"false";
				break;
				case "Liste":
					$option = (empty($option))?$option:json_encode($option,JSON_OBJECT_AS_ARRAY);
				break;
			}
			if (empty($option) or ($option == "false")) {
				// Suppression
				$this->db->delete("options",["type" => $type,"uid" => $this->uid,"sso" => $this->sso]);
			} else {
				$test = $this->getOption($type);
				if (($test[$type] == "false") or ($test[$type] == false) or (empty($test[$type]))) {
					// Ajout
					$this->db->insert("options",["uid" => $this->uid,"sso" => $this->sso,"type" => $type,"option" => $option]);
				} else {
					// Modification
					$this->db->update("options",["option" => $option],["type" => $type,"uid" => $this->uid,"sso" => $this->sso]);
				}
			}
		}
	}
}