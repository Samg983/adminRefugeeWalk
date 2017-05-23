<!doctype html>
<html lang="nl">

    <?php
    require_once './Head.php';
    ?>

    <body style="background-color: #D2D2D2">

        <main class="wrapper-admin">



            <div class="row center-align card-panel ">
                <div>
                    <img class="logoLogin" src="./img/logoRW.svg" alt="logo Refugee Walk, Vluchtelingenwerk Vlaanderen"/>
                    <form class="col s12" method="POST" action="login.php">
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">person_outline</i>
                                <input id="icon_prefix" type="text" class="validate" name="name">
                                <label for="icon_prefix">Username</label>
                            </div>
                            <div class="input-field col s12">
                                <i class="material-icons prefix">lock_outline</i>
                                <input id="icon_password" type="password" class="validate" name="password">
                                <label for="icon_password">Password</label>
                            </div>
                        </div>
                        <input type="hidden" name="postCheckLogin" value="true">
                        <!--<a href="index.php" class="btn waves-effect teal">Login-in</a>-->
                        <button id="logInAdmin" class="btn waves-effect teal" type="submit">Log-in
                            <i class="material-icons right">send</i>
                        </button>
                    </form>
                </div>
                <p>username:test, password:test123</p>
            </div>

        </main>

    </body>
</html>