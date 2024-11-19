<?php
    require 'phpMailer/PHPMailer.php';
    require 'phpMailer/SMTP.php';
    require 'phpMailer/Exception.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    $data;
    $isSent = false;
    $dataMsg ="";
    $debugMsg = "";

    // Check if form is submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST['uName'];
        $email = $_POST['uEmail'];
        $phNo = $_POST['uPhone'];
        $msg = $_POST['msg'];
        $type = $_POST['type'];

        $template = file_get_contents('email_template.html');
        $emailBody = str_replace(
            ['{{name}}', '{{email}}', '{{phNo}}', '{{msgType}}', '{{msg}}'],
            [$name, $email, $phNo, $type, nl2br($msg)],
            $template
        );
        
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'tls://smtp.gmail.com'; // Replace with your SMTP server
            $mail->SMTPAuth = true;
            $mail->Username = 'test.mailotp96@gmail.com';
            $mail->Password = 'kmngwrkcpnszmagu'; 
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Recipients
            $mail->setFrom('test.mailotp96@gmail.com', 'abikalita.in Mail');
            $mail->addAddress('connect@abikalita.in');

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Type: ' . $type . '.';
            $mail->Body    = $emailBody;
            $mail->AltBody = 'Sender Name = '.$name.', Sender Email = '.$email.', Phone No. = '.$phNo.', Message Type = '.$type.', Message = '.$msg.'.';


            // Send email
            if ($mail->send()) {
                $dataMsg = "Message Sent Successfully.";
                $isSent = true;
            }
        } catch (Exception $e) {
            $dataMsg = "Some error occured! Try again after some time.";

            $debugMsg ="Mailer Error: {$mail->ErrorInfo}";
            $isSent = false;
        }
    }

    // Prepare response
    $data = array(
        'isSent' => $isSent,
        'msg' => $dataMsg,
        'debugMsg' => $debugMsg
    );

    header('Content-type: application/json');
    echo json_encode($data);
?>
