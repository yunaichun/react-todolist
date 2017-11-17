/**
 * 第一个参数是初始state值【state不能为undefined，默认为[]】
 * 第二个参数是dispatch传入的参数
 * 所以dispatch相当于执行reducer函数
 */
function todos(state = [], action) {
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
    case 'EDIT_TODO': //编辑条目
      {
        const index = state.indexOf(action.todo);
        return [
          ...state.slice(0, index),
          Object.assign({}, state[index], {
            text: action.newText 
          }),
          ...state.slice(index + 1)
        ];
      }
    default://默认返回初始state
      return state;
  }
}

function undoable(reducer) {
  // 以一个空的 action 调用 reducer 来产生初始的 state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  };

  // 返回一个可以执行撤销和重做的新的reducer
  return function (state = initialState, action) {
    const { past, present, future } = state;

    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        };
      case 'REDO':
        const next = future[0];
        const newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        };
      default:
        // 将其他 action 委托给原始的 reducer 处理
        const newPresent = reducer(present, action);
        if (present === newPresent) { //不做此判断初始past为两个空数组
          return state;
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: []
        };
    }
  };
}
//Reducer Enhancers类似combineReducers()，传入reducers，返回新的reducers
//传的参数是一个函数，返回一个函数
export default undoable(todos);
