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
            spouse: { sFirst: '', sLast: '', sID: ID }
        };

        const m = {
            id: ID++,
            first: mFirst[Math.floor(Math.random() * 5)],
            last: last[Math.floor(Math.random() * 7)],
            gender: 'male',
            spouse: { sFirst: '', sLast: '', sID: ID - 2 }
        };
        f.sFirst = m.first;
        f.sLast = m.last;

        m.sFirst = f.first;
        m.sLast = f.last;

        people.push(f);
        people.push(m);

    }
    for (let i = 0; i < 40; i++) {
        const p = people[i];
        console.log(p.id, p.first, p.last, p.gender, ', spouse', p.sFirst, p.sLast, p.id);
    }



}());