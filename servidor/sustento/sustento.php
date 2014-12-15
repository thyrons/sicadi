<?php
  include '../conexion.php';    
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();   
  $consulta=pg_query("select * from sustento order by id_sustento asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if(isset($_POST['operIngresoSustento'])=='add'){        
    $consulta=pg_query("select * from sustento where tipo_sustento='$_POST[tipoSustento]'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }  
    if($error==0){
      pg_query("insert into sustento values ('$contador','$_POST[tipoSustento]','$_POST[codigoTipoComprobante]')");
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
    $consulta=pg_query("select * from sustento where tipo_sustento='$_POST[tipo_sustento]' and id_sustento not in('$_POST[id_sustento]')");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }    
    if($error==0){
      pg_query("update sustento set id_sustento='$_POST[id_sustento]',tipo_sustento='$_POST[tipo_sustento]',cod_tipo_comprobante='$_POST[cod_tipo_comprobante]' where id_sustento='$_POST[id_sustento]'");
      $error=0;
    }    
    echo $error;    
  }
?>