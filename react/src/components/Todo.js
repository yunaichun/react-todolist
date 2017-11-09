import React from 'react';

export default class Todo extends React.Component {
  render() {
    return (
      <li className={this.props.completed ? 'completed' : ''}>
        <div className="view">
          <input 
            className="toggle" 
            type="checkbox" 
            readOnly
            checked={this.props.completed}
            onClick={this.props.onClick}
          />
          <label htmlFor={this.props.text}>{this.props.text}</label>
          <button className="destroy" />
        </div>
        <input className="edit" type="text" />
      </li>
    );
  }
}
