<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_proveedor,empresa_proveedor FROM proveedores ORDER BY id_proveedor"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>