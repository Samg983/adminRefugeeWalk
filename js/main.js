$(document).ready(function () {

    $('ul.tabs').tabs();
    $('select').material_select();
     $('.tooltipped').tooltip({delay: 50});
    // Initialize collapse button
    $(".button-collapse").sideNav({
        width: "300px",
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });

    initMap();













    $("#logInAdmin").click(function () {
        $.get('admin-detail.php', function (result) {
            $result = $(result);

            $("main").html($result);

        }, 'html');
    });

    $('#search').on("keyup input", function () {
        /* Get input value on change */
        var term = $(this).val();
        var resultDropdown = $("#result");
        if (term.length) {
            $.get("backend-search.php", {query: term}).done(function (data) {
                // Display the returned data in browser
                resultDropdown.html(data);
            });
        } else {
            resultDropdown.empty();
        }
    });

    // Set search input value on click of result item
    $("#result").on("click", "p", function () {
        $("#searchBar").val($(this).text());
        $("#result").empty();
    });


});



