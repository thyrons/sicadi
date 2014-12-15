<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_procedencia,nombre_procedencia FROM procedencia ORDER BY id_procedencia"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>