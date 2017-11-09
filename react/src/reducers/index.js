import { combineReducers } from 'redux';
import visibilityFilter from './visibilityFilter';
import todos from './todos';

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;

// 等价写法：通过mapStateToProps函数可以修改key值
// export default function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   }
// }
