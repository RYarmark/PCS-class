(function () {
    'use strict';

    const add = $('#add');
    const save = $('#save');
    const room = $('#room');
    const part = $('#pallet li img');
    let offset;
    let parts = [];
    let i = 1;
    let oldStuff = localStorage.getItem('saved');
    if (oldStuff) {
        oldStuff = JSON.parse(oldStuff);
        oldStuff.forEach(part => {
            addPart(part.src, part.top, part.left, part.z);
        });
    }

    else {
        $('#firstLoad').css('display', 'block');
        addPart('images/pHead.png', '180', '380', `${i++}`);
    }

    part.on('mousedown', function (e) {
        const top = e.pageY - e.offsetY;
        const left = e.pageX - e.offsetX;
        addPart(this.src, top, left, i);
        mouseDown(e);
    });

    function update(elm, data) {
        elm.addEventListener('mouseup', (e) => {
            data.top = e.pageY - e.offsetY;
            data.left = e.pageX - e.offsetX;
            data.index = i - 1;
        });
    }
    $('body').on('mousedown', '.moveable', e => mouseDown(e));

    function mouseDown(e) {
        e.preventDefault();
        offset = { y: e.offsetY, x: e.offsetX, };
        $(e.target).css('z-index', `${i++}`);

        document.onmouseup = end;
        document.onmousemove = move;
    }
    function move(e) {
        const part = $(e.target);
        part.css({ top: e.pageY - offset.y, left: e.pageX - offset.x });
    }
    function end() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    add.click(() => addPart('images/pHead.png', '180', '380', `${i++}`));
    room.change(() => {
        const src = `url("${room.val()}")`;
        $('body').css('background-img', src);
    });

    save.click(() => {
        if (parts.length !== 0) {
            localStorage.setItem('saved', JSON.stringify(parts));
        }
    });
    $('#room').change(() => {
        const room = `images/${$('#room').val()}.png`;
        $('body').css('background-image', `url(${room})`);
    });
    $('#reset').click(() => {
        localStorage.clear();
        location.reload();
    });
    $('#ok').click(() => $('#firstLoad').css('display', 'none'));
    function addPart(src, top, left, index) {
        const newPart = document.createElement('img');
        newPart.style.position = `absolute`;
        newPart.style.top = `${top}px`;
        newPart.style.left = `${left}px`;
        newPart.src = src;
        newPart.className = 'moveable';
        newPart.style.zindex = index;
        $('body').append(newPart);
        const partData = { src: src, top: top, left: left, index: 1 };
        parts.push(partData);
        update(newPart, partData);
    }

}());