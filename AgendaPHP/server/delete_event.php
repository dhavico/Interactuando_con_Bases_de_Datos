<?php

    require('./conector.php');

    session_start();
  
    $idEvento = $_POST['id'];

    $con = new ConectorBD();
    if($con->initConexion('agenda') == "OK"){
        if($con->eliminarRegistro('evento', 'id='.$idEvento)){
            $response['msg']="OK";
        }else {
            $response['msg']= "Hubo un error y los datos no han sido eliminados";
        }
    }

    echo json_encode($response);

 ?>
