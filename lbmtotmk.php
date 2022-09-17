<?php require 'assets/inc/_fn.php';

$dbtmk = new SQLite3Database('markers-teyvat.db');
// $dblbm = new SQLite3Database('markers-teyvatlbm.db');
$markers = $dbtmk->get_rows("SELECT x, y, uid FROM temp_lbm WHERE mgroup = 'panorama'");

$ajout = "## ---------- Ajouts ---------- ##\n\n";
$uid = 1;

foreach($markers as $m) {
    $x = $m->x * 2;
    $y = $m->y * 2;

    $uid2 = ($uid < 10) ? "0".$uid : $uid;

    $dbtmk->insert('genshin_map_marker', [
        'mgroup' => 'panos',
        'uid' => $uid2,
        'format' => 7,
        'x' => $x,
        'y' => $y
    ]);

    $ajout .= "Ajout uid '{$uid2}', format 7, mgroup : panos, x = '{$x}',y = {$y}\n";

    $uid += 1;
};

dd($ajout);