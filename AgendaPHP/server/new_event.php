<?php
  
  require('./conector.php');

  session_start();
  
  $data['id'] = rand(1245,999999);
  $data['titulo'] = "'".$_POST['titulo']."'";
  $data['fecha_inicio'] = "'".$_POST['start_date']."'";
  $data['hora_inicio'] = "'".$_POST['start_hour']."'";
  $data['fecha_fin'] = "'".$_POST['end_date']."'";
  $data['hora_fin'] = "'".$_POST['end_hour']."'";
  $data['es_dia_completo'] = "'".$_POST['allDay']."'";
  $data['id_usuario'] = $_SESSION['id'];

  $con = new ConectorBD();
  if($con->initConexion('agenda') == "OK"){
    if($con->insertData('evento', $data)){
        $response['msg']="OK";
      }else {
        $response['msg']= "Hubo un error y los datos no han sido registrados";
      }
  }

  echo json_encode($response);

 ?>
