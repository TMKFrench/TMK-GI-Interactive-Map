<?php require 'assets/inc/_fn.php';

$db = new SQLite3Database('devmarkers.db');

$method = $_SERVER['REQUEST_METHOD'];
$path_info = isset($_SERVER['ORIG_PATH_INFO'])?$_SERVER['ORIG_PATH_INFO']:$_SERVER['PATH_INFO']; // Ligne pour serveur 1and1
// $path_info = isset($_SERVER['PATH_INFO'])?$_SERVER['PATH_INFO']:''; // Ligne pour serveur local
$request = explode('/', trim($path_info,'/'));
// $root = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . str_replace('devapi.php', '', $_SERVER['SCRIPT_NAME']);
$action = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));

$map = [];

if($method == 'POST' && $action == 'add') {
    header('Content-Type: application/json');

    $mdata = json_decode($_POST['data']);
    $db->insert('dev_markers', [
        'uid' => $mdata[0],
        'mid' => $mdata[1],
        'mgroup' => $mdata[2],
        'x' => $mdata[3],
        'y' => $mdata[4]
    ]);
    // echo var_dump($mdata);
    echo "Marker uid : '{$mdata[0]}' '{$mdata[1]}' '{$mdata[2]}' '{$mdata[3]}' '{$mdata[4]}' ajouté";
    die();

} elseif($method == 'POST' && $action == 'delete') {
    header('Content-Type: application/json');
    $uid = $_POST['data'];
    $db->delete('dev_markers', ['uid' => $uid]);

    echo "Marker uid : '{$uid}' effacé";
    die();

// } elseif($method == 'POST' && $action == 'addunder') {
//     header('Content-Type: application/json');

//     $muid = '"'.$_POST['data'].'"';
//     $marker = $db->get_row("SELECT * FROM dev_markers WHERE uid = $muid");
//     $db->update('dev_markers', ['under' => "true"], ['uid' => $muid]);

//     echo "Marker uid : ".$_POST['data']." Under ajouté";
//     die();

// } elseif($method == 'POST' && $action == 'delunder') {
//     header('Content-Type: application/json');

//     $muid = '"'.$_POST['data'].'"';
//     $marker = $db->get_row("SELECT * FROM dev_markers WHERE uid = $muid");
//     $db->update('dev_markers', ['under' => ''], ['uid' => $muid]);

//     echo "Marker uid : ".$_POST['data']." Under effacé";
//     die();

} elseif($method == 'POST' && $action == 'import') {
    header('Content-Type: application/json');

    $markers = $db->get_rows('SELECT * FROM dev_markers');
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
    };

    echo json_encode($map);
    die();
} else {
    echo json_encode(['method' => $method, 'action' => $action, 'data' => $_POST['data']]);
}
?>