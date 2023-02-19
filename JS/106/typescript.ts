function birthday(age: number) {
    return ++age;
}

let myAge: number;
myAge = 10;

console.log(birthday(myAge));


interface Student {
    first: string;
    age: number;
    GPA: number;
}

const jack = {
    first: 'Jack',
    age: 12,
    GPA: 3.2
}

function reportCard(student: Student) {
    return (`Name: ${student.first} Age: ${student.age} GPA: ${student.GPA}`)
}

console.log(reportCard(jack));

class Vehicle {
    constructor(public make: string, public color: string, public seats: number) {

    }
}
const myCar = new Vehicle('Lexus', 'silver', 5);
console.log(myCar);