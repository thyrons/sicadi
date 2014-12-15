<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_familia,nombre_familia FROM familia ORDER BY id_familia"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>