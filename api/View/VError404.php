<?php
echo json_encode("vue Error 404");

$myfile = fopen($_SERVER["DOCUMENT_ROOT"] . "/api/ech/token.txt", "r") or die("Unable to open file!");
$token = fread($myfile,filesize($_SERVER["DOCUMENT_ROOT"] . "/api/ech/token.txt"));
fclose($myfile);

echo $token;