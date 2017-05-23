<?php
include_once './model/User.php';
include_once './DAO/Verbinding/DatabaseFactory.php';

class UserDAO {

    private static function getVerbinding() {
        return DatabaseFactory::getDatabase();
    }

    public static function getUsers() {
        $resultaat = self::getVerbinding()->voerSqlQueryUit("SELECT * FROM User");
        $resultatenArray = array();
        for ($index = 0; $index < $resultaat->num_rows; $index++) {
            $databaseRij = $resultaat->fetch_array();
            $nieuw = self::converteerRijNaarObject($databaseRij);
            $resultatenArray[$index] = $nieuw;
        }
        return $resultatenArray;
    }

    

    public static function getUserById($id) {
        $resultaat = self::getVerbinding()->voerSqlQueryUit("SELECT * FROM User WHERE userId=?", array($id));
        if ($resultaat->num_rows == 1) {
            $databaseRij = $resultaat->fetch_array();
            return self::converteerRijNaarObject($databaseRij);
        } else {
            //Er is waarschijnlijk iets mis gegaan
            return false;
        }
    }
    


    public static function insert($user) {
        return self::getVerbinding()->voerSqlQueryUit("INSERT INTO User(emailaddress, password, name) VALUES ('?', '?', '?')", array($user->getEmailaddress(), $user->getPassword(), $user->getName()));
    }

    public static function deleteById($id) {
        return self::getVerbinding()->voerSqlQueryUit("DELETE FROM User where userId=?", array($id));
    }

    public static function delete($user) {
        return self::deleteById($user->getUserId());
    }

    public static function update($user) {
        return self::getVerbinding()->voerSqlQueryUit("UPDATE User SET emailaddress='?', password='?', name='?' WHERE userId=?", array($user->getEmailaddress(), $user->getPassword(), $user->getName(),  $user->getUserId()));
    }

    protected static function converteerRijNaarObject($databaseRij) {
        return new User($databaseRij['userId'], $databaseRij['emailaddress'], $databaseRij['password'], $databaseRij['name']);
    }

}



