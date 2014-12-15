<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_marca,nombre_marca FROM marcas ORDER BY id_marca"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>