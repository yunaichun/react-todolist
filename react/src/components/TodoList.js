import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    // console.log(toggleAllCompleteTodo());
    return (
      <div className="main">
        <input 
         className="toggle-all"
         type="checkbox" 
        />
        <ul className="todo-list">
          {this.props.visibleTodos.map((todo, index) =>
            <Todo 
                {...todo}
                key={index}
                onClick={() => this.props.toggleCompleteTodo(todo)} 
            />
          )}
        </ul>
      </div>
    );
  }
}
