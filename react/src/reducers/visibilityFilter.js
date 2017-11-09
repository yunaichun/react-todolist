/**
 * 第一个参数是初始state值【state不能为undefined，默认设为'SHOW_ALL'】
 * 第二个参数是dispatch传入的参数
 * 所以dispatch相当于执行reducer函数
 */
export default(state = 'SHOW_ALL', action) => {
	switch (action.type) {
		//切换显示条目。结果显示为action.filter。
		//其值为'SHOW_ALL'、'SHOW_COMPLETED'、'Completed'
		case 'SET_VISIBILITY_FILTER': 
			return action.filter;
		default: //默认返回'SHOW_ALL'
			return state;
	}
};
