<?php require_once 'assets/inc/_fn.php';

$config = parse_ini_file("config.ini", true);
$db = new SQLite3Database('tmkmap.db');
// $db = new SQLite3Database('tmkmapusers.db');

@session_start();

$method = $_SERVER['REQUEST_METHOD'];
$path_info = isset($_SERVER['ORIG_PATH_INFO'])?$_SERVER['ORIG_PATH_INFO']:'';
$request = explode('/', trim($path_info,'/'));
$root = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . str_replace('api.php', '', $_SERVER['SCRIPT_NAME']);
$map = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$action = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$id = sanitize(preg_replace('/[^a-z0-9_]+/i','',array_shift($request)));

if($method == 'GET' && $action == 'login') {

    $params = array(
        'client_id' => $config['discord']['client_id'],
        'redirect_uri' => $root . 'api/' . $map . '/code',
        'response_type' => 'code',
        'scope' => 'identify'
    );

    // Redirect the user to Discord's authorization page
    header('Location: ' . $config['discord']['url_authorize'] . '?' . http_build_query($params));
    die();

} elseif($method == 'GET' && $action == 'code') {
    $token = apiRequest($config['discord']['url_token'], array(
        "grant_type" => "authorization_code",
        'client_id' => $config['discord']['client_id'],
        'client_secret' => $config['discord']['client_secret'],
        'redirect_uri' => $root . 'api/' . $map . '/code',
        'code' => $_GET['code']
    ));
    $logout_token = $token->access_token;
    $_SESSION['access_token'] = $token->access_token;

    $user = apiRequest($config['discord']['url_user']);
    $data = [
        'uid' => $user->id,
        'username' =>  $user->username . '#' . $user->discriminator,
        'avatar' =>  'https://cdn.discordapp.com/avatars/' . $user->id . '/' . $user->avatar . '.png',
        'avatar_default' => 'https://cdn.discordapp.com/embed/avatars/' . ($user->discriminator % 5) . '.png',
        'logout' => $root . 'api/' . $map . '/logout'
    ];

    $_SESSION['user'] = $data;

    header('Location: ' . $root);
    die();
} elseif($method == 'GET' && $action == 'user') {
    header('Content-Type: application/json');

    $dbCountUsers = $db->get_row("SELECT COUNT(*) AS total FROM users");

    if(!session('visited')){
        $counter = (int) file_get_contents('hits.txt') + 1;
        file_put_contents('hits.txt', $counter);
    } else {
        $counter = (int) file_get_contents('hits.txt');
    }

    $_SESSION['visited'] = TRUE;

    if($user = session('user')) {
        if(isset($user['uid'])) {
            $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
            if(!$dbUser) {
                $db->insert('users', [
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
                $db->update('users', [ 'last_login' => date('Y-m-d H:i:s') ], [ 'uid' => $user['uid'] ]);
            }

            if($map == 't') {
                $user['menu'] = ($dbUser) ? json_decode($dbUser->menut) : [];
                $user['btn'] = ($dbUser) ? json_decode($dbUser->btnt) : [];
                $user['region'] = ($dbUser) ? json_decode($dbUser->region) : [];
                $user['chest'] = ($dbUser) ? json_decode($dbUser->chest) : [];
            } elseif ($map == 'e') {
                $user['menu'] = ($dbUser) ? json_decode($dbUser->menue) : [];
                $user['btn'] = ($dbUser) ? json_decode($dbUser->btne) : [];
            } elseif ($map == 'go') {
                $user['menu'] = ($dbUser) ? json_decode($dbUser->menugo) : [];
                $user['btn'] = ($dbUser) ? json_decode($dbUser->btngo) : [];
            } elseif ($map == 'se') {
                $user['menu'] = ($dbUser) ? json_decode($dbUser->menuse) : [];
                $user['btn'] = ($dbUser) ? json_decode($dbUser->btnse) : [];
            }
            $user['markers'] = ($dbUser) ? json_decode($dbUser->markers) : [];
            $user['users'] = $dbCountUsers->total;
            $user['visits'] = $counter;

            echo json_encode($user);
            die();
        }
    }

    echo json_encode(['login' => $root . 'api/' . $map . '/login', 'users' => $dbCountUsers->total, 'visits' => $counter]);
    die();

} elseif($method == 'POST' && $action == 'addmarker') {
    header('Content-Type: application/json');

    if($user = session('user')) {

        $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
        // $user['menu'] = json_decode($dbUser->menu);
        $user['markers'] = json_decode($dbUser->markers);

        if(!in_array($id, $user['markers'])) {
            $user['markers'][] = $id;
            $db->update('users', ['markers' => json_encode($user['markers'])], ['uid' => $user['uid']]);
        }
        $reponse['markers'] = $user['markers'];
        echo json_encode($reponse);
        die();
    }

    echo json_encode(['error' => 'Utilisateur introuvable...']);
    die();
} elseif($method == 'POST' && $action =='removemarker') {
    header('Content-Type: application/json');

    if($user = session('user')) {

        $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
        // $user['menu'] = json_decode($dbUser->menu);
        $user['markers'] = json_decode($dbUser->markers);

        if($user['markers'] && in_array($id, $user['markers'])) {
            $k = array_search($id, $user['markers']);
            array_splice($user['markers'], $k, 1);

            $db->update('users', ['markers' => json_encode($user['markers'])], ['uid' => $user['uid']]);
        }
        $reponse['markers'] = $user['markers'];
        echo json_encode($reponse);
        die();
    }

    echo json_encode(['error' => 'Utilisateur introuvable...']);
    die();
} elseif($method == 'POST' && $action == 'resetmarkers') {
    // header('Content-Type: application/json');

    if($user = session('user')) {

        $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
        if($dbUser) {
            $db->update('users', ['markers' => json_encode([])], ['uid' => $user['uid']]);
        }
        echo 'Reset complete';
        die();
    }

    echo json_encode(['error' => 'Utilisateur introuvable...']);
    die();
} elseif($method == 'POST' && $action == 'resetsemap') {
    // header('Content-Type: application/json');

    if($user = session('user')) {

        $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
        if($dbUser) {
            $db->update('users', ['menuse' => json_encode([]), 'btnse' => json_encode([]), 'last_coordse' => json_encode([])], ['uid' => $user['uid']]);
        }
        echo 'Reset semap complete';
        die();
    }

    echo json_encode(['error' => 'Utilisateur introuvable...']);
    die();
} elseif($method == 'POST' && $action == 'mergemarkers') {
    header('Content-Type: application/json');

    if($user = session('user')) {

        $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
        if($dbUser) {
           $db->update('users', ['markers' => $_POST['data']], ['uid' => $user['uid']]);
        }
        echo 'Merge complete';
        die();
    }

    echo json_encode(['error' => 'Utilisateur introuvable...']);
    die();
} elseif($method == 'GET' && $action == 'logout') {
    session_destroy();
    header('Location: ' . $root);
    die();
} elseif($method == 'POST' && $action == 'addmenu') {
    if($user = session('user')) {
        $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
        if($dbUser) {
            if($map == 't') {
                $menu = is_null($dbUser->menut)?[]:json_decode($dbUser->menut);
                if(!in_array($id, $menu)) {
                    $menu[] = $id;
                    $db->update('users', ['menut' => json_encode($menu)], ['uid' => $user['uid']]);
                }
            } elseif ($map == 'e') {
                $menu = is_null($dbUser->menue)?[]:json_decode($dbUser->menue);
                if(!in_array($id, $menu)) {
                    $menu[] = $id;
                    $db->update('users', ['menue' => json_encode($menu)], ['uid' => $user['uid']]);
                }
            } elseif ($map == 'go') {
                $menu = is_null($dbUser->menugo)?[]:json_decode($dbUser->menugo);
                if(!in_array($id, $menu)) {
                    $menu[] = $id;
                    $db->update('users', ['menugo' => json_encode($menu)], ['uid' => $user['uid']]);
                }
            } elseif ($map == 'se') {
                $menu = is_null($dbUser->menuse)?[]:json_decode($dbUser->menuse);
                if(!in_array($id, $menu)) {
                    $menu[] = $id;
                    $db->update('users', ['menuse' => json_encode($menu)], ['uid' => $user['uid']]);
                }
            }
        }
    }
    echo json_encode($menu);
    die();
} elseif($method == 'POST' && $action == 'removemenu') {
    if($user = session('user')) {
        $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
        if($dbUser) {
            if($map == 't') {
                $menu = json_decode($dbUser->menut);
                if(in_array($id, $menu)) {
                    $k = array_search($id, $menu);
                    array_splice($menu, $k, 1);
                    $db->update('users', ['menut' => json_encode($menu)], ['uid' => $user['uid']]);
                }
            } elseif ($map == 'e') {
                $menu = json_decode($dbUser->menue);
                if(in_array($id, $menu)) {
                    $k = array_search($id, $menu);
                    array_splice($menu, $k, 1);
                    $db->update('users', ['menue' => json_encode($menu)], ['uid' => $user['uid']]);
                }                
            } elseif ($map == 'go') {
                $menu = json_decode($dbUser->menugo);
                if(in_array($id, $menu)) {
                    $k = array_search($id, $menu);
                    array_splice($menu, $k, 1);
                    $db->update('users', ['menugo' => json_encode($menu)], ['uid' => $user['uid']]);
                }                
            } elseif ($map == 'se') {
                $menu = json_decode($dbUser->menuse);
                if(in_array($id, $menu)) {
                    $k = array_search($id, $menu);
                    array_splice($menu, $k, 1);
                    $db->update('users', ['menuse' => json_encode($menu)], ['uid' => $user['uid']]);
                }
            }
        }
    };

    die();
} elseif($method == 'POST' && $action == 'addbtn') {
    if($user = session('user')) {
        $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
        if($dbUser) {
            if($map == 't') {
                $menu = is_null($dbUser->btnt)?[]:json_decode($dbUser->btnt);
                if(!in_array($id, $menu)) {
                    $menu[] = $id;
                    $db->update('users', ['btnt' => json_encode($menu)], ['uid' => $user['uid']]);
                }
            } elseif ($map == 'e') {
                $menu = is_null($dbUser->btne)?[]:json_decode($dbUser->btne);
                if(!in_array($id, $menu)) {
                    $menu[] = $id;
                    $db->update('users', ['btne' => json_encode($menu)], ['uid' => $user['uid']]);
                }
            } elseif ($map == 'go') {
                $menu = is_null($dbUser->btngo)?[]:json_decode($dbUser->btngo);
                if(!in_array($id, $menu)) {
                    $menu[] = $id;
                    $db->update('users', ['btngo' => json_encode($menu)], ['uid' => $user['uid']]);
                }
            } elseif ($map == 'se') {
                $menu = is_null($dbUser->btnse)?[]:json_decode($dbUser->btnse);
                if(!in_array($id, $menu)) {
                    $menu[] = $id;
                    $db->update('users', ['btnse' => json_encode($menu)], ['uid' => $user['uid']]);
                }
            }
        }
    }

    die();
} elseif($method == 'POST' && $action == 'removebtn') {
    if($user = session('user')) {
        $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
        if($dbUser) {
            if($map == 't') {
                $menu = json_decode($dbUser->btnt);
                if(in_array($id, $menu)) {
                    $k = array_search($id, $menu);
                    array_splice($menu, $k, 1);
                    $db->update('users', ['btnt' => json_encode($menu)], ['uid' => $user['uid']]);
                }
            } elseif ($map == 'e') {
                $menu = json_decode($dbUser->btne);
                if(in_array($id, $menu)) {
                    $k = array_search($id, $menu);
                    array_splice($menu, $k, 1);
                    $db->update('users', ['btne' => json_encode($menu)], ['uid' => $user['uid']]);
                }                
            } elseif ($map == 'go') {
                $menu = json_decode($dbUser->btngo);
                if(in_array($id, $menu)) {
                    $k = array_search($id, $menu);
                    array_splice($menu, $k, 1);
                    $db->update('users', ['btngo' => json_encode($menu)], ['uid' => $user['uid']]);
                }                
            } elseif ($map == 'se') {
                $menu = json_decode($dbUser->btnse);
                if(in_array($id, $menu)) {
                    $k = array_search($id, $menu);
                    array_splice($menu, $k, 1);
                    $db->update('users', ['btnse' => json_encode($menu)], ['uid' => $user['uid']]);
                }
            }
        }
    };

    die();
} elseif($method == 'POST' && $action == 'addregion') {
    // header('Content-Type: application/json');

    if($user = session('user')) {

        $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
        // $user['menu'] = json_decode($dbUser->menu);
        $user['region'] = json_decode($dbUser->region);

        if(!in_array($id, $user['region'])) {
            $user['region'][] = $id;
            $db->update('users', ['region' => json_encode($user['region'])], ['uid' => $user['uid']]);
        }
        $reponse['region'] = $user['region'];
        echo json_encode($reponse);
        die();
    }

    echo json_encode(['error' => 'Utilisateur introuvable...']);
    die();
} elseif($method == 'POST' && $action =='removeregion') {
    // header('Content-Type: application/json');

    if($user = session('user')) {

        $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
        // $user['menu'] = json_decode($dbUser->menu);
        $user['region'] = json_decode($dbUser->region);

        if($user['region'] && in_array($id, $user['region'])) {
            $k = array_search($id, $user['region']);
            array_splice($user['region'], $k, 1);

            $db->update('users', ['region' => json_encode($user['region'])], ['uid' => $user['uid']]);
        }
        $reponse['region'] = $user['region'];
        echo json_encode($reponse);
        die();
    }

    echo json_encode(['error' => 'Utilisateur introuvable...']);
    die();
} elseif($method == 'POST' && $action == 'addchest') {
    // header('Content-Type: application/json');

    if($user = session('user')) {

        $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
        // $user['menu'] = json_decode($dbUser->menu);
        $user['chest'] = json_decode($dbUser->chest);

        if(!in_array($id, $user['chest'])) {
            $user['chest'][] = $id;
            $db->update('users', ['chest' => json_encode($user['chest'])], ['uid' => $user['uid']]);
        }
        $reponse['chest'] = $user['chest'];
        echo json_encode($reponse);
        die();
    }

    echo json_encode(['error' => 'Utilisateur introuvable...']);
    die();
} elseif($method == 'POST' && $action =='removechest') {
    // header('Content-Type: application/json');

    if($user = session('user')) {

        $dbUser = $db->get_row("SELECT * FROM users WHERE uid = {$user['uid']}");
        // $user['menu'] = json_decode($dbUser->menu);
        $user['chest'] = json_decode($dbUser->chest);

        if($user['chest'] && in_array($id, $user['chest'])) {
            $k = array_search($id, $user['chest']);
            array_splice($user['chest'], $k, 1);

            $db->update('users', ['chest' => json_encode($user['chest'])], ['uid' => $user['uid']]);
        }
        $reponse['chest'] = $user['chest'];
        echo json_encode($reponse);
        die();
    }

    echo json_encode(['error' => 'Utilisateur introuvable...']);
    die();
} else {
    echo json_encode(['method' => $method, 'action' => $action, 'id' => $id]);
}