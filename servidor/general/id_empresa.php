<?php
  include '../conexion.php';	    
  $cont=0;
  conectarse();	  
  $sql = pg_query("SELECT id_empresa from empresa order by id_empresa asc");
  while($row=pg_fetch_row($sql)){
  	$cont=$row[0];
  }
  $cont=$cont+1;
  echo $cont;
  
?>