(function () {
    'use strict';

    class Person {
        constructor(first, last, age) {
            this.first = first;
            this.last = last;
            this.age = age;
        }
        get age() {
            return this._age;
        }
        set age(age) {
            age = +age;
            if (age < 0 || age > 120) {
                throw new Error('invalid age');
            }
            this._age = age;
        }
    }

    class Student extends Person {
        constructor(first, last, age, grade) {
            super(first, last, age);
            this.grade = grade;
        }
    }

    const myStudents = [];
    myStudents.push(new Student('Jack', 'Smith', '35', '80'));
    myStudents.push(new Student('John', 'Doe', '22', '72'));
    myStudents.push(new Student('Jill', 'Doe', '18', '90'));
    myStudents.push(new Student('John', 'Smith', '10', '85'));

    function printStudents(print1, print2, ...someStudents) {

        someStudents.forEach(/*st*/({ first, last, ...theRest }) => {

            // const{'first':one, print2:two, ...theRest}=st;
            //  console.log(one, two);

            let studentInfo = "";
            if (print1 === 'first') {
                studentInfo += `first: ${first}, `;
                studentInfo += `last: ${last}, `;
            }
            else {
                studentInfo += `last: ${last}, `;
                studentInfo += `first: ${first}, `;
            }
            Object.entries(theRest).forEach(([key, value]) => studentInfo += `${key}: ${value}, `);
            console.log(studentInfo);
        });
    }
    printStudents('first', 'last', ...myStudents);
    console.log('');
    printStudents('last', 'first', ...myStudents);


    /////////////////////////////////////////////////////////
    console.log('');
    console.log('part two');

    const s = new Student('Jack', 'Doe', '20', '78');

    function copyStudent(student) {
        let newSInfo = [];
        const { last, first, ...rest } = student;
        Object.entries(rest).forEach(([key, value]) => newSInfo.push(value));
        const newS = new Student(last, first, ...newSInfo);
        console.log(newS);
    }
    copyStudent(s);

})();