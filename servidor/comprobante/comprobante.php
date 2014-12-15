<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from comprobante order by id_comprobante asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if($_POST['operIngresoComprobante']=='add'){        
    pg_query("insert into comprobante values ('$contador','$_POST[tipoComprobante]','$_POST[codigoSecu]','$_POST[fechaVigencia]','$_POST[sustentoComprobante]')");
    echo "{success: true}";
  }
  if($_POST['operIngresoComprobante']=='edit'){        
      pg_query("update comprobante set  id_comprobante='$_POST[codigoComprobante]',tipo_comprobante='$_POST[tipoComprobante]',cod_sec_tra='$_POST[codigoSecu]',fecha_vigencia='$_POST[fechaVigencia]',sustento_tributario='$_POST[sustentoComprobante]' where id_comprobante='$_POST[codigoComprobante]'");
      echo "{success: true}";
  }
	pg_close();		
?>