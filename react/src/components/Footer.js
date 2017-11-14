import React from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  //获取剩余条目【调用时候必须加括号，不加括号的事件需要bind(this)】
  getStrItem() {
    if (this.props.remainingCount < 2) {
      return 'item';
    }
    return 'items';
  }
  //渲染顶部组件
  renderFilter(filter, name) {
    return (
      <li>
        <Link
          to={name === 'All' ? '' : name}
          className={filter === this.props.visibilityFilter ? 'selected' : ' '}
          onClick={() => { this.props.setVisibilityFilter(filter); }}
        >
          {name}
        </Link>
      </li>
    );
  }
  render() {
    return (
      <div className="footer" style={{ display: this.props.todos.length === 0 ? 'none' : 'block' }} >
        <span className="todo-count">
          <strong>{this.props.remainingCount} </strong>{this.getStrItem()} left
        </span>
        <ul className="filters">
          {this.renderFilter('SHOW_ALL', 'All')}
          {this.renderFilter('SHOW_COMPLETED', 'Completed')}
          {this.renderFilter('SHOW_ACTIVE', 'Active')}
        </ul>
        <button 
          className="clear-completed"
          style={{ display: this.props.todos.length > this.props.remainingCount ? 'block' : 'none' }}
          onClick={() => this.props.deleteCompletedTodos()}
        >
          Clear completed
        </button>
      </div>
    );
  }
}
