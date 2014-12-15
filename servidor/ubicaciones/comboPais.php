<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_pais,nombre_pais FROM pais ORDER BY id_pais"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
	pg_close();		
?>