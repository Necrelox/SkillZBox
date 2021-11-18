<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    $name = "Bernardo";
    echo json_encode($name);
?>