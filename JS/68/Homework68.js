'use strict';

const acount1 = {
    balance: 0,
    performTransaction: function (amount) {
        this.balance += amount;
    }
};
acount1.performTransaction(50);

const acount2 = {
    balance: 0,
    performTransaction: function (amount) {
        this.balance += amount;
    }
};
acount2.performTransaction(-5);


const acount3 = {
    balance: 0
};

function performTransaction(amount) {
    this.balance += amount;
}

performTransaction.apply(acount3, [45]);

const addFityDollars = performTransaction.bind(acount3, 50);
addFityDollars();

