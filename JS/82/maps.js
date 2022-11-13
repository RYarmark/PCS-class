/* global google */
(function () {
    'use strict';

    let search = document.getElementById('search');
    const go = document.getElementById('go');
    const message = document.getElementById('error');
    let map;
    const infoWindow = new google.maps.InfoWindow();
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
                map = new google.maps.Map(document.getElementById('map'));
                const response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${file}&maxRows=10&username=&type=json`);
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
            const bounds = new google.maps.LatLngBounds();
            latLng.forEach(ll => bounds.extend(ll));
            map.fitBounds(bounds);
        }
    }

    function createMarker(place, markers) {
        const latitude = place.lat;
        const longitude = place.lng;
        const marker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: place.title,
            animation: google.maps.Animation.DROP
        });
        markers.push(marker);
        marker.addListener('click', () => {
            infoWindow.setContent(`<img src=${place.thumbnailImg}></img>${place.title}:<br>${place.summary}<a href="https://${place.wikipediaUrl}" target = "_blank">more</a>`);
            infoWindow.open(map, marker);
            map.setCenter({ lat: latitude, lng: longitude });
            map.setZoom(15);

        });
    }

})();