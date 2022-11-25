'use strict';


function Vehicle(color) {
    this.color = color;
}

Vehicle.prototype.go = function (speed) {
    this.speed = speed;
    console.log('vehicle traveling at', speed);
};

Vehicle.prototype.print = function () {
    console.log(this.color, this.speed);
};

function Plane(color) {
    Vehicle.call(this, color);
}

Plane.prototype = Object.create(Vehicle.prototype);

Plane.prototype.go = function (speed) {
    this.speed = speed;
    console.log('plane flying at', speed);
};

const myCar = new Vehicle('blue');
const myJet = new Plane('green');

myCar.go('50 mph');
myJet.go('1500 mph');

myCar.print();
myJet.print();