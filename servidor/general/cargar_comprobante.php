<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_comprobante,tipo_comprobante FROM comprobante ORDER BY id_comprobante"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>