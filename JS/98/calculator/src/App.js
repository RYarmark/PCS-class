import { Component } from 'react';
import './App.css';

export default class App extends Component {

  state = { total: '', operator: '', display: '' };
  setCurrent = e => {
    const num = e.target.value;
    this.setState({ current: num }, () => this.setState({ display: `${this.state.total} ${this.state.operator} ${this.state.current}` }));

  }

  setOperator = e => {
    this.setState({ total: this.state.current, operator: e.target.value }, () => this.setState({ display: `${this.state.current} ${this.state.operator}` }));


  }
  calculate = () => {
    const { current, total, operator, results } = this.state;

    if (total !== '') {
      this.math(Number(total), Number(current), operator)
    }
    else {
      this.math(Number(results), Number(current), operator)
    }

  }

  math(num, num2, operator) {
    if (operator === '+') {
      this.setState({ results: num + num2 }, () => this.setState({ current: this.state.results, display: 'results: ' + this.state.results }));
    }
    else if (operator === '-') {
      this.setState({ results: num - num2 }, () => this.setState({ current: this.state.results, display: 'results: ' + this.state.results }));
    }
    else if (operator === '*') {
      this.setState({ results: num * num2 }, () => this.setState({ current: this.state.results, display: 'results: ' + this.state.results }));
    }
    else {
      this.setState({ results: num / num2 }, () => this.setState({ current: this.state.results, display: 'results: ' + this.state.results }));
    }

    this.setState({ total: '', operator: '' });
  }

  render() {

    return (
      <div>
        <input onBlur={this.setCurrent} ></input>
        <button value='+' onBlur={this.setOperator}>+</button>
        <button value='-' onBlur={this.setOperator}>-</button>
        <button value='*' onBlur={this.setOperator}>x</button>
        <button value='/' onBlur={this.setOperator}>{String.fromCharCode(247)}</button>
        <button value='=' onBlur={this.calculate}>=</button>
        <span>{this.state.display}</span>

      </div >
    );
  }
}


