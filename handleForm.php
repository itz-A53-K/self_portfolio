<?php

$data;
$isSent = false;
$dataMsg="";

if($_SERVER['REQUEST_METHOD']=="POST"){

    $name=$_POST['uName'];
    $email=$_POST['uEmail'];
    $phNo=$_POST['uPhone'];
    $msg=$_POST['msg'];
    $type= $_POST['type'];

    
    
    require 'phpMailer/PHPMailer.php';
    require 'phpMailer/SMTP.php';
    require 'phpMailer/Exception.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer();


    try {
        $mail->isSMTP();                           
        $mail->Host       = 'tls://smtp.gmail.com'; 
        $mail->SMTPAuth   = true;                             
        $mail->Username   = 'test.mailotp96@gmail.com';       
        $mail->Password   = 'kmngwrkcpnszmagu';                      
        $mail->SMTPSecure = 'tls'; 
        $mail->Port       = 587;
        $mail->FromName   = "Abi Portfolio";
        $mail->From       = "test.mailotp96@gmail.com";

        //Recipients
        $mail->addAddress('abikalita34@gmail.com');     //Add a recipient
       
        // //Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

        //Content
        $mail->isHTML(true);
        $mail->Subject = 'Type: '.$type.'.';
        $mail->Body    = '<h3 style="font-weight:400;">From: <b>'.$name.'</b><br><br>Email: <b>'.$email.'</b><br><br>Phone Number: <b>'.$phNo.'</b><br><br>Type: <b>'.$type.'</b><br><br><br><br>Message: <b>'.$msg.'</b><br></h3>';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        if($mail->send()){
            $dataMsg="Msg sent";
            $isSent= true;

        }

        
    } catch (Exception $e) {
        $dataMsg= "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }



}

$data = array(
    'isSent' => $isSent,
    'msg'=> $dataMsg,
);
header('Content-type: application/json');
echo json_encode( $data );
?>