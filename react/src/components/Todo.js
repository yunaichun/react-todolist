import React from 'react';

export default class Todo extends React.Component {
  //删除todo
  handleClick() {
    this.props.deleteTodo(this.props.todo);
  }
  //切换todo状态completed
  handleChange() {
    this.props.toggleCompleteTodo(this.props.todo);
  }
  render() {
    const { completed, text } = this.props.todo;
    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input 
            className="toggle" 
            type="checkbox" 
            checked={this.props.todo.completed}
            onChange={() => this.handleChange()}
          />
          <label htmlFor={text}>{text}</label>
          <button className="destroy" onClick={() => this.handleClick()} />
        </div>
        <input className="edit" type="text" />
      </li>
    );
  }
}
