<?php

class CApiCategory
{
    public function render()
    {
        require_once($_SERVER["DOCUMENT_ROOT"]. "/api/View/VApiCategory.php");
    }

    public function __construct()
    {

    }
}