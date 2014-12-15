<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();

  if($_POST['tipo']=='add'){
    $consulta=pg_query("select ci_ruc_pass from proveedores where ci_ruc_pass='$_POST[codigo]' and tipo_documento='$_POST[campo]'");
    $cont=pg_num_rows($consulta);
  }
  else{
     
    $consulta=pg_query("select ci_ruc_pass from proveedores where ci_ruc_pass='$_POST[codigo]' and tipo_documento='$_POST[campo]' and id_proveedor not in ('$_POST[id]')");
    $cont=pg_num_rows($consulta);
  }
  if($cont>0){
    echo 0;
  }
  else{
     echo 1;
  }

  pg_close();		
?>