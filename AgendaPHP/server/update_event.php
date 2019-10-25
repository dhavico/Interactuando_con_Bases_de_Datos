<?php
 
    require('./conector.php');

    session_start();

    $idEvento = $_POST['id'];
    $data['fecha_inicio'] = "'".$_POST['start_date']."'";
    $data['fecha_fin'] = "'".$_POST['end_date']."'";
    $data['hora_inicio'] = "'".$_POST['start_hour']."'";
    $data['hora_fin'] = "'".$_POST['end_hour']."'";

    $con = new ConectorBD();
    if($con->initConexion('agenda') == "OK"){
        if($con->actualizarRegistro('evento', $data,'id='.$idEvento)){
            $response['msg']="OK";
        }else {
            $response['msg']= "Hubo un error y los datos no han sido actualizados";
        }
    }

    echo json_encode($response);

 ?>
