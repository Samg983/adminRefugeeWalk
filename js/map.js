/* Verwijderen van punten op een polyline https://duncan99.wordpress.com/2015/10/16/google-maps-editable-polylines/ */

var map;
var database = firebase.database();
var storage = firebase.app().storage();
var annotationNlCount;
var iconBase = 'https://www.samgoeman.com/img/';
var lat, lon;
var file;

var addBoolean = false;
var drawBoolean = false;
var deleteBoolean = false;

var route;

var path;

var polylines = [];

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


    initMap();

    readAllAnnotationsNl();
    drawRoute();

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            console.log("esc");
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
    });

    $("#submit").click(function (e) {
        //alert(annotationNlCount);
        var titel = $("#title").val();
        var beschrijving = $("#beschrijving").val();
        var categorie = $("#categorie").val();

        var storageRef =  storage.ref("tales/" + file.name);
        var task = storageRef.put(file);

        writeAnnotationToFirebase(categorie, lat, lon, titel, beschrijving);

        $('#addMarkerPopUp').popup({
            closeelement: true
        });

    });
});


function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
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
        center: {lat: 50.977878, lng: 5.628322},
        zoom: 11,
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

function placeMarker(position, categorie, map, id, beschrijving, titel) {
    var marker = new google.maps.Marker({
        draggable: true,
        position: position,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: icons[categorie].icon,
        id: id,
        beschrijving: beschrijving,
        categorie: categorie,
        titel: titel
    });

    google.maps.event.addListener(marker, 'dragend', function (e) {
        var annotationRef = database.ref("nl/annotations/" + id);

        annotationRef.update({
            beschrijving: marker.beschrijving,
            categorie: marker.categorie,
            lat: e.latLng.lat(),
            lon: e.latLng.lng(),
            titel: marker.titel
        });
    });
    map.panTo(position);
}



function writeAnnotationToFirebase(categorie, lat, lon, titel, beschrijving) {
    database.ref('nl/annotations/').push({
        categorie: categorie,
        lat: lat,
        lon: lon,
        titel: titel,
        beschrijving: beschrijving
    });

    $('#addMarkerPopUp').popup('toggle');


}

var allAnnotations;
function readAllAnnotationsNl() {
    var annotationsRefNl = firebase.database().ref('nl/annotations');
    annotationsRefNl.on('value', function (snapshot) {
        allAnnotations = snapshot.val();
        allAnnotationsKeys = Object.keys(allAnnotations);
        annotationNlCount = allAnnotationsKeys.length;
        for (var i = 0; i < allAnnotationsKeys.length; i++) {
            var k = allAnnotationsKeys[i];

            var categorie = allAnnotations[k].categorie;
            var lat = allAnnotations[k].lat;
            var lon = allAnnotations[k].lon;
            var titel = allAnnotations[k].titel;
            var beschrijving = allAnnotations[k].beschrijving;

            var myLatlng = new google.maps.LatLng(lat, lon);
            placeMarker(myLatlng, categorie, map, k, beschrijving, titel);
        }
    });
}



function drawRoute() {
    var routeRef = firebase.database().ref('route/');
    routeRef.on('value', function (snapshot) {
        var allPoints = snapshot.val();
        var allPointsKeys = Object.keys(allPoints);
        route.clear();
        for (var i = 0; i < allPointsKeys.length; i++) {
            var k = allPointsKeys[i];

            var lat = allPoints[k].lat;
            var lon = allPoints[k].lon;

            route.push(new google.maps.LatLng(lat, lon));

        }

        google.maps.event.addListener(route, "insert_at", function (vertex) {
            //console.log(vertex);
        });

        google.maps.event.addListener(route, "set_at", function (vertex) {
            console.log(vertex);
        });


        updateCoords(route);

        var path = new google.maps.Polyline({
            path: route,
            geodesic: true,
            editable: true,
            strokeColor: "#00b6b2",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: map
        });

        path.addListener('click', function (polyMouseEvent) {
            if (deleteBoolean) {
                for (var i = 0; i < polylines.length; i++) {
                    if (google.maps.geometry.poly.isLocationOnEdge(polyMouseEvent.latLng, polylines[i], 0.0001)) {
                        route.removeAt(i);
                        removePointFromFirebase(polyMouseEvent.latLng);
                    }
                }
            }
            /**/
        });

    });
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

function updateCoords(path) {
    path.forEach(function (element, index) {
        if (index > 0) {
            polyline = new google.maps.Polyline({
                path: [
                    point,
                    element
                ],
                map: map,
                visible: false,
                geodesic: true
            });

            polylines.push(polyline);
        }
        point = element;
    });
}

function removePointFromFirebase(latLng) {
    console.log(latLng.lat());
    var routeRef = firebase.database().ref('route/');
    routeRef.on('value', function (snapshot) {
        var allPoints = snapshot.val();
        var allPointsKeys = Object.keys(allPoints);
        
        for (var i = 0; i < allPointsKeys.length; i++) {
            var k = allPointsKeys[i];

            var lat = allPoints[k].lat;
            var lon = allPoints[k].lon;

            if(latLng.lat() == lat && latLng.lng() == lon){
                firebase.database().ref("route").child(k).remove();
            }
            

        }
    });
}

