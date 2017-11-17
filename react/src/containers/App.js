import React from 'react';
import { connect } from 'react-redux';
//引入常量
import * as actionCreators from '../actions/index';
//添加组件
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

//引入CSS文件
import '../styles/base.less';
import '../styles/index.less';

class App extends React.Component {
  render() {
    // Injected by connect() call:
    //console.log(this.props);
    return (
      <div className="todoapp">
        <AddTodo {...this.props} />
        <TodoList {...this.props} />
        <Footer {...this.props} />
      </div>
    );
  }
}

function selectTodos(todos, filter) {
  switch (filter) {
    case 'SHOW_COMPLETED'://显示已经完成
      return todos.filter(todo => todo.completed);
    case 'SHOW_ACTIVE'://显示未完成
      return todos.filter(todo => !todo.completed);
    default ://默认显示全部
      return todos;
  }
}
function getRemainingCount(todos) {
  const remainingTodo = todos.filter(todo => !todo.completed);
  const remainingCount = remainingTodo.length;
  return remainingCount;
}
// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function mapStateToProps(state, ownProps) {
  //console.log('state', state);
  //console.log('ownProps', ownProps.match.params.filter);
  return {
    todos: state.todos.present,
    //当前显示条目：全部state.todos + 过滤条件【'SHOW_ALL'、'SHOW_COMPLETED'、'Completed'】 
    visibleTodos: selectTodos(state.todos.present, state.visibilityFilter),
    //返回过滤条件：'SHOW_ALL'、'SHOW_COMPLETED'、'Completed'
    visibilityFilter: state.visibilityFilter, 
    //求出剩余条数
    remainingCount: getRemainingCount(state.todos.present)
  };
} 

// 包装 component：注入 dispatch 和 state 到其默认的 connect(mapStateToProps)(App) 中；
export default connect(
  mapStateToProps,
  actionCreators
)(App);
