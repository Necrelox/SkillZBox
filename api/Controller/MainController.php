<?php

require_once ($_SERVER["DOCUMENT_ROOT"] . "/api/Controller/CApiCategory.php");
require_once ($_SERVER["DOCUMENT_ROOT"] . "/api/Controller/CApiRoom.php");
require_once ($_SERVER["DOCUMENT_ROOT"] . "/api/Controller/CApiTag.php");
require_once ($_SERVER["DOCUMENT_ROOT"] . "/api/Controller/CApiUser.php");
require_once ($_SERVER["DOCUMENT_ROOT"] . "/api/Controller/CError404.php");

class MainController
{
    private Object $subController;

    private function CheckIfUrlIsApi()
    {
        return $url = explode('/', $_SERVER["REQUEST_URI"])[1] == "api";
    }

    private function CheckTokenReactServer()
    {
        $myfile = fopen($_SERVER["DOCUMENT_ROOT"] . "/api/ech/token.txt", "r") or die("Unable to open file!");
        $token = fread($myfile,filesize($_SERVER["DOCUMENT_ROOT"] . "/api/ech/token.txt"));
        fclose($myfile);
        return explode("/", $_SERVER["REQUEST_URI"])[2] == $token;
    }

    public function setSubController()
    {
        if ($this->CheckIfUrlIsApi() && $this->CheckTokenReactServer()) {
            switch(explode("/", $_SERVER["REQUEST_URI"])[3]) {
                case "category":
                    $this->subController = new CApiCategory();
                    break;
                case "room":
                    $this->subController = new CApiRoom();
                    break;
                case "tag":
                    $this->subController = new CApiTag();
                    break;
                case "user":
                    $this->subController = new CApiUser();
                    break;
                default:
                    $this->subController = new CError404();
                    break;
            }
        } else
            $this->subController = new CError404();
    }

    public function run()
    {
        $this->subController->render();
    }

    public function __construct() {
        $this->setSubController();
    }
}