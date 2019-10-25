<?php
    require('./conector.php');

    session_start();

    if(isset($_SESSION['usuario'])){
        $idUsuario = $_SESSION['id'];
        $con = new ConectorBD();
        if($con->initConexion('agenda') == "OK"){
            $query = $con->consultar(['evento'], ['id', 'titulo', 'fecha_inicio', 'hora_inicio', 'fecha_fin', 'hora_fin', 'es_dia_completo'], 'WHERE id_usuario="'.$idUsuario.'"');
            $i=0;
            if($query->num_rows !=0){
                while($fila = $query->fetch_assoc()){
                    $response['eventos'][$i]['id'] = $fila['id'];
                    $response['eventos'][$i]['title'] = $fila['titulo'];
                    $response['eventos'][$i]['start'] = $fila['fecha_inicio'].' '.$fila['hora_inicio'];
                    $response['eventos'][$i]['end'] = $fila['fecha_fin'].' '.$fila['hora_fin'];
                    $response['eventos'][$i]['allDay'] = boolval($fila['es_dia_completo']);
                    $i++;
                }
            }
            $response['msg'] = "OK";
        }

    }else {
        $response['msg'] = "Por favor inicie sesión nuevamente.";
    }
    echo json_encode($response);
 ?>
