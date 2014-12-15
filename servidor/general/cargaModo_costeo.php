<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_modo_costeo,nombre_modo FROM modo_costeo ORDER BY id_modo_costeo"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>