(function () {
    'use strict';

    function createForm() {
        $('body').append('<form id = "form"></form');
        $('#form').append('<label>Please check the box. </label');
        $('#form').append('<input id = "checkbox" type = "checkbox"></input');
        $('#form').append('<label id = "nameLabel">Name:</label');
        $('#form').append('<input id = "nameInput" type = "text"></input');
        $('#form').append('<label id = "addressLabel">Address:</label>');
        $('#form').append('<input id = "addressInput"> </input');
        $('body').append('<input id = "submit" type = "submit" value = "submit" disable></input>');
        $('#submit').attr('disabled', true);
        $('label').css('margin', '1em');
        $('input').css('margin', '1em');
        $('input').css('display', 'block');
    }

    function display() {
        $('body').append('<div id = "display"></div>');
        $('#display').css("text-align", "center");
        $('#display').css("border", "3px solid black");
        $('#display').css("padding", "2em");
        $('#display').css("margin", "2em");
        $('#display').hide();
    }

    function onClick() {
        const name = $('#nameInput').val();
        const address = $('#addressInput').val();
        $('#display ').text(function () { return `Hello ${name}, you live at ${address}.`; });
        $('#display').show();
    }


    createForm();
    display();
    $('#submit').click(onClick);


    $('#checkbox').click(function () {
        if ($('#submit').is(':disabled')) {
            $('#submit').removeAttr('disabled');
        } else {
            $('#submit').attr('disabled', true);
        }
    });


}());