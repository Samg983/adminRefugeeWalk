
var map;
var database = firebase.database();
var annotationNlCount;
var iconBase = 'https://www.samgoeman.com/img/';
var lat, lon;
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
    initMap();

    readAllAnnotationsNl();




    $("#submit").click(function () {
        //alert(annotationNlCount);
        var titel = $("#title").val();
        var beschrijving = $("#beschrijving").val();
        var categorie = $("#categorie").val();

        writeAnnotationToFirebase(categorie, lat, lon, titel, beschrijving);
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
        $('#addMarkerPopUp').popup('toggle');
        lat = e.latLng.lat();
        lon = e.latLng.lng();
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
    marker.addListener('click', toggleBounce);
    google.maps.event.addListener(marker, 'dragend', function (e) {
        setMapOnAll(null);
        console.log(e.latLng.lat());
        console.log(marker.id);
        console.log(marker.titel);
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

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function writeAnnotationToFirebase(categorie, lat, lon, titel, beschrijving) {
    var annotationId = annotationNlCount;
    //alert("annotationid: " + annotationId);
    database.ref('nl/annotations/annotation' + annotationId).set({
        categorie: categorie,
        lat: lat,
        lon: lon,
        titel: titel,
        beschrijving: beschrijving
    });
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

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < allAnnotationsKeys.length; i++) {
        allAnnotationsKeys = Object.keys(allAnnotations);
        var k = allAnnotationsKeys[i];
        allAnnotationsKeys[k].setMap(map);
    }
}

