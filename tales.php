<?php
include_once 'check_login.php';
?>
<!doctype html>
<html lang="nl">

    <?php
    require_once './Head.php';
    $src1 = $_POST['source1'];
    echo count($src1);
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
                <div class="col s12 ">
                    <ul class="tabs">
                        <li class="tab col s3"><a class="active teal-text" href="#talesNl">Nl</a></li>
                        <li class="tab col s3"><a class="teal-text" href="#talesEng">Eng</a></li>

                    </ul>
                </div>
                <div id="talesNl" class="col s12">
                    <div id="loader" class="progress">
                        <div class="indeterminate"></div>
                    </div>

                </div>
                <div id="talesEng" class="col s12"></div>

            </div>

        </main>


        <script src="https://www.gstatic.com/firebasejs/4.0.0/firebase.js"></script>
        <script>
            // Initialize Firebase
            var config = {
                apiKey: "AIzaSyAxfL-FkIsfn_U0lC6ZyVbSoNeOONihbjU",
                authDomain: "refugeewalk-2bcad.firebaseapp.com",
                databaseURL: "https://refugeewalk-2bcad.firebaseio.com",
                projectId: "refugeewalk-2bcad",
                storageBucket: "refugeewalk-2bcad.appspot.com",
                messagingSenderId: "852551580647"
            };
            firebase.initializeApp(config);
        </script>
        <script src="./js/tales.js"></script>
        <?php require_once './Footer.php'; ?>
    </body>
</html>