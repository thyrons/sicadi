<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	 
  $valor=0; 
  $consulta=pg_query("select * from productos order by id_producto asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if($_POST['operIngresoProducto']=='add'){        
    pg_query("insert into productos values('$contador','$_POST[codigoBarrasProducto]','$_POST[descripcionProducto]','$_POST[precioCosto]','$_POST[utilidadMinorista]','$_POST[utilidadMayorista]','$_POST[descuentoMinorista]','$_POST[ultimaFechaCompra]','$_POST[stockMaximo]','$_POST[ubicacion1]','$_POST[ubicacion2]','$_POST[proveedorProducto]','$_POST[pvpSinIvaMin]','$_POST[pvpSinIvaMay]','$_POST[descuentoMayorista]','$_POST[stockMinimo]','$_POST[stockPromedio]','$_POST[ivaProducto]','$_POST[esInventariable]','$_POST[controlaStock]','$_POST[esInsumo]','$_POST[unidad]','$_POST[esDeServicio]','$_POST[noVendible]','$_POST[familiaProducto]','$_POST[marcaProducto]','$_POST[lineaProducto]','$_POST[categoriaProducto]','$_POST[tipoProducto]','$_POST[fechaCreacion]','$_POST[aplicacionProducto]','$_POST[procedenciaProducto]','$_POST[ventaMercaderia]','$_POST[inventarioProductos]','$_POST[costosInventario]','$_POST[descuentoVentas]','$_POST[devolucionVentas]','$_POST[codigoProducto]')");
    echo "{success: true}";
  }
  if($_POST['operIngresoProducto']=='edit'){
   // echo "update productos set id_producto='$_POST[idIngresoProducto]',codigo_barras='$_POST[codigoBarrasProducto]',descripcion='$_POST[descripcionProducto]',ult_precio_costo='$_POST[precioCosto]',utilidad_minorista='$_POST[utilidadMinorista]',utilidad_mayorista='$_POST[utilidadMayorista]',descuento_minorista='$_POST[descuentoMinorista]',ult_fecha_compra='$_POST[ultimaFechaCompra]',stock_maximo='$_POST[stockMaximo]',ubicacion1='$_POST[ubicacion1]',ubicacion2='$_POST[ubicacion2]',id_proveedor='$_POST[proveedorProducto]',pvp_sin_iva_minorista='$_POST[pvpSinIvaMin]',pvp_sin_iva_may='$_POST[pvpSinIvaMay]',descuento_mayorista='$_POST[descuentoMayorista]',stock_minimo='$_POST[stockMinimo]',stock_intermedio='$_POST[stockPromedio]',iva='$_POST[ivaProducto]',es_inventariable='$_POST[esInventariable]',controla_stock='$_POST[controlaStock]',es_insumo='$_POST[esInsumo]',unidad='$_POST[unidad]',es_de_servicio='$_POST[esDeServicio]',no_vendible='$_POST[noVendible]',id_familia='$_POST[familiaProducto]',id_marca='$_POST[marcaProducto]',id_linea='$_POST[lineaProducto]',id_categoria='$_POST[categoriaProducto]',tipo_producto='$_POST[tipoProducto]',fecha_creacion='$_POST[fechaCreacion]',aplicacion='$_POST[aplicacionProducto]',id_procedencia='$_POST[procedenciaProducto]',cuenta_ventas='$_POST[ventaMercaderia]',cuenta_inventario_servicios='$_POST[inventarioProductos]',cuenta_costos='$_POST[costosInventario]',cuenta_descuentos='$_POST[descuentoVentas]',cuenta_devoluciones='$_POST[devolucionVentas]',codigo_producto='$_POST[codigoProducto]' where id_producto='$_POST[idIngresoProducto]'";
    pg_query("update productos set id_producto='$_POST[idIngresoProducto]',codigo_barras='$_POST[codigoBarrasProducto]',descripcion='$_POST[descripcionProducto]',ult_precio_costo='$_POST[precioCosto]',utilidad_minorista='$_POST[utilidadMinorista]',utilidad_mayorista='$_POST[utilidadMayorista]',descuento_minorista='$_POST[descuentoMinorista]',ult_fecha_compra='$_POST[ultimaFechaCompra]',stock_maximo='$_POST[stockMaximo]',ubicacion1='$_POST[ubicacion1]',ubicacion2='$_POST[ubicacion2]',id_proveedor='$_POST[proveedorProducto]',pvp_sin_iva_minorista='$_POST[pvpSinIvaMin]',pvp_sin_iva_may='$_POST[pvpSinIvaMay]',descuento_mayorista='$_POST[descuentoMayorista]',stock_minimo='$_POST[stockMinimo]',stock_intermedio='$_POST[stockPromedio]',iva='$_POST[ivaProducto]',es_inventariable='$_POST[esInventariable]',controla_stock='$_POST[controlaStock]',es_insumo='$_POST[esInsumo]',unidad='$_POST[unidad]',es_de_servicio='$_POST[esDeServicio]',no_vendible='$_POST[noVendible]',id_familia='$_POST[familiaProducto]',id_marca='$_POST[marcaProducto]',id_linea='$_POST[lineaProducto]',id_categoria='$_POST[categoriaProducto]',tipo_producto='$_POST[tipoProducto]',fecha_creacion='$_POST[fechaCreacion]',aplicacion='$_POST[aplicacionProducto]',id_procedencia='$_POST[procedenciaProducto]',cuenta_ventas='$_POST[ventaMercaderia]',cuenta_inventario_servicios='$_POST[inventarioProductos]',cuenta_costos='$_POST[costosInventario]',cuenta_descuentos='$_POST[descuentoVentas]',cuenta_devoluciones='$_POST[devolucionVentas]',codigo_producto='$_POST[codigoProducto]' where id_producto='$_POST[idIngresoProducto]'");    
    
  }


	pg_close();		
?>