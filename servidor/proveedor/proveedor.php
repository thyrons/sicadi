<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from proveedores order by id_proveedor asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if($_POST['operIngresoProveedores']=='add'){        
      pg_query("insert into proveedores values ('$contador','$_POST[ruc_ced_pass_proveedor]','$_POST[tipoDocumentoIngresoProveedor]','$_POST[empresaProveedor]','$_POST[representanteLegal]','$_POST[visitadorProveedor]','$_POST[direccionProveedor]','$_POST[telefono1Proveedor]','$_POST[telefono2Proveedor]','$_POST[faxProveedor]','$_POST[ciudadProveedor]','$_POST[paisProveedor]','$_POST[estadoProveedor]','$_POST[observacionesProveedor]','$_POST[emailProveedor]','$_POST[proveedorPrincipal]','$_POST[tipoProveedor]','$_POST[formaPagoProveedor]')");
        echo "{success: true}";
  }
  if($_POST['operIngresoProveedores']=='edit'){    
    if(is_numeric($_POST['tipoProveedor'])){
      $id_tipo_proveedor=$_POST['tipoProveedor'];
    }
    else{
      $SQL=pg_query("select id_tipo_cliente from tipo_cliente where nombre_tipo_cliente='$_POST[tipoProveedor]'");
      while($row=pg_fetch_row($SQL)){
        $id_tipo_proveedor=$row[0]; 
      }
    }
    if(is_numeric($_POST['formaPagoProveedor'])){
      $id_forma_pago=$_POST['formaPagoProveedor'];
    }
    else{
      $SQL=pg_query("select id_formas_pagos from formas_pago where nombre_forma='$_POST[formaPagoProveedor]'");
      while($row=pg_fetch_row($SQL)){
        $id_forma_pago=$row[0]; 
      }  
    }
    pg_query("update proveedores set id_proveedor='$_POST[codigoProveedor]',ci_ruc_pass='$_POST[ruc_ced_pass_proveedor]',tipo_documento='$_POST[tipoDocumentoIngresoProveedor]',empresa_proveedor='$_POST[empresaProveedor]',representante_legal='$_POST[representanteLegal]',visitador='$_POST[visitadorProveedor]',direccion_proveedor='$_POST[direccionProveedor]',telefono1_proveedor='$_POST[telefono1Proveedor]',telefono2_proveedor='$_POST[telefono2Proveedor]',fax_proveedor='$_POST[faxProveedor]',ciudad_proveedor='$_POST[ciudadProveedor]',pais_proveedor='$_POST[paisProveedor]',estado_proveedor='$_POST[estadoProveedor]',observaciones_proveedor='$_POST[observacionesProveedor]',email_proveedor='$_POST[emailProveedor]',proveedor_principal='$_POST[proveedorPrincipal]',id_tipo_cliente='$id_tipo_proveedor',id_forma_pago='$id_forma_pago' where id_proveedor='$_POST[codigoProveedor]'");
    echo "{success: true}";
  }


	pg_close();		
?>