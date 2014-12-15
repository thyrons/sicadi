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
$result = pg_query("SELECT COUNT(*) AS count FROM proveedores,formas_pago,tipo_cliente where proveedores.id_forma_pago=formas_pago.id_formas_pagos and proveedores.id_tipo_cliente=tipo_cliente.id_tipo_cliente"); 
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
        $SQL = "select id_proveedor,tipo_documento,ci_ruc_pass,empresa_proveedor,representante_legal,visitador,direccion_proveedor,telefono1_proveedor,telefono2_proveedor,fax_proveedor,pais_proveedor,ciudad_proveedor,estado_proveedor,observaciones_proveedor,email_proveedor,proveedor_principal,proveedores.id_tipo_cliente,nombre_tipo_cliente,proveedores.id_forma_pago,nombre_forma from proveedores,formas_pago,tipo_cliente where proveedores.id_forma_pago=formas_pago.id_formas_pagos and proveedores.id_tipo_cliente=tipo_cliente.id_tipo_cliente ORDER BY $sidx $sord offset $start limit $limit";
    }
    else{        
        if($_GET['searchOper']=='eq'){            
            $SQL = "select id_proveedor,tipo_documento,ci_ruc_pass,empresa_proveedor,representante_legal,visitador,direccion_proveedor,telefono1_proveedor,telefono2_proveedor,fax_proveedor,pais_proveedor,ciudad_proveedor,estado_proveedor,observaciones_proveedor,email_proveedor,proveedor_principal,proveedores.id_tipo_cliente,nombre_tipo_cliente,proveedores.id_forma_pago,nombre_forma from proveedores,formas_pago,tipo_cliente where proveedores.id_forma_pago=formas_pago.id_formas_pagos and proveedores.id_tipo_cliente=tipo_cliente.id_tipo_cliente and $_GET[searchField] = '$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";
        }
        if($_GET['searchOper']=='ne'){                        
            $SQL = "select id_proveedor,tipo_documento,ci_ruc_pass,empresa_proveedor,representante_legal,visitador,direccion_proveedor,telefono1_proveedor,telefono2_proveedor,fax_proveedor,pais_proveedor,ciudad_proveedor,estado_proveedor,observaciones_proveedor,email_proveedor,proveedor_principal,proveedores.id_tipo_cliente,nombre_tipo_cliente,proveedores.id_forma_pago,nombre_forma from proveedores,formas_pago,tipo_cliente where proveedores.id_forma_pago=formas_pago.id_formas_pagos and proveedores.id_tipo_cliente=tipo_cliente.id_tipo_cliente and $_GET[searchField] != '$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";
        }
        if($_GET['searchOper']=='bw'){            
            $SQL = "select id_proveedor,tipo_documento,ci_ruc_pass,empresa_proveedor,representante_legal,visitador,direccion_proveedor,telefono1_proveedor,telefono2_proveedor,fax_proveedor,pais_proveedor,ciudad_proveedor,estado_proveedor,observaciones_proveedor,email_proveedor,proveedor_principal,proveedores.id_tipo_cliente,nombre_tipo_cliente,proveedores.id_forma_pago,nombre_forma from proveedores,formas_pago,tipo_cliente where proveedores.id_forma_pago=formas_pago.id_formas_pagos and proveedores.id_tipo_cliente=tipo_cliente.id_tipo_cliente and $_GET[searchField] like '$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";
        }
        if($_GET['searchOper']=='bn'){            
            $SQL = "select id_proveedor,tipo_documento,ci_ruc_pass,empresa_proveedor,representante_legal,visitador,direccion_proveedor,telefono1_proveedor,telefono2_proveedor,fax_proveedor,pais_proveedor,ciudad_proveedor,estado_proveedor,observaciones_proveedor,email_proveedor,proveedor_principal,proveedores.id_tipo_cliente,nombre_tipo_cliente,proveedores.id_forma_pago,nombre_forma from proveedores,formas_pago,tipo_cliente where proveedores.id_forma_pago=formas_pago.id_formas_pagos and proveedores.id_tipo_cliente=tipo_cliente.id_tipo_cliente and $_GET[searchField] not like '$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";
        }
        if($_GET['searchOper']=='ew'){            
            $SQL = "select id_proveedor,tipo_documento,ci_ruc_pass,empresa_proveedor,representante_legal,visitador,direccion_proveedor,telefono1_proveedor,telefono2_proveedor,fax_proveedor,pais_proveedor,ciudad_proveedor,estado_proveedor,observaciones_proveedor,email_proveedor,proveedor_principal,proveedores.id_tipo_cliente,nombre_tipo_cliente,proveedores.id_forma_pago,nombre_forma from proveedores,formas_pago,tipo_cliente where proveedores.id_forma_pago=formas_pago.id_formas_pagos and proveedores.id_tipo_cliente=tipo_cliente.id_tipo_cliente and $_GET[searchField] like '%$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";
        }
        if($_GET['searchOper']=='en'){        
            $SQL = "select id_proveedor,tipo_documento,ci_ruc_pass,empresa_proveedor,representante_legal,visitador,direccion_proveedor,telefono1_proveedor,telefono2_proveedor,fax_proveedor,pais_proveedor,ciudad_proveedor,estado_proveedor,observaciones_proveedor,email_proveedor,proveedor_principal,proveedores.id_tipo_cliente,nombre_tipo_cliente,proveedores.id_forma_pago,nombre_forma from proveedores,formas_pago,tipo_cliente where proveedores.id_forma_pago=formas_pago.id_formas_pagos and proveedores.id_tipo_cliente=tipo_cliente.id_tipo_cliente and $_GET[searchField] not like '%$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";
        }
        if($_GET['searchOper']=='cn'){            
            $SQL = "select id_proveedor,tipo_documento,ci_ruc_pass,empresa_proveedor,representante_legal,visitador,direccion_proveedor,telefono1_proveedor,telefono2_proveedor,fax_proveedor,pais_proveedor,ciudad_proveedor,estado_proveedor,observaciones_proveedor,email_proveedor,proveedor_principal,proveedores.id_tipo_cliente,nombre_tipo_cliente,proveedores.id_forma_pago,nombre_forma from proveedores,formas_pago,tipo_cliente where proveedores.id_forma_pago=formas_pago.id_formas_pagos and proveedores.id_tipo_cliente=tipo_cliente.id_tipo_cliente and $_GET[searchField] like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";
        }
        if($_GET['searchOper']=='nc'){            
            $SQL = "select id_proveedor,tipo_documento,ci_ruc_pass,empresa_proveedor,representante_legal,visitador,direccion_proveedor,telefono1_proveedor,telefono2_proveedor,fax_proveedor,pais_proveedor,ciudad_proveedor,estado_proveedor,observaciones_proveedor,email_proveedor,proveedor_principal,proveedores.id_tipo_cliente,nombre_tipo_cliente,proveedores.id_forma_pago,nombre_forma from proveedores,formas_pago,tipo_cliente where proveedores.id_forma_pago=formas_pago.id_formas_pagos and proveedores.id_tipo_cliente=tipo_cliente.id_tipo_cliente and $_GET[searchField] not like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";
        }
        if($_GET['searchOper']=='in'){            
            $SQL = "select id_proveedor,tipo_documento,ci_ruc_pass,empresa_proveedor,representante_legal,visitador,direccion_proveedor,telefono1_proveedor,telefono2_proveedor,fax_proveedor,pais_proveedor,ciudad_proveedor,estado_proveedor,observaciones_proveedor,email_proveedor,proveedor_principal,proveedores.id_tipo_cliente,nombre_tipo_cliente,proveedores.id_forma_pago,nombre_forma from proveedores,formas_pago,tipo_cliente where proveedores.id_forma_pago=formas_pago.id_formas_pagos and proveedores.id_tipo_cliente=tipo_cliente.id_tipo_cliente and $_GET[searchField] like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";
        }
        if($_GET['searchOper']=='ni'){
            $SQL = "select id_proveedor,tipo_documento,ci_ruc_pass,empresa_proveedor,representante_legal,visitador,direccion_proveedor,telefono1_proveedor,telefono2_proveedor,fax_proveedor,pais_proveedor,ciudad_proveedor,estado_proveedor,observaciones_proveedor,email_proveedor,proveedor_principal,proveedores.id_tipo_cliente,nombre_tipo_cliente,proveedores.id_forma_pago,nombre_forma from proveedores,formas_pago,tipo_cliente where proveedores.id_forma_pago=formas_pago.id_formas_pagos and proveedores.id_tipo_cliente=tipo_cliente.id_tipo_cliente and $_GET[searchField] not like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";
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
        $s .= "</row>";
    }
    $s .= "</rows>";
    echo $s;
?>