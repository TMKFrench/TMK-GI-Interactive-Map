<?php
/*
* MyPDO Extended Class
*
* A class that inherits from PDO, but
* fixes the functionality of the rowCount method using
* the COUNT(*) query hack.
*
* Written by Eli Sand. Sourced from PHP.net:
* http://www.php.net/manual/en/pdostatement.rowcount.php#87110
*/
class MyPDO extends PDO {
    private $queryString;

    public function query(/* ... */) {
        $args = func_get_args();
        $this->queryString = func_get_arg(0);

        return call_user_func_array(array(&$this, 'parent::query'), $args);
    }

    public function rowCount() {
        $regex = '/^SELECT\s+(?:ALL\s+|DISTINCT\s+)?(?:.*?)\s+FROM\s+(.*)$/i';
        if (preg_match($regex, $this->queryString, $output) > 0) {
            $stmt = parent::query("SELECT COUNT(*) FROM {$output[1]}", PDO::FETCH_NUM);

            return $stmt->fetchColumn();
        }

        return false;
    }
}