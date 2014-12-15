<?php
  include '../conexion.php';	
  $data=0;
  conectarse();
	session_start();
  date_default_timezone_set('UTC');	
  $fecha=date("Y-m-d");
	function usuario(){
    return $_SESSION["usuario"];
  }
  function tipoUsuario(){
    $consulta=pg_query("select descripcion from usuario,\"tipoUsuario\" where usuario.\"codigoTipoUsuario\"=\"tipoUsuario\".codigo and usuario.codigo='$_SESSION[id]'");
    while($row=pg_fetch_array($consulta)){
      return $row[0]
    }
  }
  function nombreCompleto(){
    $consulta=pg_query("select nombre-completo from usuario,\"tipoUsuario\" where usuario.\"codigoTipoUsuario\"=\"tipoUsuario\".codigo and usuario.codigo='$_SESSION[id]'");
    while($row=pg_fetch_array($consulta)){
      $nombreUsuario = $row[0];
      return $nombreUsuario;
    } 
  }
	pg_close();		

?>