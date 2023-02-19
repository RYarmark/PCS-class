function birthday(age) {
    return ++age;
}
var myAge;
myAge = 10;
console.log(birthday(myAge));
var jack = {
    first: 'Jack',
    age: 12,
    GPA: 3.2
};
function reportCard(student) {
    return ("Name: ".concat(student.first, " Age: ").concat(student.age, " GPA: ").concat(student.GPA));
}
console.log(reportCard(jack));
var Vehicle = /** @class */ (function () {
    function Vehicle(make, color, seats) {
        this.make = make;
        this.color = color;
        this.seats = seats;
    }
    return Vehicle;
}());
var myCar = new Vehicle('Lexus', 'silver', 5);
console.log(myCar);
