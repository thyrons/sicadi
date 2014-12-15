<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_categoria,nombre_categoria FROM categorias ORDER BY id_categoria"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>