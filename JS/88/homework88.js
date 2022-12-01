'use strict';

class Person {
    constructor(first, last, age) {
        this.first = first;
        this.last = last;
        if (age < 0 || age > 120) {
            throw new Error('Invalid age.');
        }
        this.age = age;
    }

    toString() {
        let theString = '';
        for (let propety in this) {
            if (typeof (this[propety]) !== 'function') {
                theString += (`${propety}: ${this[propety]} `);
            }
        }
        return theString;
    }
}

class Student extends Person {
    constructor(first, last, age, grade) {
        super(first, last, age);
        this.grade = grade;
    }
}
const p = new Person('Jack', 'Smith', '35');
console.log(p.toString());
const s = new Student('John', 'Doe', '22', '72');
console.log(s.toString());

