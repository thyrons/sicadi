<?php
  include '../conexion.php';	    
  $cont=0;
  conectarse();	  
  $sql = pg_query("SELECT id_codigo_compra from cab_compra order by id_codigo_compra asc");
  while($row=pg_fetch_row($sql)){
  	$cont=$row[0];
  }
  $cont=$cont+1;
  echo $cont;
  
?>