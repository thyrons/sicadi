<?php
  include '../conexion.php';	    
  conectarse();	  
  $total;
  $sql = pg_query("SELECT iva_base FROM parametros ORDER BY id_parametro"); 
  while($row=pg_fetch_row($sql)){
  	$total=$row[0];
  }
  echo $total;
  pg_close();		
?>