<?php
//In deze klasse moet je in principe alleen de connectiegegevens voor jou mysql server aanpassen.
include_once 'DAO/Verbinding/Database.php';

class DatabaseFactory {

    //Singleton
    private static $verbinding;

    public static function getDatabase() {

        if (self::$verbinding == null) {
            $mijnComputernaam = "localhost";
            $mijnGebruikersnaam = "RefugeeWalk";
            $mijnWachtwoord = "refugeewalk2017";
            $mijnDatabase = "refugeewalk";
            self::$verbinding = new Database($mijnComputernaam, $mijnGebruikersnaam, $mijnWachtwoord, $mijnDatabase);
        }
        return self::$verbinding;
    }

}
?>

