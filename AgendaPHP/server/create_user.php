<?php
    require('./conector.php');

    $con = new ConectorBD('localhost', 'root', '');

    function NewUser($Correo, $Clave, $NombreCompleto, $FechaNacimiento){
        global $con;

        $con->initConexion('agenda');
        
        $query = "INSERT INTO usuarios (id, correo, clave, nombre_completo, fecha_nacimiento)
                  VALUES ('".rand(1245,999999)."','".$Correo."', '".password_hash($Clave, PASSWORD_DEFAULT)."', '".$NombreCompleto."', '".$FechaNacimiento."')";

        if ($con->ejecutarQuery($query) === TRUE) {
            echo "Usuario '$Correo' creado correctamente. <br/>";
        } else {
            echo "Error en: ".$query;
        }
        $con->cerrarConexion();
    }

    NewUser("david@ortega.com","123456","David Ortega","2001/06/17");
    NewUser("carlos@murrugarra.com","123456","Carlos Murrugarra","1985/09/02");
    NewUser("jorge@lopez.com","123456","Jorge Lopez","2005/02/25");

 ?>
