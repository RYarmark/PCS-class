/* global google */
(function () {
    'use strict';

    const GM = google.maps;
    let search = document.getElementById('search');
    const go = document.getElementById('go');
    const message = document.getElementById('error');
    let map;
    const infoWindow = new GM.InfoWindow();
    go.addEventListener('click', () => loadJson(search.value));
    let markers = [];

    async function loadJson(file) {
        if (file === "") {
            message.innerText = 'Please enter a valid search term';
            message.style.display = "block";
        } else {
            try {
                message.style.display = 'none';
                document.body.style.backgroundImage = "none";
                map = new GM.Map(document.getElementById('map'));
                const response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${file}&maxRows=10&username=rochely&type=json`);
                const results = await response.json();
                if (results.geonames.length === 0) {
                    message.innerText = 'No results found.';
                    message.style.display = "block";
                }
                let latLngs = [];
                for (let i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                results.geonames.forEach(result => {
                    latLngs.push({ lat: result.lat, lng: result.lng });
                    createMarker(result, markers);
                });
                setBounds(latLngs);
            }
            catch (e) {
                document.getElementById('map').style.display = 'none';
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

    function createMarker(place, markers) {
        const marker = new google.maps.Marker({
            position: place,
            map: map,
            title: place.title,
            animation: google.maps.Animation.DROP
        });
        markers.push(marker);
        marker.addListener('click', () => {
            infoWindow.setContent(`<img src=${place.thumbnailImg}></img> ${place.title}:<br>${place.summary}<a href="https://${place.wikipediaUrl}" target = "_blank">more</a>`);
            infoWindow.open(map, marker);
            map.setCenter(place);
            map.setZoom(15);

        });
    }
    //let markers = [];
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER,
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYGON,
          google.maps.drawing.OverlayType.POLYLINE,
          google.maps.drawing.OverlayType.RECTANGLE,
        ],
      },
      markerOptions: {
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      },
      circleOptions: {
        fillColor: "#ffff00",
        fillOpacity: 0.2,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1,
      },
    });
  
    drawingManager.setMap(map);
  
    google.maps.event.addListener(drawingManager, 'overlaycomplete', e => {
      console.log('overlay complete', e);
  
      markers.push({ lat: e.overlay.position.lat(), lng: e.overlay.position.lng() });
  
      localStorage.setItem('markers', JSON.stringify(markers));
    });
  
  
    let oldMarkers = localStorage.getItem('markers');
    if (oldMarkers) {
      oldMarkers = JSON.parse(oldMarkers);
      oldMarkers.forEach(marker => {
        new google.maps.Marker({
          position: marker,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        });
      });
    }


})();