(function () {
    'use strict';

    const load = document.getElementById('load');
    const order = document.getElementById('order');

    load.addEventListener("click", loadJSON);

    async function loadJSON() {
        try {
            const response = await fetch(`${order.value}.json`);
            const results = await response.json();
            //create orders and items
            results.forEach(result => {
                const items = [];
                result.items.forEach(item => items.push(new Item(item.name, (item.total / item.quantity).toFixed(2), item.quantity)));
                const order = new Order(result.customer, result.address, items);
                displayOrder(order);
            });
        }
        catch (e) { }
    }

    function displayOrder(order) {
        const div = document.createElement('div');
        div.id = 'orderDiv';
        div.innerText = `Customer: ${order.customer} \n
        Address: ${order.address} \n
        Total: $${order.orderTotal}\n
        \n` ;

        div.append('Items:');
        order.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.id = 'itemDiv';
            itemDiv.innerText = `\n\nItem: ${item.name}
        \nPrice: $${item.price}
        \nQuantity: ${item.quantity} `;
            div.append(itemDiv);
        });

        document.body.append(div);

    }

    class Item {
        constructor(name, price, quantity) {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
    }

    class Order {
        constructor(customer, address, items) {
            this.customer = customer;
            this.address = address;
            this.items = items;

        }

        // SL - I think this name is a little redundant. Were in Order class, no need to prefix "order" on all order functions
        get orderTotal() {
            let total = 0;
            this.items.forEach(item => {
                total += item.price * item.quantity;
            });

            return total.toFixed(2);
        }
    }


})();

// SL - nice!
// SL - grade 100