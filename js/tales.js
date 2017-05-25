var database = firebase.database().ref();
var allTales;
var data
$(document).ready(function () {
    readAllTalesNl();
    //JSON.stringify(allTales);
    //console.log(allTales);

    /* database.child("nl/tales").on('value', function(snap){
     data = snap.val();
     console.log(data);
     })*/

})


var allTales;
function readAllTalesNl() {
    var talesRefNl = database.child("nl/tales/");
    talesRefNl.on('value', function (snapshot) {
        allTales = snapshot.val();
        var keysTales = Object.keys(allTales);
        var row = document.getElementById("tales");
        for(var i = 0; i < keysTales.length; i++){
            var k = keysTales[i];
            
            var titleTale = allTales[k].titel;
            var tekstTale = allTales[k].tekst;
            
            row.innerHTML += "<div class='col s12 m4'><div class='card'><div class='card-image'><img src='http://lorempixel.com/output/food-q-c-150-150-2.jpg'><span class='card-title black-text'>" 
            + titleTale + "</span><a class='btn-floating halfway-fab waves-effect waves-light teal' href='editTales.php?id=" + k + "'><i class='material-icons'>edit</i></a></div><div class='card-content'><p>" +
            tekstTale + "</p></div></div></div>";
        }
       
       
        
    });

}



