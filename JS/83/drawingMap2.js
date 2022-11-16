/* global google */
(function () {
    'use strict';

    const startPosition = { lat: 46.231870, lng: -9.376878 };
    const myShapes = [];
    const GM = google.maps;
    let search = document.getElementById('search');
    const go = document.getElementById('go');
    const message = document.getElementById('error');
    const infoWindow = new GM.InfoWindow();
    go.addEventListener('click', () => loadJson(search.value));
    document.getElementById('clear').addEventListener('click', () => {
        for (let i = 0; i < myShapes.length; i++) {
            myShapes[i].setMap(null);
        }
        oldDrawings = [];
        localStorage.clear();
    });
    const map = new GM.Map(
        document.getElementById("map"),
        {
            zoom: 3,
            center: startPosition,
        }
    );

    async function loadJson(file) {
        if (file === "") {
            message.innerText = 'Please enter a valid search term';
            message.style.display = "block";
        } else {
            try {
                message.style.display = 'none';
                document.body.style.backgroundImage = "none";
                const response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${file}&maxRows=10&username=rochely&type=json`);
                const results = await response.json();
                if (results.geonames.length === 0) {
                    message.innerText = 'No results found.';
                    message.style.display = "block";
                }
                let latLngs = [];
                results.geonames.forEach(result => {
                    latLngs.push({ lat: result.lat, lng: result.lng });
                    createMarker(result);
                    oldDrawings.push({ type: 'searchMarker', info: result });
                });
                setBounds(latLngs);
            }
            catch (e) {
                document.getElementById('map').style.display = 'none';
                message.innerText = 'Error';
                message.style.display = 'block';
            }
        }
    }

    function setBounds(latLng) {
        if (latLng.length !== 0) {
            const bounds = new GM.LatLngBounds();
            latLng.forEach(ll => bounds.extend(ll));
            map.fitBounds(bounds);
        }
    }
    function createMarker(place) {
        const marker = new GM.Marker({
            position: place,
            map: map,
            title: place.title,
            animation: GM.Animation.DROP
        });
        marker.addListener('click', () => {
            infoWindow.setContent(`<img src=${place.thumbnailImg} alt=""></img> ${place.title}:<br>${place.summary}<a href="https://${place.wikipediaUrl}" target = "_blank">more</a>`);
            infoWindow.open(map, marker);
            map.setCenter(place);
            map.setZoom(12);
        });
        myShapes.push(marker);
    }

    const drawingManager = new GM.drawing.DrawingManager({
        drawingMode: GM.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: GM.ControlPosition.TOP_CENTER,
            drawingModes: [
                GM.drawing.OverlayType.MARKER,
                GM.drawing.OverlayType.CIRCLE,
                GM.drawing.OverlayType.RECTANGLE,
            ],
        },
        markerOptions: {
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        },
        circleOptions: {
            fillColor: "#0001ff",
            fillOpacity: 0.2,
            strokeWeight: 3,
            zIndex: 1,
        },
    });
    drawingManager.setMap(map);

    let oldDrawings = [];

    GM.event.addListener(drawingManager, 'markercomplete', marker => {
        myShapes.push(marker);
        const markerLoc = marker.getPosition();
        oldDrawings.push({ type: 'marker', location: markerLoc });
    });
    GM.event.addListener(drawingManager, 'circlecomplete', circle => {
        myShapes.push(circle);
        const center = circle.getCenter();
        const radius = circle.getRadius();
        oldDrawings.push({ type: 'circle', center: center, radius: radius });
    });

    GM.event.addListener(drawingManager, "rectanglecomplete", rectangle => {
        const bounds = rectangle.getBounds();
        oldDrawings.push({ type: 'rectangle', bounds: bounds });
    });


    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        if (oldDrawings.length !== 0) {
            localStorage.setItem('markers', JSON.stringify(oldDrawings));
        }
    });
    let oldStuff = localStorage.getItem('markers');

    if (oldStuff) {
        document.getElementById('resume').style.display = 'block';
        go.disabled = true;
    }
    const yes = document.getElementById('yes');
    const no = document.getElementById('no');
    no.addEventListener('click', () => {
        hide();
        localStorage.clear();
    });
    yes.addEventListener('click', () => {
        hide();
        oldStuff = JSON.parse(oldStuff); {
            oldStuff.forEach(drawing => {
                oldDrawings.push(drawing);
                if (drawing.type === 'marker') {
                    drawMarkers(drawing);
                }
                else if (drawing.type === 'circle') {
                    drawCircle(drawing);
                }
                else if (drawing.type === 'rectangle') {
                    drawRect(drawing);
                }
                else if (drawing.type === 'searchMarker') {
                    createMarker(drawing.info);
                }
            });
        }
    });

    function drawMarkers(oldMarker) {
        const marker = new google.maps.Marker({
            map: map,
            position: oldMarker.location,
            animation: GM.Animation.DROP,
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        });
        myShapes.push(marker);
    }
    function drawCircle(oldCircle) {
        const circle = new google.maps.Circle({
            fillColor: "#0001ff",
            fillOpacity: 0.2,
            strokeWeight: 3,
            zIndex: 1,
            map: map,
            center: oldCircle.center,
            radius: oldCircle.radius
        });
        myShapes.push(circle);
    }
    function drawRect(oldRect) {
        const rectangle = new google.maps.Rectangle({
            map: map,
            bounds: oldRect.bounds
        });
        myShapes.push(rectangle);
    }
    function hide() {
        document.getElementById('resume').style.display = 'none';
        go.disabled = false;
    }
}());
