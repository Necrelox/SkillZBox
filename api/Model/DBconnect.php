<?php

abstract class DBconnect
{
    protected ?PDO $db;

    abstract public function Create($json);
    abstract public function Read($json);
    abstract public function Update($jsonToSearch, $jsonToUpdate);
    abstract public function Delete($json);

    public function __construct()
    {
        $server = "host=localhost";
        if (isset($_SERVER["DB_USER"]))
            $user = $_SERVER["DB_USER"];
        if (isset($_SERVER["DB_NAME"]))
            $DBname = $_SERVER["DB_NAME"];
        if (isset($_SERVER["DB_PASSWORD"]))
            $password = $_SERVER["DB_PASSWORD"];

        try {
            $this->db = new PDO("mysql:$server;dbname=$DBname;charset=utf8", $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch (Exception $e) {
            echo $e->getMessage();
            $this->db = null;
        }
    }
    public function __destruct()
    {
        if ($this->db)
            $this->db = null;
    }
}