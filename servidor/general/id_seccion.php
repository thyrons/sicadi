<?php
  include '../conexion.php';	
  $data=0;
  conectarse();
	session_start(); 
	echo $_SESSION["id_empresa"];  
  pg_close();		
?>