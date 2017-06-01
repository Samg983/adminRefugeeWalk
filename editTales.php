<?php
include_once 'check_login.php';

$id = $_GET["id"];
$lan = $_GET["lan"];
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
                <h4 id="editTaleId" class="col s12 green-border"><?php echo $id; ?></h4>
                <p id="lan" style="visibility: hidden"><?php echo $lan; ?></p>
            </div>

            <div class="row">
                <div class="col s6">
                    <div class="col s12">
                        <img class="imgTale responsive-img" src="">
                    </div>
                    <div class="row file-field input-field col s12 ">
                        <p>Foto max 1mb</p>
                        <div class="btn col s12">
                            <span>Pas foto aan*</span>
                            <input id="imgButton" type="file" name="imgAnnotation" >
                        </div>
                        
                        <div class="file-path-wrapper">
                            <input id="file-path" class="file-path validate" type="hidden" name="imgAnnotation2" value="">
                        </div>

                    </div>
                </div>
                <div class="col s6">
                    <div class="input-field col s12">
                        <input placeholder="" id="titel" type="text">
                        <label for="titel">Titel</label>
                    </div>
                    <div class="input-field col s12">
                        <textarea id="textarea" class="materialize-textarea" placeholder="" data-length="1000"></textarea>
                        <label for="textarea">Beschrijving</label>
                    </div>


                    <a id="submit" class="btn waves-effect waves-light full-width addMarkerPopUp_close disabled" type="submit">Submit
                        <i class="material-icons right">send</i>
                    </a>
                </div>
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
        <script src="./js/editTales.js"></script>
        <?php require_once './Footer.php'; ?>
    </body>
</html>