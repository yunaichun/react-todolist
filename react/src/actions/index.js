/*
 * action 创建函数
 */
export function addTodo(text) { //添加toDo
  return { type: 'ADD_TODO', text };
}
export function toggleCompleteTodo(todo) { //切换已完成条目
  return { type: 'TOGGLE_COMPLETE_TODO', todo };
}
export function toggleAllCompleteTodo() { //全部切换成completed或则!completed
  return { type: 'TOGGLE_ALL_COMPLETE_TODO' };
}


//设置过滤条件：'SHOW_ALL'、'SHOW_COMPLETED'、'Completed'
export function setVisibilityFilter(filter) {
  return { type: 'SET_VISIBILITY_FILTER', filter };
}
