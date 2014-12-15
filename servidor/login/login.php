<?php
  include '../conexion.php';	
  $data=0;
  conectarse();
	session_start();
  date_default_timezone_set('UTC');	
  $fecha=date("Y-m-d");
	if(trim($_POST["loginUser"]) != "" && trim($_POST["passUser"]) != "")
	{
		$usuario = $_POST["loginUser"];
 		$password = $_POST["passUser"];        
 		$result = pg_query("SELECT id_usuario,nombres_usuario from usuario  where  nick_usuario='$_POST[loginUser]' and estado='1' ");        
 		if($row = pg_fetch_array($result)){
      $result1 = pg_query("SELECT nombre_clave from claves where id_usuario='$row[id_usuario]'");        
      while ($row1=pg_fetch_row($result1)) {
        if($row1[0] == $password){
          $_SESSION["id_usuario"] = $row[0];
          $_SESSION["nombres_usuario"] = $row[1];                                            
          $_SESSION["id_empresa"] = $_POST['comboEmpresa'];                                            
          pg_query("update usuario set ultimo_acceso='$fecha' where id_usuario='$row[0]' ");                  
          echo "{success: true}";          
        }else{
          echo "{success: false, errors: { reason: 'Clave incorrecta intente nuevamente.' }}";
        }
      }		          
 		}else{  			
  			echo "{success: false, errors: { reason: 'El usuario no existe o esta bloqueado en la base de datos' }}";
 		} 		
	}else{ 		
 		echo "{success: false, errors: { reason: 'Indique un usuario  y una clave para ingresar.' }}";
	}
	pg_close();		
?>