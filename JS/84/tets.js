'use strict';
let dragging = false;

$('body').on('mousedown', '.moveable', e => {


    //function move(e){
    dragging = $(e.target);
    console.log(e);
    console.log(e.target);
    offset = { y: e.offsetY, x: e.offsetX, };
})
    .mousemove(e => {
        if (dragging) {
            dragging.css({ top: e.pageY - offset.y, left: e.pageX - offset.x });
        }
    }).mouseup(() => {
        dragging = false;

    });

function drag(element) {
    element.onmousedown = mouseDown;
}
function mouseDown(e) {
    e.preventDefault();

    document.onmouseup = end;
    document.onmousemove = move;
}
function move(e) {
    const part = e.target;
    const top = e.pageY;
    const left = e.pageX;
    part.style.top = (part.offsetTop - top) + 'px';
    part.style.left = (part.offsetLeft - left) + 'px';
}
function end() {
    document.onmouseup = null;
    document.onmousemove = null;
}