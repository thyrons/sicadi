<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_tipo_cliente,nombre_tipo_cliente FROM tipo_cliente ORDER BY id_tipo_cliente"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>