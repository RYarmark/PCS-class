(function () {
    'use strict';

    $('body').append('<label>Please enter the file you would like to load</label');
    $('body').append('<input id = "file"></input>');
    $('body').append('<button id = "load">load file</button>');
    $('input').css('margin', '1em');

    $('body').append('<img id = "loading" src="loading.png" alt="Loading...">');
    $('#loading').css('display', 'block');
    $('#loading').css('margin-left', 'auto');
    $('#loading').css('margin-right', 'auto');
    $('#loading').hide();

    function loadFile() {
        $('#loading').show();
        const file = $('#file').val();
        fetch(file)
            .then(response => {
                if (response.status > 399) {
                    throw new Error(response.status);
                }
                else if (file === "") {
                    $('#loading').hide();
                    $('#displayFile').text('Please enter a valid file name.');
                }
                else {
                    return response.text();
                }
            })

            .then(data => {
                $('#displayFile').css('color', 'black');
                setTimeout(() => { $('#loading').hide(); $('#displayFile').text(function () { return data; }); }, 1500);
            })
            .catch(e => {
                $('#displayFile').css('color', 'red');
                $('#displayFile').text(function () {
                    $('#loading').hide();
                    return `Error! ${e}. Please choose a different file to load.`;
                });
            });

    }


    function displayFile() {
        $('body').append('<div id = "displayFile"></div>');
        $('#displayFile').css("text-align", "center");
        $('#displayFile').css("padding", "2em");
        $('#displayFile').css("margin", "2em");
    }

    displayFile();
    $('#load').click(loadFile);


}());