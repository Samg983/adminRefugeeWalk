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
        <main>
            <div class="fixed-action-btn">
                <a id="mapIcon" class="btn-floating btn-large teal">
                    <i class="large material-icons">mode_edit</i>
                </a>
                <ul>
                    <li><a class="btn-floating red"><i class="material-icons">delete</i></a></li>
                </ul>
            </div>
            <div id="map">


            </div>

            <div id="addMarkerPopUp" style="width:30%">

                <form class="s12" action="map.php">
                    <div class="row">
                        <div class="input-field col s12">
                            <select class="icons" name="categorie" id="categorie">
                                <option value="" disabled selected>Kies een categorie</option>
                                <option value="eat" data-icon="img/eat.png" class="left circle">Eat</option>
                                <option value="rock" data-icon="img/rock.png" class="left circle">Rock</option>
                                <option value="tales" data-icon="img/tales.png" class="left circle">Tales</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input placeholder="" id="title" type="text" class="validate" name="title">
                            <label for="title">Titel</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="beschrijving" class="materialize-textarea" placeholder="" name="description"></textarea>
                            <label for="beschrijving">Beschrijving</label>
                        </div>
                    </div>
                    <button id="submit" class="btn waves-effect waves-light full-width" type="submit">Submit
                        <i class="material-icons right">send</i>
                    </button>
                </form>


            </div>





        </main>
        <?php require_once './Footer.php'; ?>
        <script async defer
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDx-gTNGSJy30dmkvQvAjj3iS6y9vs8j7g&callback=initMap">
        </script>
        <script src="https://cdn.rawgit.com/vast-engineering/jquery-popup-overlay/1.7.13/jquery.popupoverlay.js"></script>
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
        <script
            src="js/map.js">
        </script>
    </body>
</html>


