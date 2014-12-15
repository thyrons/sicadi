<?php
include '../conexion.php';
$data="";
$consulta=pg_query("select empresa_proveedor from proveedores where tipo_documento='$_POST[documento]' and ci_ruc_pass='$_POST[nro]'");
while($row=pg_fetch_row($consulta)){
	$data=$row[0];
}
echo $data;
pg_close();

?>
