<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from clientes order by id_cliente asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if($_POST['operIngresoCliente']=='add'){        
      pg_query("insert into clientes values ('$contador','$_POST[ruc_ced_pass_cliente]','$_POST[nombreCompletoIngresoCliente]','$_POST[tipoCliente]','$_POST[profesionCliente]','$_POST[direccionCliente]','$_POST[telefono1Cliente]','$_POST[telefono2Cliente]','$_POST[paisCliente]','$_POST[ciudadCliente]','$_POST[emailCliente]','$_POST[referenciasCliente]','$_POST[estadoCliente]','$_POST[mayominoCliente]','$_POST[cupoCreditoCliente]','$_POST[cupoCreditoCliente]','$_POST[tipoDocumentoIngresoCliente]')");
        echo "{success: true}";
  }
  if($_POST['operIngresoCliente']=='edit'){
    if(is_numeric($_POST['tipoCliente']))
    {        
      pg_query("update clientes set id_cliente='$_POST[codigoCliente]',ci_ruc_pass='$_POST[ruc_ced_pass_cliente]',nombres_cliente='$_POST[nombreCompletoIngresoCliente]',id_tipo_cliente='$_POST[tipoCliente]',profesion_cliente='$_POST[profesionCliente]',direccion_cliente='$_POST[direccionCliente]',telefono1_cliente='$_POST[telefono1Cliente]',telefono2_cliente='$_POST[telefono2Cliente]',pais_cliente='$_POST[paisCliente]',ciudad_cliente='$_POST[ciudadCliente]',correo_cliente='$_POST[emailCliente]',referencias_cliente='$_POST[referenciasCliente]',estado_cliente='$_POST[estadoCliente]',mayorista='$_POST[mayominoCliente]',cupo_credito='$_POST[cupoCreditoCliente]',saldo_credito='$_POST[saldoCreditoCliente]',documento='$_POST[tipoDocumentoIngresoCliente]' where id_cliente='$_POST[codigoCliente]'");
      echo "{success: true}";
    }
    else{
      $sql=pg_query("select * from tipo_cliente where nombre_tipo_cliente='$_POST[tipoCliente]'");
      while($row=pg_fetch_row($sql)){
        $valor=$row[0];
      }
      pg_query("update clientes set id_cliente='$_POST[codigoCliente]',ci_ruc_pass='$_POST[ruc_ced_pass_cliente]',nombres_cliente='$_POST[nombreCompletoIngresoCliente]',id_tipo_cliente='$valor',profesion_cliente='$_POST[profesionCliente]',direccion_cliente='$_POST[direccionCliente]',telefono1_cliente='$_POST[telefono1Cliente]',telefono2_cliente='$_POST[telefono2Cliente]',pais_cliente='$_POST[paisCliente]',ciudad_cliente='$_POST[ciudadCliente]',correo_cliente='$_POST[emailCliente]',referencias_cliente='$_POST[referenciasCliente]',estado_cliente='$_POST[estadoCliente]',mayorista='$_POST[mayominoCliente]',cupo_credito='$_POST[cupoCreditoCliente]',saldo_credito='$_POST[saldoCreditoCliente]',documento='$_POST[tipoDocumentoIngresoCliente]' where id_cliente='$_POST[codigoCliente]'");
      echo "{success: true}"; 
    }
  }


	pg_close();		
?>