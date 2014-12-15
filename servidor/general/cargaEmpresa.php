<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_empresa,nombre_empresa FROM empresa ORDER BY id_empresa"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
	pg_close();		
?>