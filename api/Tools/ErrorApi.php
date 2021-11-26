<?php

class ErrorApi extends Exception
{
    private string $who = "";

    public function getWho()
    {
        return $this->who;
    }

    public function __construct($who, $message, $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->who = $who;
    }
}