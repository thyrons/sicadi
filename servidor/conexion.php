<?php
function conectarse() {
    if (!($conexion = pg_connect("dbname=base_sicadi port=5432 user=postgres password=root"))) {			
        exit();
    } else {       
    }
    return $conexion;
}
conectarse();
?>
