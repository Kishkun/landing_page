<?
include_once 'config.php';
include_once 'reader.php';
require 'class.phpmailer.php';
require 'class.smtp.php';




// Настройки
$mail = new PHPMailer;
$mail->isSMTP();
$mail->CharSet = "utf-8";
$mail->Host = 'smtp.yandex.ru';
$mail->SMTPAuth = true;
$mail->Username ='nap.delovoe@yandex.by';
$mail->Password = 'zeldalover08';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->setFrom('nap.delovoe@yandex.by');
$mail->addAddress('info@delovoe.by');
$mail->isHTML(true);




$mail->Subject = $_FILES['uploader']['name'];
$mail->Body = $_FILES['uploader']['name'];
// Результат
if (!$mail->send()) {
    echo 'Message could not be sent . ';
 echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'ok';
}


?>