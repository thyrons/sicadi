<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_sustento,tipo_sustento FROM sustento ORDER BY id_sustento"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>