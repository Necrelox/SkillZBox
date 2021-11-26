<?php
echo json_encode("vue Error 404");

$myfile = fopen("ech/token.txt", "r") or die("Unable to open file!");
$token = fread($myfile,filesize("ech/token.txt"));
fclose($myfile);

echo $token;