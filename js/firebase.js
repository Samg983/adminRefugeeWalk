/* global firebase, snap, snapshot */
var database;

var annotationNlCount = 0;
var talesNlCount = 0;
var annotationEnCount = 0;
var talesEnCount = 0;


$(document).ready(function () {
    document.addEventListener("click", function () {
        addAnnotation("soort", "lat", "long", "titel", "tekst");
    });

    var annotationNlCountRef = firebase.database().ref('nl/annotations');
    annotationNlCountRef.on('value', function (snapshot) {
        annotationNlCount = snapshot.numChildren();
    });

    var talesNlCountRef = firebase.database().ref('nl/tales');
    talesNlCountRef.on('value', function (snapshot) {
        talesNlCount = snapshot.numChildren();
    });

    var annotationEnCountRef = firebase.database().ref('en/annotations');
    annotationEnCountRef.on('value', function (snapshot) {
        annotationEnCount = snapshot.numChildren();
    });

    var talesEnCountRef = firebase.database().ref('en/tales');
    talesEnCountRef.on('value', function (snapshot) {
        talesEnCount = snapshot.numChildren();
    });

});


function addAnnotation(soort, lat, long, titel, tekst) {
    var annotationId = parseInt(annotationNlCount) + 1;
    firebase.database().ref('nl/annotations/annotation' + annotationId).set({
        id: annotationId,
        soort: soort,
        latitude: lat,
        longtitude: long,
        titel: titel,
        tekst: tekst
    });
}

function addTale(titel, tekst) {
    var talesId = parseInt(talesNlCount) + 1;
    firebase.database().ref('nl/tales/tale' + talesId).set({
        id: talesId,
        titel: titel,
        tekst: tekst
    });
}

var allAnnotations;
function readAllAnnotationsNl() {
    var annotationsRefNl = firebase.database().ref('nl/annotations');
    annotationsRefNl.on('value', function (snapshot) {
        allAnnotations = snapshot.val();
    });
}



function updateAnnotation(id, soort, lat, long, titel, tekst, imgPath) {
    var annotationRef = firebase.database().ref("nl/annotation/" + id);

    annotationRef.update({
        soort: soort,
        latitude: lat,
        longtitude: long,
        titel: titel,
        tekst: tekst,
        imgPath: imgPath
    });
}


function updateTale(id, titel, tekst) {
    var talesRef = firebase.database().ref("nl/tales/" + id);

    talesRef.updat({
        titel: titel,
        tekst: tekst
    });
}

function deleteAnnotationById(id) {
    var annotationRef = firebase.database().ref("nl/annotations/").child(id);
    annotationRef.remove();
}

function deleteTaleById(id) {
    var taleRef = firebase.database().ref("nl/tales/").child(id);
    taleRef.remove();
}

var annotationById;
function getAnnotationById(id) {
    var annotationRef = firebase.database().ref("nl/annotations/").child(id);
    annotationRef.on('value', function (snapshot) {
        annotationById = snapshot.val();
    });
}

var taleById;
function getTaleById(id) {
    var taleRef = firebase.database().ref("nl/tales/").child(id);
    taleRef.on('value', function (snapshot) {
        taleById = snapshot.val();
    });
}

function uploadPhoto(name, file) {
    var imgRef = firebase.storage().ref('images/').child(name);
    imgRef.put(file);
}

       