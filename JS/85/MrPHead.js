(function () {
    'use strict';

    const part = $('#pallet li img');
    let offset;
    let parts = [];
    let i = 1;
    let selected;
    let savedGames = [];
    let oldStuff = localStorage.getItem('savedGames');

    if (oldStuff) {
        oldStuff = JSON.parse(oldStuff);
        oldStuff.forEach(game => {
            $('#game').append(`<option value = "${game}">${game}</option>`);
        });
    }
    else {
        $('#firstLoad').css('display', 'block');
    }
    addPart('images/pHead.png', '180', '380', '0', 'potatoHead');

    $('#ok').click(() => $('#firstLoad').css('display', 'none'));

    $('li').click((e) => {
        const catagory = $('.active');
        const clicked = $(e.target);
        if (catagory) {
            catagory.find('.moreParts').slideUp('slow');
            catagory.removeClass('active');
        }
        if (!catagory.is(clicked)) {
            clicked.addClass('active');
            clicked.find('.moreParts').slideDown('slow');
        }
    });

    part.on('mousedown', function (e) {
        const top = `${e.pageY - e.offsetY}px`;
        const left = `${e.pageX - e.offsetX}px`;
        const src = $(this).attr('src');
        addPart(src, top, left, i);
        mouseDown(e);
    });

    function update(elm, data) {
        elm.addEventListener('mouseup', (e) => {
            data.top = e.pageY - e.offsetY;
            data.left = e.pageX - e.offsetX;
            data.index = i;
        });
    }
    $('body').on('mousedown', '.moveable', e => mouseDown(e));


    $('#add').click(() => addPart('images/pHead.png', '180px', '380px', '0', 'potatoHead'));

    $('#save').click(() => {
        $('#game').append(`<option value = "${$('#gameName').val()}">${$('#gameName').val()}</option>`);
        savedGames.push($('#gameName').val());
        localStorage.setItem(`savedGames`, JSON.stringify(savedGames));

        $('.moveable').each(function () {
            let id;
            const top = this.style.top;
            const left = this.style.left;
            if (this.id === 'potatoHead') {
                id = 'potatoHead';
            }
            else {
                id = undefined;
            }
            console.log(top);
            parts.push({ src: $(this).attr('src'), top: top, left: left, index: $(this.zindex), id: id });
        });
        parts.forEach(part => console.log(part));
        if (parts.length !== 0) {
            localStorage.setItem(`${$('#gameName').val()}`, JSON.stringify(parts));
        }
        parts = [];
    });

    $('#game').change(() => {
        loadGame($('#game').val());
    });

    $('#room').change(() => {
        const room = `images/${$('#room').val()}.png`;
        $('body').css('background-image', `url(${room})`);
    });

    $('#reset').click(() => {
        $('.moveable').each(function () { $(this).remove(); });
        addPart('images/pHead.png', '180', '380', '0', 'potatoHead');

    });

    $('#delete').click(() => {
        console.log($(selected));
        if ($(selected.className === 'moveable')) {
            $(selected).remove();
        }
    });

    function mouseDown(e) {
        e.preventDefault();
        offset = { y: e.offsetY, x: e.offsetX, };
        if ($(e.target).attr('id') !== 'potatoHead') {
            $(e.target).css('z-index', `${i++}`);
        }
        document.onmouseup = end;
        document.onmousemove = move;
    }
    function move(e) {
        selected = $(e.target);
        selected.css({ top: e.pageY - offset.y, left: e.pageX - offset.x });
    }
    function end() {
        document.onmouseup = null;
        document.onmousemove = null;
        // selected=null;
    }

    function loadGame(game) {
        $('.moveable').each(function () { this.remove(); });
        let oldStuff = localStorage.getItem(game);

        if (oldStuff) {
            oldStuff = JSON.parse(oldStuff);
            oldStuff.forEach(part => {
                addPart(part.src, part.top, part.left, part.index, part.id);
            });
        }

    }

    function addPart(src, top, left, index, id) {
        const newPart = document.createElement('img');
        newPart.style.position = `absolute`;
        newPart.style.top = top;
        newPart.style.left = left;
        newPart.src = src;
        newPart.className = 'moveable';
        newPart.style.zindex = index;
        newPart.id = id;
        $('body').append(newPart);
        const partData = { src: src, top: top, left: left, index: 1 };
        //  parts.push(partData);
        update(newPart, partData);
    }

}());