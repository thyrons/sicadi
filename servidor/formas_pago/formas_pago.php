<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from formas_pago");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if(isset($_POST['accion'])=='add'){
    $str = ucwords(strtolower($_POST['nomForma']));
    $str1 = strtoupper($_POST['codForma']);
    $consulta=pg_query("select * from formas_pago where nombre_forma='$str'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }   
    $consulta=pg_query("select * from formas_pago where codigo='$str1'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=2;
    }   
    if($error==0){
      pg_query("insert into formas_pago values ('$contador','$str1','$str')");
      $error=0;
    }
    if($error==0){
        echo "{success: true}";
    }
    if($error==1){
        echo "{success: false, errors: { reason: 'Este nombre ya existe ingrese otro.' }}";
    }
    if($error==2){
        echo "{success: false, errors: { reason: 'Este código ya existe ingrese otro.' }}";
    }    
  }
  if(isset($_POST['oper'])=='edit'){
    $str = ucwords(strtolower($_POST['nombre_forma']));
    $str1 = strtoupper($_POST['codigo']);
    $consulta=pg_query("select * from formas_pago where nombre_forma='$str' and id_formas_pagos not in('$_POST[id_formas_pagos]')");
    $cont=pg_num_rows($consulta);    
    if($cont>0){
      $error=1;
    }    
    $consulta=pg_query("select * from formas_pago where codigo='$str1' and id_formas_pagos not in('$_POST[id_formas_pagos]')");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=2;
    }   
    if($error==0){
      pg_query("update formas_pago set codigo='$str1',nombre_forma='$str' where  id_formas_pagos='$_POST[id_formas_pagos]'");
      $error=0;
    }    

    echo $error;
  }

	pg_close();		
?>