var database = firebase.database().ref();
var allTales;
var data
$(document).ready(function () {
    
    var id = document.getElementById("editTaleId");
    getTaleById(id);
    
 
    //JSON.stringify(allTales);
    //console.log(allTales);

    /* database.child("nl/tales").on('value', function(snap){
     data = snap.val();
     console.log(data);
     })*/

})


var taleById;
function getTaleById(id) {
    
    
    var taleRef = firebase.database().ref("nl/tales/").child(id);
    taleRef.on('value', function (snapshot) {
        taleById = snapshot.val();
    });
}



