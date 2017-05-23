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
                <h4 class="col s12 green-border">Tales</h4>
            </div>

            <div class="row">
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image">
                            <img src="http://lorempixel.com/output/food-q-c-150-150-2.jpg">
                            <span class="card-title black-text">Card Title</span>
                            <a class="btn-floating halfway-fab waves-effect waves-light teal"><i class="material-icons">edit</i></a>
                        </div>
                        <div class="card-content">
                            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                        </div>
                    </div>
                </div>
            </div>



        </main>
        <?php require_once './Footer.php'; ?>
    </body>
</html>