<?php

class CError404
{
    public function render()
    {
        require_once($_SERVER["DOCUMENT_ROOT"] . "View/VError404.php");
    }

    public function __construct()
    {

    }
}