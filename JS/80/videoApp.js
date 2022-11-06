(function () {
    'use strict';

    $('body').css("text-align", 'center');
    $('body').append('<h1 id="header">Video Player<h1>');
    $('body').append('<h2>Todays Videos</h2>');

    async function loadList() {
        try {
            const videos = await loadJson('videoList.json');
            videos.forEach(video => {
                $('body').append('<div id=videoDiv></div>');
                $('#videoDiv').append(`<img class = "image"   id = ${video.url} src = ${video.image}></img>`);
                $('#videoDiv').append(`<span class = "title"  id = ${video.url}>${video.title}</span>`);
            });
            const title = $('.title');
            const image = $('.image');
            title.css('display', 'block');
            title.css('font-weight', 'bold');
            $(image).click((event) => playVideo(event.target.id));
            $(title).click((event) => console.log(event.target.id));

        }
        catch (e) {
            $('body').append("<div>We're sorry, we encountered an error and cannot play videos now. Please try back later.</div>");
        }
    }

    async function playVideo(url) {
        $('#videoDiv').hide();
        $('body').append(`<video id = "video" controls> <source src = ${url}></video>`);
    }

    async function loadJson(file) {
        const response = await fetch(file);
        const results = await response.json();
        return results;
    }

    loadList();
}());