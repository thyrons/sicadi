<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_linea,nombre_linea FROM linea ORDER BY id_linea"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>