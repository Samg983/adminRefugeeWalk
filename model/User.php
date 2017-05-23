<?php
class User {
    private $userId;
    private $emailaddress;
    private $password;
    private $name;
  
    
    function getUserId() {
        return $this->userId;
    }

    function getEmailaddress() {
        return $this->emailaddress;
    }

    function getPassword() {
        return $this->password;
    }

    function setUserId($userId) {
        $this->userId = $userId;
    }

    function setEmailaddress($emailaddress) {
        $this->emailaddress = $emailaddress;
    }

    function setPassword($password) {
        $this->password = $password;
    }

    function getName() {
        return $this->name;
    }



    function setName($name) {
        $this->name = $name;
    }

 

    function __construct($userId, $emailaddress, $password, $name) {
        $this->userId = $userId;
        $this->emailaddress = $emailaddress;
        $this->password = $password;
        $this->name = $name;
    
    }

 
}

