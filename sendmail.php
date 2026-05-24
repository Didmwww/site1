<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';


error_reporting(E_ALL);
ini_set('display_errors', 1);


header('Content-Type: application/json; charset=UTF-8');


$config = require 'config.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->IsHTML(true);


$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = $config['email'];
$mail->Password = $config['password']; 
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->SMTPDebug = 0; 
$mail->Debugoutput = 'html';


$mail->setFrom($config['email'], 'Дмитро Осадчий');
$mail->addAddress('astylell00@gmail.com');  


$mail->Subject = 'Нове замовлення';


$body = '<h1>Нове замовлення:</h1>';
if (!empty($_POST['firstName'])) {
    $body .= '<p><strong>Ім`я:</strong> ' . htmlspecialchars($_POST['firstName']) . '</p>';
}
if (!empty($_POST['lastName'])) {
    $body .= '<p><strong>Прізвище:</strong> ' . htmlspecialchars($_POST['lastName']) . '</p>';
}
if (!empty($_POST['phone'])) {
    $body .= '<p><strong>Телефон:</strong> ' . htmlspecialchars($_POST['phone']) . '</p>';
}
if (!empty($_POST['email'])) {
    $body .= '<p><strong>Email:</strong> ' . htmlspecialchars($_POST['email']) . '</p>';
}
if (!empty($_POST['data'])) {
    $body .= '<p><strong>Дата до якої траба виготовити:</strong> ' . htmlspecialchars($_POST['data']) . '</p>';
}
if (!empty($_POST['message'])) {
    $body .= '<p><strong>Обрана піньята:</strong> ' . htmlspecialchars($_POST['message']) . '</p>';
}
if (!empty($_POST['candy'])) {
    $body .= '<p><strong>Цукерки в середині:</strong> ' . htmlspecialchars($_POST['candy']) . '</p>';
}
if (!empty($_POST['age'])) {
    $body .= '<p><strong>Вік:</strong> ' . htmlspecialchars($_POST['age']) . '</p>';
}
$mail->Body = $body;


if (!$mail->send()) {
    echo json_encode(['status' => 'error', 'message' => 'Помилка: ' . $mail->ErrorInfo]);
} else {
    echo json_encode(['status' => 'success', 'message' => 'Замовлення надіслане, з вами зв`яжуться!']);
}

?>