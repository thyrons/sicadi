<?php
  include '../conexion.php';    
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();  
  if($_POST['funcion']=='1'){
    if($_POST['oper']=='add'){
      $SQL=pg_query("select codigo_producto from productos where codigo_producto='$_POST[codigo]'");
      $cont=pg_num_rows($SQL);
    }
    if($_POST['oper']=='edit'){
      $SQL=pg_query("select codigo_producto from productos where codigo_producto='$_POST[codigo]' and codigo_producto not in ('$_POST[id]')");
      $cont=pg_num_rows($SQL);
    }
  }
  if($_POST['funcion']=='2'){
    if($_POST['oper']=='add'){
     
      $SQL=pg_query("select codigo_barras from productos where codigo_barras='$_POST[codigo]'");
      $cont=pg_num_rows($SQL);
    }
    if($_POST['oper']=='edit'){
      $SQL=pg_query("select codigo_barras from productos where codigo_barras='$_POST[codigo]' and codigo_barras not in ('$_POST[id]')");
      $cont=pg_num_rows($SQL);
    }
  }
  if($cont>0){
    echo 0;
  }
  else{
     echo 1;
  }
  pg_close();   
?>