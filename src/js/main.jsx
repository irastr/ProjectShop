import React from 'react';
import ReactDOM from 'react-dom';

let Counter = React.createClass({
  incrementCount: function(){
    this.setState({
      count: this.state.count + 1
    });
  },
  decrementCount: function(){
    this.setState({
      count: this.state.count - 1
    });
  },
  getInitialState: function(){
     return {
       count: 0
     }
  },
  render(){
    return (
      <div className="counter">
        <h1 className='count'>{this.state.count}</h1>
        <button className="btn" onClick={this.decrementCount}>-</button>
        <button className="btn" onClick={this.incrementCount}>+</button>
      </div>
    );
  }
});

React.render(
<Counter />,
  document.getElementById('app')
);
