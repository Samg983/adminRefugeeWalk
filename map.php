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
                    <i class="large material-icons">add</i>
                </a>
                <ul>
                    <li id="add_location"><a class="btn-floating white"><i id="addIcon" class="material-icons teal-text">add_location</i></a></li>
                    <li id="draw_route"><a class="btn-floating white"><i id="drawRouteIcon" class="material-icons teal-text">mode_edit</i></a></li>
                    <li id="delete"><a class="btn-floating white"><i id="deleteIcon" class="material-icons teal-text">delete</i></a></li>
                </ul>
            </div>
            <div id="map">


            </div>

            <div id="addMarkerPopUp" style="width:30%">
                <form id="myForm" class="s12" action="map.php" enctype="multipart/form-data">
                    <ul class="tabs">
                        <li class="tab col s6"><a class="teal-text active" href="#nl">Nederlands</a></li>
                        <li class="tab col s6"><a class="teal-text" href="#eng">Engels</a></li>
                    </ul>

                    <div class="input-field col s12">
                        <select class="icons" id="categorie">
                            <option id="nul" value="nul" disabled>Choose a category*</option>
                            <option id="eat" value="eat" data-icon="img/eat.png" class="left circle" >Eat</option>
                            <option id="rock" value="rock" data-icon="img/rock.png" class="left circle">Rock</option>
                            <option id="tales" value="tales" data-icon="img/tales.png" class="left circle">Tales</option>
                        </select>
                    </div>

                    <div id="nl">

                        <div class="row">

                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input placeholder="" id="title" type="text" class="validate" name="title">
                                <label for="title">Titel*</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea id="beschrijving" class="materialize-textarea" placeholder="" name="description"></textarea>
                                <label for="beschrijving">Beschrijving*</label>
                            </div>
                        </div>


                        <!--<button id="submit" class="btn waves-effect waves-light full-width" type="submit">Submit
                             <i class="material-icons right">send</i>
                         </button>-->

                    </div>
                    <div id="eng">

                        <div class="row">

                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input placeholder="" id="titleEng" type="text" class="validate" name="title">
                                <label for="title">Title*</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea id="beschrijvingEng" class="materialize-textarea" placeholder="" name="description"></textarea>
                                <label for="beschrijving">Description*</label>
                            </div>
                        </div>


                        <!--<button id="submit" class="btn waves-effect waves-light full-width" type="submit">Submit
                             <i class="material-icons right">send</i>
                         </button>-->



                    </div>
                    <div class="file-field input-field col s12 m6">
                        <div class="btn">
                            <span>Foto*</span>
                            <input id="imgButton" type="file" name="imgAnnotation" >
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" name="imgAnnotation2" value="">
                        </div>
                    </div>
                    <a id="submit" class="btn waves-effect waves-light full-width addMarkerPopUp_close" type="submit">Submit
                        <i class="material-icons right">send</i>
                    </a>
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


