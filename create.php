<?php require 'assets/inc/_fn.php';

$_map = $_GET['map'];
if((isset($_map) && !empty($_map)) && ($_map == "teyvat" || $_map == "enka" || $_map == "gouffre" || $_map == "summer22")) {
    $_map = "-{$_map}";
} else {
    echo "Nom de map absent ou éronné";
    die();
}

$db = new SQLite3Database("markers$_map.db");

$map = [];
$nbtm = 0;
$counter = 0;
$i = 0;

$groups = $db->get_rows('SELECT * FROM genshin_map_group');
$markers = $db->get_rows('SELECT * FROM genshin_map_marker');

foreach($groups as $g => $group) {
    $map[$group->groupid] = [
        'id' => $group->groupid,
        'grouptitle' => $group->title,
        'markers' => [],
    ];
};

foreach($markers as $m => $marker) {
    $map[$marker->mgroup]['markers'][$m] = [
        'id' => $marker->uid,
        'format' => $marker->format,
        'x' => $marker->x,
        'y' => $marker->y,
    ];

    if($marker->video) {
        $map[$marker->mgroup]['markers'][$m]['video'] = $marker->video;
    };

    if($marker->text) {
        $map[$marker->mgroup]['markers'][$m]['text'] = $marker->text;
    };

    if($marker->title) {
        $map[$marker->mgroup]['markers'][$m]['title'] = $marker->title;
    };
};

$js = "// Liste des Marqueurs\n\n";

foreach($map as $group) {
    if(isset($group['grouptitle']) && $group['grouptitle'] !="") {
        $js .= "{$group['grouptitle']}\n\n";
    };
    $js .= "var list{$group['id']} = [\n\t";
    $counter = 1;
    $i = 1;
    $nbtm = count($group['markers']);

    foreach($group['markers'] as $marker) {

        $xx = ($marker['x'] < 10000) ? " ".$marker['x'] : $marker['x'];
        $yy = ($marker['y'] < 10000) ? " ".$marker['y'] : $marker['y'];
        $js .= "[{$marker['format']},[{$xx},{$yy}]";
        if(isset($marker['video'])) {
            $js .= ",\"{$marker['video']}\"";
        };
        if(isset($marker['text'])) {
            $js .= ",{$marker['text']}";
        };
        if(isset($marker['title'])) {
            $js .= ",{$marker['title']}";
        };
        if($i != $nbtm) {
            $js .= "],";
        } else {
            $js .= "]";
        };
        if($counter == 10 && $i != $nbtm) {
            $js .= "\n\t";
            $counter = 0;
        };
        $counter += 1;
        $i += 1;
    };

    $js .= "\n];\n\n";
};
$fnbk = "assets/js/mkbk/markers{$_map} - ".date('Y-m-d H:i:s').".js";
$fn = "assets/js/markers{$_map}.js";
file_put_contents($fnbk, $js);
file_put_contents($fn, $js);
dd("Fichier de backup $fnbk créé et $fn remplacé sur le serveur");

?>