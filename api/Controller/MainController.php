<?php

require_once ("CApiCategory.php");
require_once ("CApiRoom.php");
require_once ("CApiTag.php");
require_once ("CApiUser.php");
require_once ("CError404.php");

class MainController
{
    private $subController;

    public function CheckIfUrlIsApi()
    {
        return $url = explode('/', $_SERVER["REQUEST_URI"])[1] == "api";
    }

    public function CheckTokenReactServer()
    {
        $myfile = fopen("ech/token.txt", "r") or die("Unable to open file!");
        $token = fread($myfile,filesize("ech/token.txt"));
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