<?php
include 'funciones.php';
$funcion = "";
if (isset($_REQUEST['funcion'])) {
    $funcion = $_REQUEST['funcion'];
}
switch ($funcion) {
    case 1:
        echo usuario();
        break;
    case 2:
        echo tipoUsuario();
        break;
    case 3:
        echo nombreCompleto();
        break;
    case 4:
        echo telefono();
        break;
    case 5:
        echo email();
        break;
}
?>
