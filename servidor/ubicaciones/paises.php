<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from pais");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if(isset($_POST['accion'])=='add'){
    $consulta=pg_query("select * from pais where codigo_pais='$_POST[codPais]'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }
    $consulta=pg_query("select * from pais where nombre_pais='$_POST[nomPais]'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=2;
    }
    if($error==0){
      pg_query("insert into pais values ('$contador','$_POST[nomPais]','$_POST[codPais]')");
      $error=0;
    }
    if($error==0){
        echo "{success: true}";
    }
    if($error==1){
        echo "{success: false, errors: { reason: 'Este código ya existe ingrese otro.' }}";
    }
    if($error==2){
        echo "{success: false, errors: { reason: 'Este nombre de país ya existe en la base de datos ingrese otro.' }}";
    }
  }
  if(isset($_POST['oper'])=='edit'){
    $consulta=pg_query("select * from pais where codigo_pais='$_POST[codigo_pais]' and id_pais not in('$_POST[id_pais]')");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }
    $consulta=pg_query("select * from pais where nombre_pais='$_POST[nombre_pais]' and id_pais not in('$_POST[id_pais]')");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=2;
    }
    if($error==0){
      pg_query("update pais set nombre_pais='$_POST[nombre_pais]', codigo_pais='$_POST[codigo_pais]' where id_pais='$_POST[id_pais]'");
      $error=0;
    }    
    echo $error;
  }

	pg_close();		
?>