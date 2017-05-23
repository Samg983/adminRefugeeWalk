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
            <a id="mapIcon" href="#modal1" class="btn-floating btn-large waves-effect waves-light teal tooltipped" data-position="left" data-delay="50" data-tooltip="Set new markers"><i class="material-icons">edit</i></a>
            <div id="map">


            </div>

        

            <!-- Modal Structure -->
            <div id="modal1" class="modal bottom-sheet">
                <div class="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        </main>
        <?php require_once './Footer.php'; ?>
        <script async defer
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDx-gTNGSJy30dmkvQvAjj3iS6y9vs8j7g&callback=initMap">
        </script>
    </body>
</html>


