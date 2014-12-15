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
$result = pg_query("SELECT COUNT(*) AS count FROM empresa,modo_costeo where empresa.id_modo_de_costeo=modo_costeo.id_modo_costeo "); 
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
        $SQL = "select empresa.id_empresa,empresa.nombre_empresa,empresa.ruc_empresa,   empresa.direccion_empresa,empresa.telefono_empresa,empresa.fax_empresa,empresa.ruc_contador,empresa.contador_empresa,empresa.email_empresa,empresa.estado_empresa,empresa.pais_empresa,empresa.provincia_empresa,empresa.ciudad_empresa,empresa.autorizacion_sri,empresa.asesor_legal,empresa.ci_representante_legal,empresa.representante_legal,empresa.id_modo_de_costeo,modo_costeo.nombre_modo,empresa.descripcion_empresa,empresa.comentario_empresa,empresa.inicio_factura_pre,empresa.nro_items_fv,empresa.iva_empresa,empresa.anio_contable,empresa.establecimiento_p_emision_c,empresa.nro_autorizacion_c,empresa.establecimiento_p_emision_v,empresa.nro_autorizacion_v,empresa.establecimiento_p_emision_rc,empresa.nro_autorizacion_rc,empresa.establecimiento_p_emision_pf,empresa.nro_autorizacion_pf from empresa,modo_costeo where empresa.id_modo_de_costeo=modo_costeo.id_modo_costeo ORDER BY $sidx $sord offset $start limit $limit"; 
    }
    else{        
        if($_GET['searchOper']=='eq'){            
            $SQL = "select empresa.id_empresa,empresa.nombre_empresa,empresa.ruc_empresa,   empresa.direccion_empresa,empresa.telefono_empresa,empresa.fax_empresa,empresa.ruc_contador,empresa.contador_empresa,empresa.email_empresa,empresa.estado_empresa,empresa.pais_empresa,empresa.provincia_empresa,empresa.ciudad_empresa,empresa.autorizacion_sri,empresa.asesor_legal,empresa.ci_representante_legal,empresa.representante_legal,empresa.id_modo_de_costeo,modo_costeo.nombre_modo,empresa.descripcion_empresa,empresa.comentario_empresa,empresa.inicio_factura_pre,empresa.nro_items_fv,empresa.iva_empresa,empresa.anio_contable,empresa.establecimiento_p_emision_c,empresa.nro_autorizacion_c,empresa.establecimiento_p_emision_v,empresa.nro_autorizacion_v,empresa.establecimiento_p_emision_rc,empresa.nro_autorizacion_rc,empresa.establecimiento_p_emision_pf,empresa.nro_autorizacion_pf from empresa,modo_costeo where empresa.id_modo_de_costeo=modo_costeo.id_modo_costeo and $_GET[searchField] = '$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit"; 
        }
        if($_GET['searchOper']=='ne'){            
            $SQL = "select empresa.id_empresa,empresa.nombre_empresa,empresa.ruc_empresa,   empresa.direccion_empresa,empresa.telefono_empresa,empresa.fax_empresa,empresa.ruc_contador,empresa.contador_empresa,empresa.email_empresa,empresa.estado_empresa,empresa.pais_empresa,empresa.provincia_empresa,empresa.ciudad_empresa,empresa.autorizacion_sri,empresa.asesor_legal,empresa.ci_representante_legal,empresa.representante_legal,empresa.id_modo_de_costeo,modo_costeo.nombre_modo,empresa.descripcion_empresa,empresa.comentario_empresa,empresa.inicio_factura_pre,empresa.nro_items_fv,empresa.iva_empresa,empresa.anio_contable,empresa.establecimiento_p_emision_c,empresa.nro_autorizacion_c,empresa.establecimiento_p_emision_v,empresa.nro_autorizacion_v,empresa.establecimiento_p_emision_rc,empresa.nro_autorizacion_rc,empresa.establecimiento_p_emision_pf,empresa.nro_autorizacion_pf from empresa,modo_costeo where empresa.id_modo_de_costeo=modo_costeo.id_modo_costeo and $_GET[searchField] != '$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit"; 
        }
        if($_GET['searchOper']=='bw'){            
            $SQL = "select empresa.id_empresa,empresa.nombre_empresa,empresa.ruc_empresa,   empresa.direccion_empresa,empresa.telefono_empresa,empresa.fax_empresa,empresa.ruc_contador,empresa.contador_empresa,empresa.email_empresa,empresa.estado_empresa,empresa.pais_empresa,empresa.provincia_empresa,empresa.ciudad_empresa,empresa.autorizacion_sri,empresa.asesor_legal,empresa.ci_representante_legal,empresa.representante_legal,empresa.id_modo_de_costeo,modo_costeo.nombre_modo,empresa.descripcion_empresa,empresa.comentario_empresa,empresa.inicio_factura_pre,empresa.nro_items_fv,empresa.iva_empresa,empresa.anio_contable,empresa.establecimiento_p_emision_c,empresa.nro_autorizacion_c,empresa.establecimiento_p_emision_v,empresa.nro_autorizacion_v,empresa.establecimiento_p_emision_rc,empresa.nro_autorizacion_rc,empresa.establecimiento_p_emision_pf,empresa.nro_autorizacion_pf from empresa,modo_costeo where empresa.id_modo_de_costeo=modo_costeo.id_modo_costeo and $_GET[searchField] like '$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit"; 
        }
        if($_GET['searchOper']=='bn'){            
            $SQL = "select empresa.id_empresa,empresa.nombre_empresa,empresa.ruc_empresa,   empresa.direccion_empresa,empresa.telefono_empresa,empresa.fax_empresa,empresa.ruc_contador,empresa.contador_empresa,empresa.email_empresa,empresa.estado_empresa,empresa.pais_empresa,empresa.provincia_empresa,empresa.ciudad_empresa,empresa.autorizacion_sri,empresa.asesor_legal,empresa.ci_representante_legal,empresa.representante_legal,empresa.id_modo_de_costeo,modo_costeo.nombre_modo,empresa.descripcion_empresa,empresa.comentario_empresa,empresa.inicio_factura_pre,empresa.nro_items_fv,empresa.iva_empresa,empresa.anio_contable,empresa.establecimiento_p_emision_c,empresa.nro_autorizacion_c,empresa.establecimiento_p_emision_v,empresa.nro_autorizacion_v,empresa.establecimiento_p_emision_rc,empresa.nro_autorizacion_rc,empresa.establecimiento_p_emision_pf,empresa.nro_autorizacion_pf from empresa,modo_costeo where empresa.id_modo_de_costeo=modo_costeo.id_modo_costeo and $_GET[searchField] not like '$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit"; 
        }
        if($_GET['searchOper']=='ew'){            
            $SQL = "select empresa.id_empresa,empresa.nombre_empresa,empresa.ruc_empresa,   empresa.direccion_empresa,empresa.telefono_empresa,empresa.fax_empresa,empresa.ruc_contador,empresa.contador_empresa,empresa.email_empresa,empresa.estado_empresa,empresa.pais_empresa,empresa.provincia_empresa,empresa.ciudad_empresa,empresa.autorizacion_sri,empresa.asesor_legal,empresa.ci_representante_legal,empresa.representante_legal,empresa.id_modo_de_costeo,modo_costeo.nombre_modo,empresa.descripcion_empresa,empresa.comentario_empresa,empresa.inicio_factura_pre,empresa.nro_items_fv,empresa.iva_empresa,empresa.anio_contable,empresa.establecimiento_p_emision_c,empresa.nro_autorizacion_c,empresa.establecimiento_p_emision_v,empresa.nro_autorizacion_v,empresa.establecimiento_p_emision_rc,empresa.nro_autorizacion_rc,empresa.establecimiento_p_emision_pf,empresa.nro_autorizacion_pf from empresa,modo_costeo where empresa.id_modo_de_costeo=modo_costeo.id_modo_costeo and $_GET[searchField] like '%$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit"; 
        }
        if($_GET['searchOper']=='en'){        
            $SQL = "select empresa.id_empresa,empresa.nombre_empresa,empresa.ruc_empresa,   empresa.direccion_empresa,empresa.telefono_empresa,empresa.fax_empresa,empresa.ruc_contador,empresa.contador_empresa,empresa.email_empresa,empresa.estado_empresa,empresa.pais_empresa,empresa.provincia_empresa,empresa.ciudad_empresa,empresa.autorizacion_sri,empresa.asesor_legal,empresa.ci_representante_legal,empresa.representante_legal,empresa.id_modo_de_costeo,modo_costeo.nombre_modo,empresa.descripcion_empresa,empresa.comentario_empresa,empresa.inicio_factura_pre,empresa.nro_items_fv,empresa.iva_empresa,empresa.anio_contable,empresa.establecimiento_p_emision_c,empresa.nro_autorizacion_c,empresa.establecimiento_p_emision_v,empresa.nro_autorizacion_v,empresa.establecimiento_p_emision_rc,empresa.nro_autorizacion_rc,empresa.establecimiento_p_emision_pf,empresa.nro_autorizacion_pf from empresa,modo_costeo where empresa.id_modo_de_costeo=modo_costeo.id_modo_costeo and $_GET[searchField] not like '%$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit"; 
        }
        if($_GET['searchOper']=='cn'){            
            $SQL = "select empresa.id_empresa,empresa.nombre_empresa,empresa.ruc_empresa,   empresa.direccion_empresa,empresa.telefono_empresa,empresa.fax_empresa,empresa.ruc_contador,empresa.contador_empresa,empresa.email_empresa,empresa.estado_empresa,empresa.pais_empresa,empresa.provincia_empresa,empresa.ciudad_empresa,empresa.autorizacion_sri,empresa.asesor_legal,empresa.ci_representante_legal,empresa.representante_legal,empresa.id_modo_de_costeo,modo_costeo.nombre_modo,empresa.descripcion_empresa,empresa.comentario_empresa,empresa.inicio_factura_pre,empresa.nro_items_fv,empresa.iva_empresa,empresa.anio_contable,empresa.establecimiento_p_emision_c,empresa.nro_autorizacion_c,empresa.establecimiento_p_emision_v,empresa.nro_autorizacion_v,empresa.establecimiento_p_emision_rc,empresa.nro_autorizacion_rc,empresa.establecimiento_p_emision_pf,empresa.nro_autorizacion_pf from empresa,modo_costeo where empresa.id_modo_de_costeo=modo_costeo.id_modo_costeo and $_GET[searchField] like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit"; 
        }
        if($_GET['searchOper']=='nc'){            
            $SQL = "select empresa.id_empresa,empresa.nombre_empresa,empresa.ruc_empresa,   empresa.direccion_empresa,empresa.telefono_empresa,empresa.fax_empresa,empresa.ruc_contador,empresa.contador_empresa,empresa.email_empresa,empresa.estado_empresa,empresa.pais_empresa,empresa.provincia_empresa,empresa.ciudad_empresa,empresa.autorizacion_sri,empresa.asesor_legal,empresa.ci_representante_legal,empresa.representante_legal,empresa.id_modo_de_costeo,modo_costeo.nombre_modo,empresa.descripcion_empresa,empresa.comentario_empresa,empresa.inicio_factura_pre,empresa.nro_items_fv,empresa.iva_empresa,empresa.anio_contable,empresa.establecimiento_p_emision_c,empresa.nro_autorizacion_c,empresa.establecimiento_p_emision_v,empresa.nro_autorizacion_v,empresa.establecimiento_p_emision_rc,empresa.nro_autorizacion_rc,empresa.establecimiento_p_emision_pf,empresa.nro_autorizacion_pf from empresa,modo_costeo where empresa.id_modo_de_costeo=modo_costeo.id_modo_costeo and $_GET[searchField] not like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit"; 
        }
        if($_GET['searchOper']=='in'){            
            $SQL = "select empresa.id_empresa,empresa.nombre_empresa,empresa.ruc_empresa,   empresa.direccion_empresa,empresa.telefono_empresa,empresa.fax_empresa,empresa.ruc_contador,empresa.contador_empresa,empresa.email_empresa,empresa.estado_empresa,empresa.pais_empresa,empresa.provincia_empresa,empresa.ciudad_empresa,empresa.autorizacion_sri,empresa.asesor_legal,empresa.ci_representante_legal,empresa.representante_legal,empresa.id_modo_de_costeo,modo_costeo.nombre_modo,empresa.descripcion_empresa,empresa.comentario_empresa,empresa.inicio_factura_pre,empresa.nro_items_fv,empresa.iva_empresa,empresa.anio_contable,empresa.establecimiento_p_emision_c,empresa.nro_autorizacion_c,empresa.establecimiento_p_emision_v,empresa.nro_autorizacion_v,empresa.establecimiento_p_emision_rc,empresa.nro_autorizacion_rc,empresa.establecimiento_p_emision_pf,empresa.nro_autorizacion_pf from empresa,modo_costeo where empresa.id_modo_de_costeo=modo_costeo.id_modo_costeo and $_GET[searchField] like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit"; 
        }
        if($_GET['searchOper']=='ni'){
            $SQL = "select empresa.id_empresa,empresa.nombre_empresa,empresa.ruc_empresa,   empresa.direccion_empresa,empresa.telefono_empresa,empresa.fax_empresa,empresa.ruc_contador,empresa.contador_empresa,empresa.email_empresa,empresa.estado_empresa,empresa.pais_empresa,empresa.provincia_empresa,empresa.ciudad_empresa,empresa.autorizacion_sri,empresa.asesor_legal,empresa.ci_representante_legal,empresa.representante_legal,empresa.id_modo_de_costeo,modo_costeo.nombre_modo,empresa.descripcion_empresa,empresa.comentario_empresa,empresa.inicio_factura_pre,empresa.nro_items_fv,empresa.iva_empresa,empresa.anio_contable,empresa.establecimiento_p_emision_c,empresa.nro_autorizacion_c,empresa.establecimiento_p_emision_v,empresa.nro_autorizacion_v,empresa.establecimiento_p_emision_rc,empresa.nro_autorizacion_rc,empresa.establecimiento_p_emision_pf,empresa.nro_autorizacion_pf from empresa,modo_costeo where empresa.id_modo_de_costeo=modo_costeo.id_modo_costeo and $_GET[searchField] not like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit"; 
        }
        //echo $SQL;
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
        $s .= "<cell>" . $row[27] . "</cell>";    
        $s .= "<cell>" . $row[28] . "</cell>";    
        $s .= "<cell>" . $row[29] . "</cell>";    
        $s .= "<cell>" . $row[30] . "</cell>";    
        $s .= "<cell>" . $row[31] . "</cell>";    
        $s .= "<cell>" . $row[32] . "</cell>";    
          
          
                                 
        $s .= "</row>";
    }
    $s .= "</rows>";
    echo $s;
?>