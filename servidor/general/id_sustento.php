<?php
  include '../conexion.php';	    
  $cont=0;
  conectarse();	  
  $sql = pg_query("SELECT id_sustento from sustento order by id_sustento asc");
  while($row=pg_fetch_row($sql)){
  	$cont=$row[0];
  }
  $cont=$cont+1;
  echo $cont;
  
?>