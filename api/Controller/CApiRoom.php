<?php

class CApiRoom
{
    public function render()
    {
        require_once($_SERVER["DOCUMENT_ROOT"] . "/api/View/VApiRoom.php");
    }

    public function __construct()
    {

    }
}