<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();

  if($_POST['tipo']=='add'){
    $consulta=pg_query("select tipo_comprobante from comprobante where tipo_comprobante='$_POST[codigo]'");
    
    $cont=pg_num_rows($consulta);
  }
  else{     
    $consulta=pg_query("select tipo_comprobante from comprobante where tipo_comprobante='$_POST[codigo]' and id_comprobante not in ('$_POST[id]')");
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