/* Verwijderen van punten op een polyline https://duncan99.wordpress.com/2015/10/16/google-maps-editable-polylines/ */
/* live preview van foto toevoegen aan img src http://jsfiddle.net/LvsYc/ */
var map;
var database = firebase.database();
var storage = firebase.app().storage();
var iconBase = 'https://www.samgoeman.com/img/';
var lat, lon;
var file;

var addBoolean = false;
var drawBoolean = false;
var deleteBoolean = false;
var editAnnotationBoolean = false;

var route;

var path;

var routeMarkers = [];

var markers = [];

var toEditId, toEditIdENG;

var polylineLength = 0;


var icons = {
    tales: {
        icon: iconBase + 'tales.png'

    },
    eat: {
        icon: iconBase + 'eat.png'
    },
    rock: {
        icon: iconBase + 'rock.png'
    }
};
$(document).ready(function () {
    route = new google.maps.MVCArray();



    $('.tabs').tabs();

    initMap();

    readAllAnnotationsNl();
    drawRoute();

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {

            if (addBoolean) {
                setAddToNormal();
            }
            if (drawBoolean) {
                setDrawToNormal();
            }
            if (deleteBoolean) {
                setDeleteToNormal();
            }
        }

        if (checkFields()) {
            $("#submit").removeClass("disabled");
        } else {
            $("#submit").addClass("disabled");
        }
    });
    $("#add_location").click(function () {
        if (addBoolean) {
            setAddToNormal();
        } else {
            addBoolean = true;
            drawBoolean = false;
            deleteBoolean = false;
            map.setOptions({draggableCursor: "url(https://www.samgoeman.com/img/add-location-8.png), auto"});
            $("#deleteIcon").html("delete");
            $("#drawRouteIcon").html("mode_edit");
            $("#addIcon").html("pan_tool");
        }

    });

    $("#draw_route").click(function () {

        if (drawBoolean) {
            setDrawToNormal();
        } else {
            addBoolean = false;
            drawBoolean = true;
            deleteBoolean = false;
            map.setOptions({draggableCursor: "url(https://www.samgoeman.com/img/draw-8.png), auto"});
            $("#drawRouteIcon").html("pan_tool");
            $("#deleteIcon").html("delete");
            $("#addIcon").html("add_location");
        }
    });

    $("#delete").click(function () {
        if (deleteBoolean) {
            setDeleteToNormal();
        } else {
            addBoolean = false;
            drawBoolean = false;
            deleteBoolean = true;
            map.setOptions({draggableCursor: "url(https://www.samgoeman.com/img/delete-8.png), auto"});
            $("#deleteIcon").html("pan_tool");
            $("#drawRouteIcon").html("mode_edit");
            $("#addIcon").html("add_location");
        }

    });


    var imgButton = $("#imgButton");

    imgButton.change(function (e) {
        file = e.target.files[0];
        readURL(this);
        if (checkFields()) {
            $("#submit").removeClass("disabled");
        } else {
            $("#submit").addClass("disabled");
        }
    });

    $("#submit").click(function (e) {
        if (checkFields()) {
            if (editAnnotationBoolean) {
                var imgPath = "";

                var categorie = $("#categorie").val();

                var titelNl = $("#title").val();
                var beschrijvingNl = $("#beschrijving").val();

                var titelEng = $("#titleEng").val();
                var beschrijvingEng = $("#beschrijvingEng").val();

                console.log(categorie);

                if (checkWebAddress($("#file-path").val())) {
                    imgPath = $("#file-path").val();
                    editAnnotationToFirebaseNl(toEditIdNl, categorie, titelNl, beschrijvingNl, imgPath);
                    editAnnotationToFirebaseENG(toEditIdENG, categorie, titelEng, beschrijvingEng, imgPath);
                    clearMarkers();
                    markers = [];
                    readAllAnnotationsNl();
                } else {
                    var storageRef =  storage.ref("annotation/" + file.name);
                    var task = storageRef.put(file).then(function () {
                        storageRef.getDownloadURL().then(function (url) {
                            imgPath = url;

                            editAnnotationToFirebaseNl(toEditIdNl, categorie, titelNl, beschrijvingNl, imgPath);
                            editAnnotationToFirebaseENG(toEditIdENG, categorie, titelEng, beschrijvingEng, imgPath);
                            clearMarkers();
                            markers = [];
                            readAllAnnotationsNl();
                        });
                    });
                }

                clearForm();
            } else {
                var categorie = $("#categorie").val();

                var titelNl = $("#title").val();
                var beschrijvingNl = $("#beschrijving").val();

                var titelEng = $("#titleEng").val();
                var beschrijvingEng = $("#beschrijvingEng").val();

                var imgPath = "";

                var storageRef =  storage.ref("annotation/" + file.name);
                var task = storageRef.put(file).then(function () {
                    storageRef.getDownloadURL().then(function (url) {
                        imgPath = url;
                        writeAnnotationToFirebaseNl(categorie, lat, lon, titelNl, beschrijvingNl, imgPath);
                        writeAnnotationToFirebaseEng(categorie, lat, lon, titelEng, beschrijvingEng, imgPath);
                    });
                });
                clearForm();
            }
        } else {

        }

    });

});


function initMap() {
    var styledMapType = new google.maps.StyledMapType([
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dadada"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#c9c9c9"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#00b7b3"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        }
    ], {name: 'Styled Map'});
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 50.931761, lng: 5.546263},
        zoom: 13,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map']
        }
    });
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    map.addListener('click', function (e) {
        if (addBoolean) {
            clearForm();
            $('#addMarkerPopUp').popup('show');

            lat = e.latLng.lat();
            lon = e.latLng.lng();
        }

        if (drawBoolean) {
            sendPointsToFirebase(e);
            drawRoute();
        }

    });
}

function placeMarker(position, categorie, map, idNL, beschrijvingNL, titelNL, idENG, beschrijvingENG, titelENG) {
    var marker = new google.maps.Marker({
        draggable: true,
        position: position,
        map: map,
        icon: icons[categorie].icon,
        categorie: categorie,
        idNL: idNL,
        beschrijvingNL: beschrijvingNL,
        titelNL: titelNL,
        idENG: idENG,
        beschrijvingENG: beschrijvingENG,
        titelENG: titelENG
    });

    markers.push(marker);

    marker.addListener("click", function () {
        $('#addMarkerPopUp').popup('show');
        editAnnotationBoolean = true;
        toEditIdNl = idNL;
        toEditIdENG = idENG;

        $("#submit").removeClass("disabled");
        getAnnotationById(marker.idNL, marker.idENG);
    });

    google.maps.event.addListener(marker, 'dragend', function (e) {
        var annotationRefNL = database.ref("nl/annotations/" + idNL);

        annotationRefNL.update({
            beschrijving: marker.beschrijvingNL,
            categorie: marker.categorie,
            lat: e.latLng.lat(),
            lon: e.latLng.lng(),
            titel: marker.titelNL
        });

        var annotationRefEN = database.ref("eng/annotations/" + idENG);

        annotationRefEN.update({
            beschrijving: marker.beschrijvingENG,
            categorie: marker.categorie,
            lat: e.latLng.lat(),
            lon: e.latLng.lng(),
            titel: marker.titelENG
        });
        clearMarkers();
        markers = [];
        readAllAnnotationsNl();
    });

    marker.addListener('rightclick', function () {
        deleteMarkerById(idNL, idENG);
        clearMarkers();
        markers = [];
        readAllAnnotationsNl();
    });
}



function writeAnnotationToFirebaseNl(categorie, lat, lon, titel, beschrijving, imgPath) {
    database.ref('nl/annotations/').push({
        categorie: categorie,
        lat: lat,
        lon: lon,
        titel: titel,
        beschrijving: beschrijving,
        imgPath: imgPath
    });
}

function writeAnnotationToFirebaseEng(categorie, lat, lon, titel, beschrijving, imgPath) {
    database.ref('eng/annotations/').push({
        categorie: categorie,
        lat: lat,
        lon: lon,
        titel: titel,
        beschrijving: beschrijving,
        imgPath: imgPath
    });
}

function readAllAnnotationsNl() {

    var annotationsRefNl = firebase.database().ref('nl/annotations');
    annotationsRefNl.on('value', function (snapshot) {
        var allAnnotationsNL = snapshot.val();
        var allAnnotationsKeysNL = Object.keys(allAnnotationsNL);


        var annotationsRefEng = firebase.database().ref('eng/annotations');
        annotationsRefEng.on('value', function (snapshot) {
            var allAnnotationsENG = snapshot.val();
            var allAnnotationsKeysENG = Object.keys(allAnnotationsENG);
            for (var i = 0; i < allAnnotationsKeysNL.length; i++) {
                var k = allAnnotationsKeysNL[i];
                var p = allAnnotationsKeysENG[i];
                var categorie = allAnnotationsNL[k].categorie;
                var lat = allAnnotationsNL[k].lat;
                var lon = allAnnotationsNL[k].lon;
                var titelNL = allAnnotationsNL[k].titel;
                var beschrijvingNL = allAnnotationsNL[k].beschrijving;

                console.log(p);
                var titelENG = allAnnotationsENG[p].titel;
                console.log(titelENG);
                var beschrijvingENG = allAnnotationsENG[p].beschrijving;

                var myLatlng = new google.maps.LatLng(lat, lon);
                placeMarker(myLatlng, categorie, map, k, beschrijvingNL, titelNL, p, titelENG, beschrijvingENG);
            }
        });

    });
}



function drawRoute() {
    var routeRef = firebase.database().ref('route/');
    routeRef.on('value', function (snapshot) {
        var allPoints = snapshot.val();
        var allPointsKeys = Object.keys(allPoints);
        route.clear();
        clearRouteMarkers();
        routeMarkers = [];
        for (var i = 0; i < allPointsKeys.length; i++) {
            var k = allPointsKeys[i];

            var lat = allPoints[k].lat;
            var lon = allPoints[k].lon;

            if (i == 0) {
                setFirstRouteMarker(k, lat, lon)
            } else if (i == allPointsKeys.length - 1) {
                setLastRouteMarker(k, lat, lon)
            } else {
                placeRouteMarker(k, lat, lon);
            }

           



            route.push(new google.maps.LatLng(lat, lon));
            
            
        }

        
        var path = new google.maps.Polyline({
            path: route,
            geodesic: true,
            editable: false,
            strokeColor: "#f2552a",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: map
        });
        
        $("#length p").html("Afstand van de wandeling: " + (calcDistance(path.getPath()) / 1000).toFixed(2)+ " km");
    });
}

function calcDistance(kaka) {
  return google.maps.geometry.spherical.computeLength(kaka);
}

function sendPointsToFirebase(e) {
    database.ref('route/').push({
        lat: e.latLng.lat(),
        lon: e.latLng.lng()
    });

}

function setAddToNormal() {
    map.setOptions({draggableCursor: "url(http://maps.gstatic.com/mapfiles/openhand_8_8.cur), auto"});
    addBoolean = false;
    $("#addIcon").html("add_location");
}

function setDrawToNormal() {
    map.setOptions({draggableCursor: "url(http://maps.gstatic.com/mapfiles/openhand_8_8.cur), auto"});
    $("#drawRouteIcon").html("mode_edit");
    drawBoolean = false;
}

function setDeleteToNormal() {
    map.setOptions({draggableCursor: "url(http://maps.gstatic.com/mapfiles/openhand_8_8.cur), auto"});
    deleteBoolean = false;
    $("#deleteIcon").html("delete");
}




function placeRouteMarker(id, lat, lon) {
    var marker = new google.maps.Marker({
        draggable: true,
        position: new google.maps.LatLng(lat, lon),
        map: map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
            fillColor: "#FFF",
            fillOpacity: 1,
            strokeColor: '#f2552a',
            strokeWeight: 2

        },
        id: id
    });


    marker.addListener('click', function (e) {
        if (deleteBoolean) {
            var id = marker.id;
            var markerRef = firebase.database().ref("route/").child(id);
            markerRef.remove();
            clearRouteMarkers();
            routeMarkers = [];
            drawRoute();
        }
    });

    routeMarkers.push(marker);

    google.maps.event.addListener(marker, 'dragend', function (e) {
        var routeRef = database.ref("route/" + id);

        routeRef.update({
            lat: e.latLng.lat(),
            lon: e.latLng.lng()
        });
        clearRouteMarkers();
        routeMarkers = [];
        drawRoute();

    });
}

function clearRouteMarkers() {
    setRouteMapOnAll(null);
}

function setRouteMapOnAll(map) {
    for (var i = 0; i < routeMarkers.length; i++) {
        routeMarkers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearForm() {
    $("#myForm")[0].reset();
    $("#categorie").val("nul");
    $("#submit").addClass("disabled");
    $(".imgAnnotation").attr("src", "");
    editAnnotationBoolean = false;

}


function getAnnotationById(idNL, idENG) {

    var annotationRefNl = firebase.database().ref("nl/annotations/").child(idNL);
    annotationRefNl.on('value', function (snapshot) {
        var annotationById = snapshot.val();
        $("#categorie").val(annotationById.categorie);
        $(".imgAnnotation").attr("src", annotationById.imgPath);
        $("#file-path").val(annotationById.imgPath);
        $("#title").val(annotationById.titel);
        $("#beschrijving").val(annotationById.beschrijving);



    });

    var annotationRefEng = firebase.database().ref("eng/annotations/").child(idENG);
    annotationRefEng.on('value', function (snapshot) {
        var annotationById = snapshot.val();
        $("#titleEng").val(annotationById.titel);
        $("#beschrijvingEng").val(annotationById.beschrijving);
    });
}

function checkFields() {
    var resultaat = false;

    var categorie = $("#categorie").val();

    var titelNl = $("#title").val();
    var beschrijvingNl = $("#beschrijving").val();

    var titelEng = $("#titleEng").val();
    var beschrijvingEng = $("#beschrijvingEng").val();

    var imgPath = $("#file-path").val();

    if (!(categorie == "nul" || titelNl.length == 0 || beschrijvingNl.length == 0 || titelEng.length == 0 || beschrijvingEng.length == 0 || imgPath.length == 0)) {
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

function editAnnotationToFirebaseNl(idNL, categorie, titelNl, beschrijvingNl, imgPath) {
    var annotationRef = firebase.database().ref("nl/annotations/" + idNL);

    annotationRef.update({
        categorie: categorie,
        titel: titelNl,
        beschrijving: beschrijvingNl,
        imgPath: imgPath
    });
}

function editAnnotationToFirebaseENG(idENG, categorie, titelENG, beschrijvingENG, imgPath) {
    var annotationRef = firebase.database().ref("eng/annotations/" + idENG);

    annotationRef.update({
        categorie: categorie,
        titel: titelENG,
        beschrijving: beschrijvingENG,
        imgPath: imgPath
    });
}


function setFirstRouteMarker(id, lat, lon) {
    var marker = new google.maps.Marker({
        draggable: true,
        position: new google.maps.LatLng(lat, lon),
        map: map,
        icon: "https://www.samgoeman.com/img/start_flag-8.png",
        id: id
    });


    marker.addListener('click', function (e) {
        if (deleteBoolean) {
            var id = marker.id;
            var markerRef = firebase.database().ref("route/").child(id);
            markerRef.remove();
            clearRouteMarkers();
            routeMarkers = [];
            drawRoute();
        }
    });

    routeMarkers.push(marker);

    google.maps.event.addListener(marker, 'dragend', function (e) {
        var routeRef = database.ref("route/" + id);

        routeRef.update({
            lat: e.latLng.lat(),
            lon: e.latLng.lng()
        });
        clearRouteMarkers();
        routeMarkers = [];
        drawRoute();

    });

}

function setLastRouteMarker(id, lat, lon) {
    var marker = new google.maps.Marker({
        draggable: true,
        position: new google.maps.LatLng(lat, lon),
        map: map,
        icon: "https://www.samgoeman.com/img/finish_flag-8.png",
        id: id
    });


    marker.addListener('click', function (e) {
        if (deleteBoolean) {
            var id = marker.id;
            var markerRef = firebase.database().ref("route/").child(id);
            markerRef.remove();
            clearRouteMarkers();
            routeMarkers = [];
            drawRoute();
        }
    });

    routeMarkers.push(marker);

    google.maps.event.addListener(marker, 'dragend', function (e) {
        var routeRef = database.ref("route/" + id);

        routeRef.update({
            lat: e.latLng.lat(),
            lon: e.latLng.lng()
        });
        clearRouteMarkers();
        routeMarkers = [];
        drawRoute();

    });

}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.imgAnnotation').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function deleteMarkerById(idNl, idEng) {
    var annotationRef = firebase.database().ref("nl/annotations/").child(idNl);
    annotationRef.remove();
    var annotationRef = firebase.database().ref("eng/annotations/").child(idEng);
    annotationRef.remove();
}

