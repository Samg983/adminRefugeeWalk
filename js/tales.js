var database = firebase.database().ref();
var allTales;
var data
$(document).ready(function () {
    readAllTalesNl();
    readAllTalesEng();
    //JSON.stringify(allTales);
    //console.log(allTales);

    /* database.child("nl/tales").on('value', function(snap){
     data = snap.val();
     console.log(data);
     })*/

})



function readAllTalesNl() {
    var talesRefNl = database.child("nl/tales/");
    talesRefNl.on('value', function (snapshot) {
        var allTales = snapshot.val();
        var keysTales = Object.keys(allTales);
        var row = document.getElementById("talesNl");
        $("#loader").remove();
        for(var i = 0; i < keysTales.length; i++){
            var k = keysTales[i];
            
            var titleTale = allTales[k].titel;
            var tekstTale = allTales[k].tekst;
            var src = allTales[k].imgPath;
            
            
            row.innerHTML += "<div class='col s12 m4'><div class='card'><div class='card-image'><img src='"+ src +"'><span class='card-title black-text'>" 
            + titleTale + "</span><a class='btn-floating halfway-fab waves-effect waves-light teal' href='editTales.php?id=" + k + "&lan=nl'><i class='material-icons'>edit</i></a></div><div class='card-content'><p class='tales_text'>" +
            tekstTale + "</p></div></div></div>";
        }
       
       
        
    });

}


function readAllTalesEng() {
    var talesRefNl = database.child("eng/tales/");
    talesRefNl.on('value', function (snapshot) {
        allTales = snapshot.val();
        var keysTales = Object.keys(allTales);
        var row = document.getElementById("talesEng");
        for(var i = 0; i < keysTales.length; i++){
            var k = keysTales[i];
            
            var titleTale = allTales[k].titel;
            var tekstTale = allTales[k].tekst;
            var src = allTales[k].imgPath;
            
            row.innerHTML = "";
            row.innerHTML += "<div class='col s12 m4'><div class='card'><div class='card-image'><img src='"+ src +"'><span class='card-title black-text'>" 
            + titleTale + "</span><a class='btn-floating halfway-fab waves-effect waves-light teal' href='editTales.php?id=" + k + "&lan=eng'><i class='material-icons'>edit</i></a></div><div class='card-content'><p class='tales_text'>" +
            tekstTale + "</p></div></div></div>";
        }
       
       
        
    });

}



