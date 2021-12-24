<?php

require_once($_SERVER["DOCUMENT_ROOT"] . "Model/DBconnect.php");

class ApiUser extends DBconnect
{

    public function Create($json)
    {
        $data = json_decode($json, true);
        $username = $data['username'];
        $email = $data["email"];
        $token = bin2hex(openssl_random_pseudo_bytes(16));
        $hashMdp = hash("sha512", $data["password"]);
        $role = $data['role'];
        $sqlQuery = "INSERT INTO user (uuid, username, email, password, token, status, role) VALUES (UUID(), '$username', '$email', '$hashMdp', '$token', '0','$role' )";
        $stmt = $this->db->prepare($sqlQuery);
        $stmt->execute();
    }

    public function Read($json)
    {
        $arrayWithFilter = json_decode($json, true);
        $filterValid = array (
            0 => "uuid",
            1 => "username",
            2 => "email",
            3 => "password",
            4 => "token",
            5 => "status",
            6 => "role",
            7 => "created_at",
        );
        $request = "SELECT * FROM user" . Tools::CreateCondionnalSearch($arrayWithFilter, $filterValid);
        $res = $this->db->prepare($request);
        $res->execute();
        $rowFind = $res->fetchAll(PDO::FETCH_NAMED);
        return json_encode($rowFind);
    }

    public function Update($jsonToSearch, $jsonToUpdate)
    {
        // TODO: Implement Update() method.
    }

    public function Delete($json)
    {
        // TODO: Implement Delete() method.
    }
}