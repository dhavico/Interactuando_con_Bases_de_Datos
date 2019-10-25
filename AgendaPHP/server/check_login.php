<?php
    require('./conector.php');

    $correo=$_POST['username'];
    $clave=$_POST['password'];

    $con = new ConectorBD();

    if($con->initConexion('agenda') == "OK"){
        $query = $con->consultar(['usuarios'], ['id','correo', 'clave'], 'WHERE correo="'.$correo.'"');
        if($query->num_rows !=0){
            $fila = $query->fetch_assoc();
            if (password_verify($clave, $fila['clave'])) {
                $response['msg'] = "OK";
                session_start();
                $_SESSION['id'] = $fila['id'];
                $_SESSION['usuario'] = $fila['correo'];
            } else{
                $response['msg'] = "Usuario y/o contraseña no válidos";
            }
        } else{
            $response['msg'] = "Usuario y/o contraseña no válidos";
        }
    }

    echo json_encode($response);

    $con->cerrarConexion();

 ?>
