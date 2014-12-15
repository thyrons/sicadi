<?php

include '../conexion.php';
conectarse();

$examp = $_REQUEST["q"]; //query number
$page = $_REQUEST['page']; // get the requested page
$limit = $_REQUEST['rows']; // get how many rows we want to have into the grid
$sidx = $_REQUEST['sidx']; // get index row - i.e. user click to sort
$sord = $_REQUEST['sord']; // get the direction
if (!$sidx)
    $sidx = 1;

$wh = "";
$searchOn = Strip($_REQUEST['_search']);
if ($searchOn == 'true') {
    $fld = Strip($_REQUEST['searchField']);

    if ($fld == 'nombre_provincia') {
        //$fldata = Strip(strtoupper($_REQUEST['searchString']));
        $fldata = Strip($_REQUEST['searchString']);
        $foper = Strip($_REQUEST['searchOper']);
        if ($fld == 'nombre_provincia') {
            $wh .= " WHERE nombre_provincia";
        }
      
        // costruct where
        switch ($foper) {
            case "bw":
                $fldata .= "%";
                $wh .= " LIKE '" . $fldata . "'";
                break;
            case "eq":
                if (is_numeric($fldata)) {
                    $wh .= " = " . $fldata;
                } else {
                    $wh .= " = '" . $fldata . "'";
                }
                break;
            case "ne":
                if (is_numeric($fldata)) {
                    $wh .= " <> " . $fldata;
                } else {
                    $wh .= " <> '" . $fldata . "'";
                }
                break;
            case "lt":
                if (is_numeric($fldata)) {
                    $wh .= " < " . $fldata;
                } else {
                    $wh .= " < '" . $fldata . "'";
                }
                break;
            case "le":
                if (is_numeric($fldata)) {
                    $wh .= " <= " . $fldata;
                } else {
                    $wh .= " <= '" . $fldata . "'";
                }
                break;
            case "gt":
                if (is_numeric($fldata)) {
                    $wh .= " > " . $fldata;
                } else {
                    $wh .= " > '" . $fldata . "'";
                }
                break;
            case "ge":
                if (is_numeric($fldata)) {
                    $wh .= " >= " . $fldata;
                } else {
                    $wh .= " >= '" . $fldata . "'";
                }
                break;
            case "ew":
                $wh .= " LIKE '%" . $fldata . "'";
                break;
            case "cn":
                $wh .= " LIKE '%" . $fldata . "%'";
                break;
            default :
                $wh = "";
        }
    }
}
switch ($examp) {
    case 1:
        //echo "SELECT COUNT(*) FROM pais,provincia " . $wh. " where pais.id_pais=provincia.id_pais";
        
        $result = pg_query("SELECT COUNT(*) FROM pais,provincia " . $wh. " where pais.id_pais=provincia.id_pais");

        $row = pg_fetch_array($result, null, PGSQL_ASSOC);
        $count = $row['count'];

        if ($count > 0) {
            $total_pages = ceil($count / $limit);
        } else {
            $total_pages = 0;
        }
        if ($page > $total_pages)
            $page = $total_pages;
        $start = $limit * $page - $limit; // do not put $limit*($page - 1)
        if ($start < 0)
            $start = 0;

        $SQL = "SELECT  * FROM pais,provincia " . $wh . " where pais.id_pais=provincia.id_pais ORDER BY " . $sidx . " " . $sord . " LIMIT " . $limit . " OFFSET " . $start;
        $result = pg_query($SQL) or die("Couldn t execute query." . pg_last_error());

        if (stristr($_SERVER["HTTP_ACCEPT"], "application/xhtml+xml")) {
            header("Content-type: application/xhtml+xml;charset=utf-8");
        } else {
            header("Content-type: text/xml;charset=utf-8");
        }
        $et = ">";
        $s = "<?xml version='1.0' encoding='utf-8'?$et\n";
        $s .= "<rows>";
        $s .= "<page>" . $page . "</page>";
        $s .= "<total>" . $total_pages . "</total>";
        $s .= "<records>" . $count . "</records>";
        // be sure to put text data in CDATA
        while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
            $s .= "<row id='" . $row['id_provincia'] . "'>";            
            $s .= "<cell>" . $row['id_provincia'] . "</cell>";
            $s .= "<cell>" . $row['nombre_provincia'] . "</cell>";
            $s .= "<cell>" . $row['id_pais'] . "</cell>";
            $s .= "<cell>" . $row['nombre_pais'] . "</cell>";            
            $s .= "</row>";
        }
        $s .= "</rows>";
        echo $s;
        break;
}


function Strip($value) {
    if (get_magic_quotes_gpc() != 0) {
        if (is_array($value))
            if (array_is_associative($value)) {
                foreach ($value as $k => $v)
                    $tmp_val[$k] = stripslashes($v);
                $value = $tmp_val;
            }
            else
                for ($j = 0; $j < sizeof($value); $j++)
                    $value[$j] = stripslashes($value[$j]);
        else
            $value = stripslashes($value);
    }
    return $value;
}

function array_is_associative($array) {
    if (is_array($array) && !empty($array)) {
        for ($iterator = count($array) - 1; $iterator; $iterator--) {
            if (!array_key_exists($iterator, $array)) {
                return true;
            }
        }
        return !array_key_exists(0, $array);
    }
    return false;
}

?>