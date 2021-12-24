<?php

require_once($_SERVER["DOCUMENT_ROOT"] . "Tools/ErrorApi.php");
require_once($_SERVER["DOCUMENT_ROOT"] . "Tools/Tools.php");
require_once($_SERVER["DOCUMENT_ROOT"] . "Model/ApiUser.php");

class CApiUser
{
    public array $Error = array(1, "", "");
    private int $ErrorFind = 0;
    private $JsonView = null;

    private function setError($what, $error)
    {
        $this->Error[0] = $what;
        $this->Error[1] = $error;
        $this->ErrorFind = 1;
    }

    public function getErrorFind(): int
    {
        return $this->ErrorFind;
    }

    public function getError()
    {
        return json_encode($this->Error);
    }

    public function render()
    {
        require_once($_SERVER["DOCUMENT_ROOT"] . "View/VApiUser.php");
    }

    private function CheckCreatePost(): bool
    {
        if (array_key_exists("username", $_POST) && isset($_POST["username"]) &&
            array_key_exists("password", $_POST) && isset($_POST["password"]) &&
            array_key_exists("email", $_POST) && isset($_POST["email"]) &&
            array_key_exists("role", $_POST) && isset($_POST["role"]))
            return true;
        else
            throw new ErrorApi("Create","Error: Missing parameters");
    }

    private function CheckAndPrepareAndUseCreateRequest()
    {
        if ($this->CheckCreatePost()) {
            $ApiUser = new ApiUser();

            /*
             * verif if the username is already used
             * */


            $ApiUser->Create(json_encode(array("username" => htmlspecialchars(strip_tags($_POST['username']))
            , "password" => htmlspecialchars(strip_tags($_POST['password']))
            , "email" => htmlspecialchars(strip_tags($_POST['email']))
            , "role" => htmlspecialchars(strip_tags($_POST['role']))
            )));
            unset($ApiUser);
        }
    }

    private function CheckAndPrepareReadRequest()
    {
        $ApiUser = new ApiUser();
        $this->JsonView = $ApiUser->Read(Tools::ParseFlagsApi(), true);
    }

    private function CheckAndPrepareUpdateRequest()
    {

    }

    private function CheckAndPrepareDeleteRequest()
    {

    }

    private function CheckPostRequest()
    {
        if (array_key_first($_POST) === 'Create')
            $this->CheckAndPrepareAndUseCreateRequest();
        if (array_key_first($_POST) === 'Read')
            $this->CheckAndPrepareReadRequest();
        if (array_key_first($_POST) === 'Update')
            $this->CheckAndPrepareUpdateRequest();
        if (array_key_first($_POST) === 'Delete')
            $this->CheckAndPrepareDeleteRequest();
    }

    public function __construct()
    {
        try {
            $this->CheckPostRequest();
        } catch (ErrorApi $e) {
            $this->setError($e->getWho(), $e->getMessage());
        }
    }
}