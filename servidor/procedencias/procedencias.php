<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from procedencia");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if(isset($_POST['accion'])=='add'){
    $str = ucwords(strtolower($_POST['nomProcedencia']));
    $consulta=pg_query("select * from procedencia where nombre_procedencia='$str'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }   
    if($error==0){
      pg_query("insert into procedencia values ('$contador','$str')");
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
    $str = ucwords(strtolower($_POST['nombre_procedencia']));
    $consulta=pg_query("select * from procedencia where nombre_procedencia='$str' and id_procedencia not in('$_POST[id_procedencia]')");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }    
    if($error==0){
      pg_query("update procedencia set nombre_procedencia='$str' where id_procedencia='$_POST[id_procedencia]'");
      $error=0;
    }    
    echo $error;
  }


	pg_close();		
?>