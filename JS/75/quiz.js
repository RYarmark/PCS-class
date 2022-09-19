(function () {
    'use strict';

    const fFirst = ['Sarah', 'Rivka', 'Rochel', 'Leah', 'Dina'];
    const mFirst = ['Avrahm', 'Yitzchok', 'Yaakov', 'Moshe', 'Ahron'];
    const last = ['Goldstein', 'Berger', 'Friedman', 'Schwartz', 'Miller', 'Kaplan', 'Cohen'];
    let people = [];
    let ID = 0;

    for (let i = 0; i < 20; i++) {
        const f = {
            id: ID++,
            first: fFirst[Math.floor(Math.random() * 5)],
            last: last[Math.floor(Math.random() * 7)],
            gender: 'female',
            spouce: people[ID]
        };

        const m = {
            id: ID++,
            first: mFirst[Math.floor(Math.random() * 5)],
            last: last[Math.floor(Math.random() * 7)],
            gender: 'male',
            spouce: people[ID - 2]
        };

        people.push(f);
        people.push(m);

    }
    for (let i = 0; i < 40; i++) {
        console.log(people[i].id, people[i].first, people[i].last, people[i].gender);
    }



}());