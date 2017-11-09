/*
 * action 创建函数
 */
export function addTodo(text) { //添加toDo
  return { type: 'ADD_TODO', text };
}
export function toggleCompleteTodo(todo) { //切换状态
  return { type: 'TOGGLE_COMPLETE_TODO', todo };
}
export function toggleAllCompleteTodo(checked) { //切换全部状态
  return { type: 'TOGGLE_ALL_COMPLETE_TODO', checked };
}
export function deleteTodo(todo) { //删除条目
  return { type: 'DELETE_TODO', todo };
}
export function deleteCompletedTodos() { //删除全部条目
  return { type: 'DELETE_COMPLETED_TODO' };
}
export function editTodo(todo, newText) { //编辑条目
  return { type: 'EDIT_TODO', todo, newText };
}


//设置过滤条件：'SHOW_ALL'、'SHOW_COMPLETED'、'Completed'【外部直接调用此方法传入一个参数即可】
export function setVisibilityFilter(filter) {
  return { type: 'SET_VISIBILITY_FILTER', filter };
}
