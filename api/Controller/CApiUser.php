<?php

require_once("./Tools/ErrorApi.php");

class CApiUser
{
    public array $Error = array(1, "", "");
    private int $ErrorFind = 0;

    private function setError($what, $error)
    {
        $this->Error[0] = $what;
        $this->Error[1] = $error;
        $this->ErrorFind = 1;
    }

    public function getErrorFind()
    {
        return $this->ErrorFind;
    }

    public function getError()
    {
        return json_encode($this->Error);
    }

    public function render()
    {
        require_once("View/VApiUser.php");
    }

    private function CheckCreatePost()
    {
        if (array_key_exists("username", $_POST) && isset($_POST["username"]) &&
            array_key_exists("password", $_POST) && isset($_POST["password"]) &&
            array_key_exists("email", $_POST) && isset($_POST["email"]) &&
            array_key_exists("role", $_POST) && isset($_POST["role"]))
            return true;
        else
            throw new ErrorApi("Create","Error: Missing parameters");
        return false;
    }

    private function CheckAndPrepareCreateRequest()
    {
        if (!($this->CheckCreatePost()))
            return false;
        return true;
    }

    private function CheckAndPrepareReadRequest()
    {
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
            $this->CheckAndPrepareCreateRequest();
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