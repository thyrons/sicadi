<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_formas_pagos,nombre_forma FROM formas_pago ORDER BY id_formas_pagos"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>