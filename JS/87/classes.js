'use strict';

class Vehicle {

    constructor(color) {
        this.color = color;
        this.speed = '0 mph';
    }
    print() {
        console.log(this.color, this.speed);
    }
    go(speed) {
        this.speed = speed;
        console.log(`vehicle driving at ${speed}`);
    }

}

class Plane extends Vehicle {
    constructor(color) {
        super(color);
    }
    go(speed) {
        this.speed = speed;
        console.log(`plane flying at ${speed}`);
    }
}

const myCar = new Vehicle('green');
myCar.print();
myCar.go('40 mph');

const myPlane = new Plane('purple');
myPlane.print();
myPlane.go('5000 mph');

myCar.go('75 mph');
myCar.print();

const plane2 = new Plane('red');
plane2.print();
