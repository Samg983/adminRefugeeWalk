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
                <h4 class="col s12 green-border">Admin</h4>
            </div>

            <div class="row">

                <div class="col s12 m4">
                    <div class="card hoverable">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator fixed-height" src="">
                        </div>
                        <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4"><i class="material-icons right">more_vert</i></span>
                            <p><a href="product_detail.php?productId=?>">See more</a></p>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">

                                <i class="material-icons right">close</i></span>
                            <p>

                            </p>
                            <p><a href="product_detail.php?productId=">See more</a></p>
                        </div>
                    </div>
                </div>

            </div>


        </main>
        <?php require_once './Footer.php'; ?>
    </body>
</html>