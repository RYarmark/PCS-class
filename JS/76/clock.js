(function () {
    'use strict';



    const clock = document.getElementById('face');


    function getTime() {
        let now = new Date();
        let hour = now.getHours(),
            minute = now.getMinutes(),
            second = now.getSeconds();
        return {
            hour: hour,
            minute: minute,
            second: second
        };
    }

    function makeHand(width, hight, id) {
        const hand = document.createElement('div');
        hand.style.position = 'absolute';
        hand.style.backgroundColor = "darkblue";
        hand.style.height = `${hight}`;
        hand.style.width = `${width}`;
        hand.style.bottom = '175px';
        hand.style.left = '175px';
        hand.style.transformOrigin = 'bottom center';
        hand.id = id;
        switch (id) {
            case 'hourHand':
                hand.style.transform = `rotate(${getTime().hour * 30 + getTime().minute * 0.5}deg)`;
                break;
            case 'minuteHand':
                hand.style.transform = `rotate(${getTime().minute * 6}deg)`;
                break;
            case 'secondHand':
                hand.style.transform = `rotate(${getTime().second * 6}deg)`;
                break;
        }
        clock.appendChild(hand);
    }

    makeHand('7px', '85px', 'hourHand');
    makeHand('7px', '115px', 'minuteHand');
    makeHand('2px', '100px', 'secondHand');

    function ampm() {
        const ampm = document.createElement('div');
        ampm.style.color = 'darkblue';
        ampm.style.fontSize = 'large';
        ampm.style.fontWeight = 'bold';
        ampm.style.position = 'absolute';
        ampm.style.top = '25%';
        ampm.style.left = '47%';
        if (getTime().hour > 11) {
            ampm.innerText = 'PM';
        }
        else {
            ampm.innerText = 'AM';
        }
        clock.appendChild(ampm);
    }

    function moveHand(element, angle) {
        const hand = document.getElementById(element);
        hand.style.transform = `rotate(${angle})`;
    }

    ampm();
    window.setInterval(() => { moveHand('hourHand', ((getTime().hour * 30 + getTime().minute * 0.5) + 'deg')); }, 1000);
    window.setInterval(() => { moveHand('minuteHand', ((getTime().minute * 6) + 'deg')); }, 1000);
    window.setInterval(() => { moveHand('secondHand', ((getTime().second * 6) + 'deg')); }, 1000);


}());