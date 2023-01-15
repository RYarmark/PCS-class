import './App.css';
import { Component } from 'react';
import Items from './Items';


export default class App extends Component {
  state = {
    orders: [
      {
        id: 1,
        customer: "Joe",
        address: "555 Main Street New York",
        items: []
      },
      {
        id: 2,
        customer: "Jack",
        address: "123 Main Steet New York",
        items: [{ name: "chocolate", total: 6.45, quantity: 5 }, { name: "pretzels", total: 1.05, quantity: 3 }, { name: "ice cream", total: 5.49, quantity: 1 }]
      }
    ]

  }
  render() {

    const order = this.state.orders.map((o) =>
      <ul key={o.id}>
        <li>Customer: {o.customer}</li>
        <li>Address: {o.address}</li>
        <li>Total: ${getTotal(o)}</li>
        <Items items={o.items} />
      </ul>);

    return (
      <div >
        {order}
      </div>
    );
  }
}

function getTotal(order){
let total = 0.00;
order.items.forEach(i => total+= i.total);
return total
}
