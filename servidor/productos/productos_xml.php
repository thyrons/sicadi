<?php
include '../conexion.php';
conectarse();
$page = $_GET['page']; 
$limit = $_GET['rows']; 
$sidx = $_GET['sidx']; 
$sord = $_GET['sord']; 
$search=$_GET['_search'];
if (!$sidx)
    $sidx = 1;
$result = pg_query("SELECT COUNT(*) AS count FROM productos"); 
$row = pg_fetch_row($result);
$count = $row[0];
if ($count > 0 && $limit > 0) {
    $total_pages = ceil($count / $limit);
} else {
    $total_pages = 0;
}
if ($page > $total_pages)
    $page = $total_pages;
$start = $limit * $page - $limit;
if ($start < 0)
    $start = 0; 
    if($search=='false'){
        $SQL = "select id_producto,codigo_producto,codigo_barras,descripcion,ult_precio_costo,utilidad_minorista,utilidad_mayorista,descuento_minorista,pvp_sin_iva_minorista,pvp_sin_iva_may,descuento_mayorista,ult_fecha_compra,stock_maximo,stock_intermedio,stock_minimo,ubicacion1,ubicacion2,productos.id_proveedor,empresa_proveedor,iva,unidad,es_inventariable,es_de_servicio,controla_stock,no_vendible,es_insumo,id_familia,id_marca,id_linea,id_categoria,
        id_procedencia,tipo_producto,fecha_creacion,aplicacion,cuenta_ventas,cuenta_inventario_servicios,cuenta_costos,cuenta_descuentos,cuenta_devoluciones from productos,proveedores where productos.id_proveedor=proveedores.id_proveedor ORDER BY $sidx $sord offset $start limit $limit";     
    }
    else{
        if($_GET['searchOper']=='eq'){
        $SQL = "select id_producto,codigo_producto,codigo_barras,descripcion,ult_precio_costo,utilidad_minorista,utilidad_mayorista,descuento_minorista,pvp_sin_iva_minorista,pvp_sin_iva_may,descuento_mayorista,ult_fecha_compra,stock_maximo,stock_intermedio,stock_minimo,ubicacion1,ubicacion2,productos.id_proveedor,empresa_proveedor,iva,unidad,es_inventariable,es_de_servicio,controla_stock,no_vendible,es_insumo,id_familia,id_marca,id_linea,id_categoria,
        id_procedencia,tipo_producto,fecha_creacion,aplicacion,cuenta_ventas,cuenta_inventario_servicios,cuenta_costos,cuenta_descuentos,cuenta_devoluciones from productos,proveedores where productos.id_proveedor=proveedores.id_proveedor and $_GET[searchField] = '$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";       
        }
        if($_GET['searchOper']=='ne'){            
            $SQL = "select id_producto,codigo_producto,codigo_barras,descripcion,ult_precio_costo,utilidad_minorista,utilidad_mayorista,descuento_minorista,pvp_sin_iva_minorista,pvp_sin_iva_may,descuento_mayorista,ult_fecha_compra,stock_maximo,stock_intermedio,stock_minimo,ubicacion1,ubicacion2,productos.id_proveedor,empresa_proveedor,iva,unidad,es_inventariable,es_de_servicio,controla_stock,no_vendible,es_insumo,id_familia,id_marca,id_linea,id_categoria,
            id_procedencia,tipo_producto,fecha_creacion,aplicacion,cuenta_ventas,cuenta_inventario_servicios,cuenta_costos,cuenta_descuentos,cuenta_devoluciones from productos,proveedores where productos.id_proveedor=proveedores.id_proveedor and $_GET[searchField] != '$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";        
        }
        if($_GET['searchOper']=='bw'){
        $SQL = "select id_producto,codigo_producto,codigo_barras,descripcion,ult_precio_costo,utilidad_minorista,utilidad_mayorista,descuento_minorista,pvp_sin_iva_minorista,pvp_sin_iva_may,descuento_mayorista,ult_fecha_compra,stock_maximo,stock_intermedio,stock_minimo,ubicacion1,ubicacion2,productos.id_proveedor,empresa_proveedor,iva,unidad,es_inventariable,es_de_servicio,controla_stock,no_vendible,es_insumo,id_familia,id_marca,id_linea,id_categoria,
        id_procedencia,tipo_producto,fecha_creacion,aplicacion,cuenta_ventas,cuenta_inventario_servicios,cuenta_costos,cuenta_descuentos,cuenta_devoluciones from productos,proveedores where productos.id_proveedor=proveedores.id_proveedor and $_GET[searchField] like '$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";    
        }
        if($_GET['searchOper']=='bn'){            
        $SQL = "select id_producto,codigo_producto,codigo_barras,descripcion,ult_precio_costo,utilidad_minorista,utilidad_mayorista,descuento_minorista,pvp_sin_iva_minorista,pvp_sin_iva_may,descuento_mayorista,ult_fecha_compra,stock_maximo,stock_intermedio,stock_minimo,ubicacion1,ubicacion2,productos.id_proveedor,empresa_proveedor,iva,unidad,es_inventariable,es_de_servicio,controla_stock,no_vendible,es_insumo,id_familia,id_marca,id_linea,id_categoria,
        id_procedencia,tipo_producto,fecha_creacion,aplicacion,cuenta_ventas,cuenta_inventario_servicios,cuenta_costos,cuenta_descuentos,cuenta_devoluciones from productos,proveedores where productos.id_proveedor=proveedores.id_proveedor and $_GET[searchField] not like '$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";                 
        }
        if($_GET['searchOper']=='ew'){            
        $SQL = "select id_producto,codigo_producto,codigo_barras,descripcion,ult_precio_costo,utilidad_minorista,utilidad_mayorista,descuento_minorista,pvp_sin_iva_minorista,pvp_sin_iva_may,descuento_mayorista,ult_fecha_compra,stock_maximo,stock_intermedio,stock_minimo,ubicacion1,ubicacion2,productos.id_proveedor,empresa_proveedor,iva,unidad,es_inventariable,es_de_servicio,controla_stock,no_vendible,es_insumo,id_familia,id_marca,id_linea,id_categoria,
        id_procedencia,tipo_producto,fecha_creacion,aplicacion,cuenta_ventas,cuenta_inventario_servicios,cuenta_costos,cuenta_descuentos,cuenta_devoluciones from productos,proveedores where productos.id_proveedor=proveedores.id_proveedor and $_GET[searchField] like '%$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";     
        }
        if($_GET['searchOper']=='en'){        
        $SQL = "select id_producto,codigo_producto,codigo_barras,descripcion,ult_precio_costo,utilidad_minorista,utilidad_mayorista,descuento_minorista,pvp_sin_iva_minorista,pvp_sin_iva_may,descuento_mayorista,ult_fecha_compra,stock_maximo,stock_intermedio,stock_minimo,ubicacion1,ubicacion2,productos.id_proveedor,empresa_proveedor,iva,unidad,es_inventariable,es_de_servicio,controla_stock,no_vendible,es_insumo,id_familia,id_marca,id_linea,id_categoria,
        id_procedencia,tipo_producto,fecha_creacion,aplicacion,cuenta_ventas,cuenta_inventario_servicios,cuenta_costos,cuenta_descuentos,cuenta_devoluciones from productos,proveedores where productos.id_proveedor=proveedores.id_proveedor and $_GET[searchField] not like '%$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";                 
        }
        if($_GET['searchOper']=='cn'){            
        $SQL = "select id_producto,codigo_producto,codigo_barras,descripcion,ult_precio_costo,utilidad_minorista,utilidad_mayorista,descuento_minorista,pvp_sin_iva_minorista,pvp_sin_iva_may,descuento_mayorista,ult_fecha_compra,stock_maximo,stock_intermedio,stock_minimo,ubicacion1,ubicacion2,productos.id_proveedor,empresa_proveedor,iva,unidad,es_inventariable,es_de_servicio,controla_stock,no_vendible,es_insumo,id_familia,id_marca,id_linea,id_categoria,
        id_procedencia,tipo_producto,fecha_creacion,aplicacion,cuenta_ventas,cuenta_inventario_servicios,cuenta_costos,cuenta_descuentos,cuenta_devoluciones from productos,proveedores where productos.id_proveedor=proveedores.id_proveedor and $_GET[searchField] like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";               
        }
        if($_GET['searchOper']=='nc'){            
        $SQL = "select id_producto,codigo_producto,codigo_barras,descripcion,ult_precio_costo,utilidad_minorista,utilidad_mayorista,descuento_minorista,pvp_sin_iva_minorista,pvp_sin_iva_may,descuento_mayorista,ult_fecha_compra,stock_maximo,stock_intermedio,stock_minimo,ubicacion1,ubicacion2,productos.id_proveedor,empresa_proveedor,iva,unidad,es_inventariable,es_de_servicio,controla_stock,no_vendible,es_insumo,id_familia,id_marca,id_linea,id_categoria,
        id_procedencia,tipo_producto,fecha_creacion,aplicacion,cuenta_ventas,cuenta_inventario_servicios,cuenta_costos,cuenta_descuentos,cuenta_devoluciones from productos,proveedores where productos.id_proveedor=proveedores.id_proveedor and $_GET[searchField] not like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";     
        }
        if($_GET['searchOper']=='in'){            
        $SQL = "select id_producto,codigo_producto,codigo_barras,descripcion,ult_precio_costo,utilidad_minorista,utilidad_mayorista,descuento_minorista,pvp_sin_iva_minorista,pvp_sin_iva_may,descuento_mayorista,ult_fecha_compra,stock_maximo,stock_intermedio,stock_minimo,ubicacion1,ubicacion2,productos.id_proveedor,empresa_proveedor,iva,unidad,es_inventariable,es_de_servicio,controla_stock,no_vendible,es_insumo,id_familia,id_marca,id_linea,id_categoria,
        id_procedencia,tipo_producto,fecha_creacion,aplicacion,cuenta_ventas,cuenta_inventario_servicios,cuenta_costos,cuenta_descuentos,cuenta_devoluciones from productos,proveedores where productos.id_proveedor=proveedores.id_proveedor and $_GET[searchField] like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";     
        }
        if($_GET['searchOper']=='ni'){
         $SQL = "select id_producto,codigo_producto,codigo_barras,descripcion,ult_precio_costo,utilidad_minorista,utilidad_mayorista,descuento_minorista,pvp_sin_iva_minorista,pvp_sin_iva_may,descuento_mayorista,ult_fecha_compra,stock_maximo,stock_intermedio,stock_minimo,ubicacion1,ubicacion2,productos.id_proveedor,empresa_proveedor,iva,unidad,es_inventariable,es_de_servicio,controla_stock,no_vendible,es_insumo,id_familia,id_marca,id_linea,id_categoria,
        id_procedencia,tipo_producto,fecha_creacion,aplicacion,cuenta_ventas,cuenta_inventario_servicios,cuenta_costos,cuenta_descuentos,cuenta_devoluciones from productos,proveedores where productos.id_proveedor=proveedores.id_proveedor and $_GET[searchField] not like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";                
        }
    }
    
    $result = pg_query($SQL);           
    header("Content-type: text/xml;charset=utf-8");
    $s = "<?xml version='1.0' encoding='utf-8'?>";  
    $s .= "<rows>";
    $s .= "<page>" . $page . "</page>";
    $s .= "<total>" . $total_pages . "</total>";
    $s .= "<records>" . $count . "</records>";
    while ($row = pg_fetch_row($result)) {      
        $s .= "<row id='" . $row[0] . "'>"; 
        $s .= "<cell>" . $row[0]. "</cell>";             
        $s .= "<cell>" . $row[1] . "</cell>";     
        $s .= "<cell>" . $row[2] . "</cell>";    
        $s .= "<cell>" . $row[3] . "</cell>";    
        $s .= "<cell>" . $row[4] . "</cell>";    
        $s .= "<cell>" . $row[5] . "</cell>";    
        $s .= "<cell>" . $row[6] . "</cell>";    
        $s .= "<cell>" . $row[7] . "</cell>";    
        $s .= "<cell>" . $row[8] . "</cell>";    
        $s .= "<cell>" . $row[9] . "</cell>";    
        $s .= "<cell>" . $row[10] . "</cell>";    
        $s .= "<cell>" . $row[11] . "</cell>";    
        $s .= "<cell>" . $row[12] . "</cell>";    
        $s .= "<cell>" . $row[13] . "</cell>";    
        $s .= "<cell>" . $row[14] . "</cell>";    
        $s .= "<cell>" . $row[15] . "</cell>";    
        $s .= "<cell>" . $row[16] . "</cell>";    
        $s .= "<cell>" . $row[17] . "</cell>";    
        $s .= "<cell>" . $row[18] . "</cell>";    
        $s .= "<cell>" . $row[19] . "</cell>";    
        $s .= "<cell>" . $row[20] . "</cell>";    
        $s .= "<cell>" . $row[21] . "</cell>";    
        $s .= "<cell>" . $row[22] . "</cell>";            
        $s .= "<cell>" . $row[23] . "</cell>";    
        $s .= "<cell>" . $row[24] . "</cell>";    
        $s .= "<cell>" . $row[25] . "</cell>";   
        $s .= "<cell>" . $row[26] . "</cell>";    
        if($row[26]==""){            
            $s .= "<cell>" . "" . "</cell>";    
        }         
        else{
            $consulta=pg_query("select * from familia where id_familia='".$row[26]."'");
            while($row1=pg_fetch_row($consulta)){
                $s .= "<cell>" . $row1[1] . "</cell>";            
            }
        }
        $s .= "<cell>" . $row[27] . "</cell>"; 
        if($row[27]==""){            
            $s .= "<cell>" . "" . "</cell>";    
        }         
        else{
            $consulta=pg_query("select * from marcas where id_marca='".$row[27]."'");
            while($row1=pg_fetch_row($consulta)){
                $s .= "<cell>" . $row1[1] . "</cell>";            
            }
        }   
        $s .= "<cell>" . $row[28] . "</cell>"; 
        if($row[28]==""){            
            $s .= "<cell>" . "" . "</cell>";    
        }         
        else{
            $consulta=pg_query("select * from linea where id_linea='".$row[28]."'");
            while($row1=pg_fetch_row($consulta)){
                $s .= "<cell>" . $row1[1] . "</cell>";            
            }
        }   
        $s .= "<cell>" . $row[29] . "</cell>";   
        if($row[29]==""){            
            $s .= "<cell>" . "" . "</cell>";    
        }         
        else{
            $consulta=pg_query("select * from categorias where id_categoria='".$row[29]."'");
            while($row1=pg_fetch_row($consulta)){
                $s .= "<cell>" . $row1[1] . "</cell>";            
            }
        } 
        $s .= "<cell>" . $row[30] . "</cell>";  
        if($row[30]==""){            
            $s .= "<cell>" . "" . "</cell>";    
        }         
        else{
            $consulta=pg_query("select * from procedencia where id_procedencia='".$row[30]."'");
            while($row1=pg_fetch_row($consulta)){
                $s .= "<cell>" . $row1[1] . "</cell>";            
            }
        }  
        $s .= "<cell>" . $row[31] . "</cell>";    
        $s .= "<cell>" . $row[32] . "</cell>";    
        $s .= "<cell>" . $row[33] . "</cell>";    
        $s .= "<cell>" . $row[34] . "</cell>";    
        $s .= "<cell>" . $row[35] . "</cell>";    
        $s .= "<cell>" . $row[36] . "</cell>";    
        $s .= "<cell>" . $row[37] . "</cell>";    
        $s .= "<cell>" . $row[38] . "</cell>";            
        $s .= "</row>";
    }
    $s .= "</rows>";
    echo $s;
?>