/**
 * 第一个参数是初始state值【state不能为undefined，默认为[]】
 * 第二个参数是dispatch传入的参数
 * 所以dispatch相当于执行reducer函数
 */
export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO': //添加条目
      return [
        ...state,
        {
          text: action.text, 
          completed: false 
        }
      ];
    case 'TOGGLE_COMPLETE_TODO': //切换状态
      {
        const index = state.indexOf(action.todo);
        return [
          ...state.slice(0, index),
          Object.assign({}, state[index], {
            completed: !action.todo.completed 
          }),
          ...state.slice(index + 1)
        ];
      }
    case 'TOGGLE_ALL_COMPLETE_TODO': //切换全部状态
      {
        const newState = [];
        for (let i = 0; i < state.length; i++) {
          newState.push(
            Object.assign({}, state[i], {
              completed: !!action.checked 
            })
          );
        } 
        return newState;
      }
    case 'DELETE_TODO': //删除条目
      {
        const index = state.indexOf(action.todo);
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }
    case 'DELETE_COMPLETED_TODO': //删除完成条目
      {
        const newState = [];
        for (let i = 0; i < state.length; i++) {
          if (!state[i].completed) {
            newState.push(state[i]);
          }
        } 
        return newState;
      }
    default://默认返回初始state
      return state;
  }
};
