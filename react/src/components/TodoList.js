import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    //保证事件可以获取到this.props属性
    this.handleChange = this.handleChange.bind(this);
  }
  //全部标记completed或则!completed
  handleChange(event) {
    this.props.toggleAllCompleteTodo(event.target.checked);
  }
  render() {
    return (
      <div className="main">
        <input 
         className="toggle-all"
         type="checkbox"
         style={{ display: this.props.todos.length === 0 ? 'none' : 'block' }}
         checked={this.props.remainingCount === 0}
         onChange={this.handleChange}
        />
        <ul className="todo-list">
          {this.props.visibleTodos.map((todo, index) =>
            <Todo 
                todo={todo}
                {...this.props}
                key={index}
            />
          )}
        </ul>
      </div>
    );
  }
}
