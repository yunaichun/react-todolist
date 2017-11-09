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
          text: action.text, //条目名称
          completed: false //默认未完成
        }
      ];
    case 'TOGGLE_COMPLETE_TODO': //切换已完成条目
      {
        const index = state.indexOf(action.todo);
        return [
          ...state.slice(0, index),
          Object.assign({}, state[index], {
            completed: !action.todo.completed //将action.index条目标记已完成
          }),
          ...state.slice(index + 1)
        ];
      }
    case 'TOGGLE_ALL_COMPLETE_TODO': //添加条目
      return [
        ...state,
        {
          text: action.text, //条目名称
          completed: false //默认未完成
        }
      ];
    default://默认返回初始state
      return state;
  }
};
