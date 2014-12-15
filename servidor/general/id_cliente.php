<?php
  include '../conexion.php';	    
  $cont=0;
  conectarse();	  
  $sql = pg_query("SELECT id_cliente from clientes order by id_cliente asc");
  while($row=pg_fetch_row($sql)){
  	$cont=$row[0];
  }
  $cont=$cont+1;
  echo $cont;
  
?>