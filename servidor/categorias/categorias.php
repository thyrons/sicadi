<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from categorias");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if(isset($_POST['accion'])=='add'){
    $str = ucwords(strtolower($_POST['nomCategoria']));
    $consulta=pg_query("select * from categorias where nombre_categoria='$str'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }   
    if($error==0){
      pg_query("insert into categorias values ('$contador','$str')");
      $error=0;
    }
    if($error==0){
        echo "{success: true}";
    }
    if($error==1){
        echo "{success: false, errors: { reason: 'Este nombre ya existe ingrese otro.' }}";
    }    
  }
  if(isset($_POST['oper'])=='edit'){
    $str = ucwords(strtolower($_POST['nombre_categoria']));
    $consulta=pg_query("select * from categorias where nombre_categoria='$str' and id_categoria not in('$_POST[id_categoria]')");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }    
    if($error==0){
      pg_query("update categorias set nombre_categoria='$str' where id_categoria='$_POST[id_categoria]'");
      $error=0;
    }    
    echo $error;
  }


	pg_close();		
?>