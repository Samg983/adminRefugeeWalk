var database = firebase.database().ref();
var storage = firebase.app().storage();
var allTales;
var data

var titel, tekst, filePath, submit, image, lan, id, lan, file;

$(document).ready(function () {
    var imgButton = $("#imgButton");
    
    id = $("#editTaleId").html();
    lan = $("#lan").html();

    getTaleById(id, lan);

    titel = $("#titel");
    tekst = $("#textarea");
    filePath = $("#file-path");
    submit = $("#submit");
    image = $(".imgTale");

    $(document).keyup(function (e) {
        if (checkFields()) {
            console.log("ja");
            $("#submit").removeClass("disabled");
        } else {
            $("#submit").addClass("disabled");
        }
    });

    imgButton.change(function (e) {
        file = e.target.files[0];
        readURL(this);
        if (checkFields()) {
            $("#submit").removeClass("disabled");
        } else {
            $("#submit").addClass("disabled");
        }
    });

    submit.click(function () {
        if (checkFields()) {
            var imgPath = "";
            var id = $("#editTaleId").html();
            var lan = $("#lan").html();

            var titel = $("#titel").val();
            var tekst = $("#textarea").val();
            
            if (checkWebAddress($("#file-path").val())) {
                console.log("geen verandering");
                imgPath = $("#file-path").val();
                editTale(id, titel, tekst, imgPath, lan);
            } else {
                console.log("verandering");
                var storageRef =  storage.ref("tales/" + file.name);
                var task = storageRef.put(file).then(function () {
                    storageRef.getDownloadURL().then(function (url) {
                        imgPath = url;
                        editTale(id, titel, tekst, imgPath, lan);
                    });
                });
            }
        }
    });

})

var taleById;
function getTaleById(id, lan) {
    var taleRef = firebase.database().ref(lan + "/tales/").child(id);
    taleRef.on('value', function (snapshot) {
        taleById = snapshot.val();
        titel.val(taleById.titel);
        tekst.val(taleById.tekst);
        tekst.height(tekst[0].scrollHeight);
        filePath.val(taleById.imgPath);
        image.attr("src", taleById.imgPath);
    });
}

function editTale(id, titel, tekst, imgPath, lan) {
    var annotationRef = firebase.database().ref(lan + "/tales/" + id);

    annotationRef.update({
        titel: titel,
        tekst: tekst,
        imgPath: imgPath
    });
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.imgTale').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function checkFields() {
    var resultaat = false;

    if (!(titel.length == 0 || tekst.length == 0 || filePath.length == 0)) {
        resultaat = true;
    }

    return resultaat;
}

function checkWebAddress(input) {
    var resultaat = false;
    if (input.startsWith("http")) {
        resultaat = true;
    }
    
    return resultaat;
}


