<?php
include_once 'check_login.php';
?>
<!doctype html>
<html lang="nl">

    <?php
    require_once './Head.php';
    ?>

    <body>
        <?php require_once 'nav.php'; ?>



        <header class="headerPic">


        </header>
        <main class="wrapper">


            <div class="row" style="margin-top:1em">
                <h4 class="col s12 green-border">Dashboard</h4>
            </div>

            <div class="row">

                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image">
                            <img src="img/tales-dashboard.png">
                            
                        </div>
                        <div class="card-content">
                             <h5>Edit tales</h5>
                            <p>Edit Arzoo, Lien &amp; Rami their tales.</p>
                        </div>
                        <div class="card-action center">
                            <a href="tales.php" class="white-text waves-effect waves-light btn">Go<i class="material-icons left">send</i></a>
                        </div>
                    </div>
                </div>
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image">
                            <img src="img/map-dashboard.png">
                            
                        </div>
                        <div class="card-content">
                            <h5>Map</h5>
                            <p>Edit the walk, set recreation points.</p>
                        </div>
                        <div class="card-action center">
                            <a href="map.php" class="white-text waves-effect waves-light btn">Go<i class="material-icons left">send</i></a>
                        </div>
                    </div>
                </div>

            </div>


        </main>
        <?php require_once './Footer.php'; ?>
    </body>
</html>