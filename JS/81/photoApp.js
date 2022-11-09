(function () {
    'use strict';

    const body = $('body');


    body.css('text-align', 'center');

    body.append('<header id = "header"></header>');
    $('#header').append('<div id = "title">Photo Source</div>');
    $('#header').append('<select  id = "category"><option value ="" disabled selected hidden>Categories</option><option value = "Flowers">Flowers</option><option value = "Music">Music</option><option value = "Vehicles">Vehicles</option></select>');
    $('#header').append('<input id = "search" type = "text" placeholder = "Search photos">');
    $('#header').append('<button id = "submit" type = "submit">Submit</button>');
    $('#header').append('<button id = "all">Brows all photo</button>');
    body.append('<div id = "photoDisplay"><div>');

    $('#title').css('font-size', '3.5em');
    $('#title').css('font-weight', 'bold');
    $('#title').css('padding', '10px');
    $('#header').css("background-color", '#000066');
    $('#header').css("color", 'white');
    $('#header').css("padding", '20px');
    $('#header').css("margin", '0px');
    $('#category').css('margin', '10px');
    $('#all').css('margin', '10px');

    $('#submit').click(() => {
        loadPhotos($('#search').val());
        $('#photoDisplay').append(`<h1>${$('#search').val()}</h1>`);
    });
    $('#category').change(() => {
        loadPhotos($('#category').val());
        $('#photoDisplay').append(`<h1>${$('#category').val()}</h1>`);
    });
    $('#all').click(() => {
        loadPhotos('flowers');
        loadPhotos('music');
        loadPhotos('vehicles');
        $('#photoDisplay').append("<h1>All Photos</h1>");
    });

    async function loadPhotos(search) {
        $('#photoDisplay').empty();
        try {
            const response = await fetch(`${search.toLowerCase()}.json`);
            const results = await response.json();
            const photos = results;
            photos.forEach(photo => {
                $('#photoDisplay').append(`<div class = "photoDiv" id = "photoDiv"><img class = "image" src = ${photo.image}></img><span class = "caption">${photo.caption}</span></div>`);
            });
            $('.caption').css('display', 'block');
            $('.caption').css('margin-bottom', '20px');

            mediaQuery(x);
        }
        catch (e) {
            $('#photoDisplay').empty();
            $("#photoDisplay").append(`<h3>We're sorry, we do not have any photos of ${$('#search').val()}.</h3>`);
            $("h3").css('grid-column-start', '1');
            $("h3").css('grid-column-end', '4');
        }
    }

    const x = window.matchMedia("(max-width: 700px)");
    $(window).resize(() => mediaQuery(x));

    function mediaQuery(x) {
        if (x.matches) {
            $('#photoDisplay').css('display', 'block');
        }
        else {
            $('#photoDisplay').css('display', 'grid');
            $('#photoDisplay').css('grid-template-columns', '1fr 1fr 1fr');
            $("h1").css('grid-column-start', '1');
            $("h1").css('grid-column-end', '4');
        }
    }

})();