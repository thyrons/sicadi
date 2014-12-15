<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from familia");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if(isset($_POST['accion'])=='add'){
    $str = ucwords(strtolower($_POST['nomFamilia']));
    $consulta=pg_query("select * from familia where nombre_familia='$str'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }   
    if($error==0){
      pg_query("insert into familia values ('$contador','$str')");
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
    $str = ucwords(strtolower($_POST['nombre_familia']));
    $consulta=pg_query("select * from familia where nombre_familia='$str' and id_familia not in('$_POST[id_familia]')");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }    
    if($error==0){
      pg_query("update familia set nombre_familia='$str' where id_familia='$_POST[id_familia]'");
      $error=0;
    }    
    echo $error;
  }


	pg_close();		
?>