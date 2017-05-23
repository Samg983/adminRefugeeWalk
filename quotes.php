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
                <h4 class="col s12 green-border">Quotes</h4>
            </div>

            <div class="row">
                <div class="col s12 ">
                    <ul class="tabs">
                        <li class="tab col s3"><a class="active black-text" href="#quotes">Quotes</a></li>
                        <li class="tab col s3"><a class="black-text" href="#approved_quotes">Approved quotes</a></li>
                        <li class="tab col s3"><a class="black-text"  href="#dismissed_quotes">Dismissed quotes</a></li>

                    </ul>
                </div>

                <div id="quotes" class="col s12">
                    <table class="striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Quote content</th>
                                <th>From</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>23/05/2017</td>
                                <td>Go go go</td>
                                <td>Calvin Klein</td>
                                <td>
                                    <form method="POST" action="#">
                                        <button type="submit">
                                            <i class="material-icons">done</i>
                                        </button>
                                    </form>
                                </td>
                                <td>
                                    <form method="POST" action="#">
                                        <button type="submit">
                                            <i class="material-icons">delete</i>
                                        </button>
                                    </form>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div id="approved_quotes" class="col s12">
                    <table class="striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Quote content</th>
                                <th>From</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>23/05/2017</td>
                                <td>Go go go</td>
                                <td>Calvin Klein</td>
                                <td class="green">Approved</td>
                                <td>
                                    <form method="POST" action="#">
                                        <button type="submit">
                                            <i class="material-icons">delete</i>
                                        </button>
                                    </form>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div id="dismissed_quotes" class="col s12">
                    <table class="striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Quote content</th>
                                <th>From</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>23/05/2017</td>
                                <td>Go go go</td>
                                <td>Calvin Klein</td>
                                <td class="red">Dismissed</td>
                                <td>
                                    <form method="POST" action="#">
                                        <button type="submit">
                                            <i class="material-icons">done</i>
                                        </button>
                                    </form>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>



            </div>


        </main>
        <?php require_once './Footer.php'; ?>
    </body>
</html>