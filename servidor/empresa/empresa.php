<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	 
  $valor=0; 
  $consulta=pg_query("select * from empresa order by id_empresa asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if($_POST['operIngresoEmpresa']=='add'){        
      pg_query("insert into empresa values ('$contador','$_POST[nombreEmpresa]','$_POST[direccionEmpresa]','$_POST[telefonoEmpresa]','$_POST[faxEmpresa]','$_POST[rucEmpresa]','$_POST[contadorEmpresa]','$_POST[provinciaEmpresa]','$_POST[autorizacionSri]','$_POST[emailEmpresa]','$_POST[estadoEmpresa]','$_POST[asesorLegal]','$_POST[ciRepresentanteLegal]','$_POST[modoCosteo]','$_POST[inicioFacturaPre]','$_POST[numeroItemsFv]','$_POST[representanteLegalEmpresa]','$_POST[paisEmpresa]','$_POST[ciudadEmpresa]','$_POST[descripcionEmpresa]','$_POST[comentarioEmpresa]','$_POST[ivaEmpresa]','$_POST[añoContable]','$_POST[rucContador]','$_POST[EstablecimientoPuntoEmisionC]','$_POST[EstablecimientoPuntoEmisionV]','$_POST[EstablecimientoPuntoEmisionRC]','$_POST[EstablecimientoPuntoEmisionPF]','$_POST[nroAutorizacionC]','$_POST[nroAutorizacionV]','$_POST[nroAutorizacionRC]','$_POST[nroAutorizacionPF]')");
        echo "{success: true}";
  }
  if($_POST['operIngresoEmpresa']=='edit'){
    if(is_numeric($_POST['modoCosteo']))
    {        
      pg_query("update empresa set id_empresa='$_POST[codigoEmpresa]',nombre_empresa='$_POST[nombreEmpresa]',direccion_empresa='$_POST[direccionEmpresa]',telefono_empresa='$_POST[telefonoEmpresa]',fax_empresa='$_POST[faxEmpresa]',ruc_empresa='$_POST[rucEmpresa]',contador_empresa='$_POST[contadorEmpresa]',provincia_empresa='$_POST[provinciaEmpresa]',autorizacion_sri='$_POST[autorizacionSri]',email_empresa='$_POST[emailEmpresa]',estado_empresa='$_POST[estadoEmpresa]',asesor_legal='$_POST[asesorLegal]',ci_representante_legal='$_POST[ciRepresentanteLegal]',id_modo_de_costeo='$_POST[modoCosteo]',inicio_factura_pre='$_POST[inicioFacturaPre]',nro_items_fv='$_POST[numeroItemsFv]',representante_legal='$_POST[representanteLegalEmpresa]',pais_empresa='$_POST[paisEmpresa]',ciudad_empresa='$_POST[ciudadEmpresa]',descripcion_empresa='$_POST[descripcionEmpresa]',comentario_empresa='$_POST[comentarioEmpresa]',iva_empresa='$_POST[ivaEmpresa]',anio_contable='$_POST[añoContable]',ruc_contador='$_POST[rucContador]',establecimiento_p_emision_c='$_POST[EstablecimientoPuntoEmisionC]',establecimiento_p_emision_v='$_POST[EstablecimientoPuntoEmisionV]',establecimiento_p_emision_rc='$_POST[EstablecimientoPuntoEmisionRC]',establecimiento_p_emision_pf='$_POST[EstablecimientoPuntoEmisionPF]',nro_autorizacion_c='$_POST[nroAutorizacionC]',nro_autorizacion_v='$_POST[nroAutorizacionV]',nro_autorizacion_rc='$_POST[nroAutorizacionRC]',nro_autorizacion_pf='$_POST[nroAutorizacionPF]' where id_empresa='$_POST[codigoEmpresa]'");
      echo "{success: true}";
    }
    else{
      $consulta=pg_query("select * from modo_costeo where nombre_modo='$_POST[modoCosteo]'");
      while($row=pg_fetch_row($consulta)){
        $valor=$row[0];
      }
      
      pg_query("update empresa set id_empresa='$_POST[codigoEmpresa]',nombre_empresa='$_POST[nombreEmpresa]',direccion_empresa='$_POST[direccionEmpresa]',telefono_empresa='$_POST[telefonoEmpresa]',fax_empresa='$_POST[faxEmpresa]',ruc_empresa='$_POST[rucEmpresa]',contador_empresa='$_POST[contadorEmpresa]',provincia_empresa='$_POST[provinciaEmpresa]',autorizacion_sri='$_POST[autorizacionSri]',email_empresa='$_POST[emailEmpresa]',estado_empresa='$_POST[estadoEmpresa]',asesor_legal='$_POST[asesorLegal]',ci_representante_legal='$_POST[ciRepresentanteLegal]',id_modo_de_costeo='$valor',inicio_factura_pre='$_POST[inicioFacturaPre]',nro_items_fv='$_POST[numeroItemsFv]',representante_legal='$_POST[representanteLegalEmpresa]',pais_empresa='$_POST[paisEmpresa]',ciudad_empresa='$_POST[ciudadEmpresa]',descripcion_empresa='$_POST[descripcionEmpresa]',comentario_empresa='$_POST[comentarioEmpresa]',iva_empresa='$_POST[ivaEmpresa]',anio_contable='$_POST[añoContable]',ruc_contador='$_POST[rucContador]',establecimiento_p_emision_c='$_POST[EstablecimientoPuntoEmisionC]',establecimiento_p_emision_v='$_POST[EstablecimientoPuntoEmisionV]',establecimiento_p_emision_rc='$_POST[EstablecimientoPuntoEmisionRC]',establecimiento_p_emision_pf='$_POST[EstablecimientoPuntoEmisionPF]',nro_autorizacion_c='$_POST[nroAutorizacionC]',nro_autorizacion_v='$_POST[nroAutorizacionV]',nro_autorizacion_rc='$_POST[nroAutorizacionRC]',nro_autorizacion_pf='$_POST[nroAutorizacionPF]' where id_empresa='$_POST[codigoEmpresa]'");
      echo "{success: true}";
    }
    
  }


	pg_close();		
?>