import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    //保证事件可以获取到this.props属性
    this.handleClick = this.handleClick.bind(this);
  }
  //获取剩余条目【调用时候必须加括号，不加括号的事件需要bind(this)】
  getStrItem() {
    if (this.props.remainingCount < 2) {
      return 'item';
    }
    return 'items';
  }
  //点击事件
  handleClick(e) {
    e.preventDefault();
    this.props.onFilterChange(e.target.name);
  }
  //渲染顶部组件
  renderFilter(filter, name) {
    return (
      <li>
        <a 
          href='/' 
          name={filter}
          className={filter === this.props.filter ? 'selected' : ' '}
          onClick={this.handleClick}
        >
        {name}
        </a>
      </li>
    );
  }
  render() {
    return (
      <div className="footer">
        <span className="todo-count">
          <strong>{this.props.remainingCount} </strong>{this.getStrItem()} left
        </span>
        <ul className="filters">
          {this.renderFilter('SHOW_ALL', 'All')}
          {this.renderFilter('SHOW_COMPLETED', 'Completed')}
          {this.renderFilter('SHOW_ACTIVE', 'Active')}
        </ul>
      </div>
    );
  }
}
