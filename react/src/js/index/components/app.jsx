/**
 * [TodoApp 渲染函数，只要状态改变就会触发render()函数]
 */
var app = app || {};

(function () {
	'use strict';

	app.ALL_TODOS = 'all';
	app.ACTIVE_TODOS = 'active';
	app.COMPLETED_TODOS = 'completed';
	//底部组件
	var TodoFooter = app.TodoFooter;
	//列表组件
	var TodoItem = app.TodoItem;

	var ENTER_KEY = 13;

	var TodoApp = React.createClass({
		/**
		 * [getInitialState 初始状态：nowShowing，editing，newTodo]
		 * @return {[object]} [description]
		 */
		getInitialState: function () {
			return {
				nowShowing: app.ALL_TODOS,
				editing: null,
				newTodo: ''
			};
		},
		/**
		 * [componentDidMount 组件初始化操作]
		 * @return {[type]} [description]
		 */
		componentDidMount: function () {
			var hash=location.hash.split("#")[1];
			if(hash===undefined||hash=="/"){
				this.setState({nowShowing: app.ALL_TODOS})
			}
			if(hash=="/active"){
				this.setState({nowShowing: app.ACTIVE_TODOS})
			}
			if(hash=="/completed"){
				this.setState({nowShowing: app.COMPLETED_TODOS})
			}
			/*var setState = this.setState;
			var router = Router({
				'/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
				'/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
				'/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
			});
			router.init('/');*/
		},
		/**
		 * [handleChange 输入框有变化就会设置状态]
		 * @param  {[event]} event [输入框的值通过event.target.value获取]
		 */
		handleChange: function (event) {
			this.setState({newTodo: event.target.value});
		},

		/**
		 * [handleNewTodoKeyDown 回车添加一个todo条目]
		 * @param  {[event]} event [description]
		 */
		handleNewTodoKeyDown: function (event) {
			if (event.keyCode !== ENTER_KEY) {
				return;
			}
			event.preventDefault();
			var val = this.state.newTodo.trim();
			if (val) {
				this.props.model.addTodo(val);
				this.setState({newTodo: ''});
			}
		},
		/**
		 * [save 修改一个todo条目的title：失去焦点事件+Enter事件]
		 * @param  {[object]} todoToSave [需要修改的todo条目]
		 * @param  {[string]} text       [修改后的标题]
		 */
		save: function (todoToSave, text) {
			this.props.model.save(todoToSave, text);
			this.setState({editing: null});
		},

		/**
		 * [toggle toggle一个todo条目的completed状态]
		 * @param  {[object]} todoToToggle [传入一个需要改变状态的todo条目]
		 */
		toggle: function (todoToToggle) {
			this.props.model.toggle(todoToToggle);
		},
		/**
		 * [toggleAll toggle所有todo条目的completed状态]
		 * @param  {[event]} event [通过event.target.checked获取得到true/false]
		 */
		toggleAll: function (event) {
			var checked = event.target.checked;
			this.props.model.toggleAll(checked);
		},

		/**
		 * [destroy 移除一个todo条目]
		 * @param  {[object]} todo [过滤掉的todo条目]
		 */
		destroy: function (todo) {
			this.props.model.destroy(todo);
		},
		/**
		 * [clearCompleted  清除completed状态为true的todo条目]
		 */
		clearCompleted: function () {
			this.props.model.clearCompleted();
		},
		/**
		 * [edit 编辑状态]
		 * @param  {[object]} todo [传入需要编辑的todo的id]
		 */
		edit: function (todo) {
			this.setState({editing: todo.id});
		},
		/**
		 * [cancel 取消编辑]
		 */
		cancel: function () {
			this.setState({editing: null});
		},
		render: function () {
			var footer;
			var main;
			//获取store数据
			var todos = this.props.model.todos;


			//todoItem组件【filter绑定this】
			var shownTodos = todos.filter(function (todo) {
				switch (this.state.nowShowing) {
				case app.ACTIVE_TODOS:
					return !todo.completed;
				case app.COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
				}
			}, this);
			//todoItem主要组件【map绑定this】
			var todoItems = shownTodos.map(function (todo) {
				return (
					<TodoItem
						key={todo.id}
						todo={todo}
						editing={this.state.editing === todo.id}
						onSave={this.save.bind(this, todo)}
						onToggle={this.toggle.bind(this, todo)}
						onDestroy={this.destroy.bind(this, todo)}
						onCancel={this.cancel}
					/>
				);
			}, this);
			//todoItem全部组件
			if (todos.length) {
				main = (
					<section className="main">
						<input
							className="toggle-all"
							type="checkbox"
							onChange={this.toggleAll}
							checked={activeTodoCount === 0}
						/>
						<ul className="todo-list">
							{todoItems}
						</ul>
					</section>
				);
			}

			//剩余条数
			var activeTodoCount = todos.reduce(function (accum, todo) {
				return todo.completed ? accum : accum + 1;
			}, 0);
			//完成条数
			var completedCount = todos.length - activeTodoCount;
			//footer组件
			if (activeTodoCount || completedCount) {
				footer =
					<TodoFooter
						count={activeTodoCount}
						completedCount={completedCount}
						nowShowing={this.state.nowShowing}
						onClearCompleted={this.clearCompleted}
					/>;
			}

			return (
				<div>
					<header className="header">
						<h1>todos</h1>
						<input
							className="new-todo"
							placeholder="What needs to be done?"
							value={this.state.newTodo}
							onChange={this.handleChange}
							onKeyDown={this.handleNewTodoKeyDown}
							autoFocus={true}
						/>
					</header>
					{main}
					{footer}
				</div>
			);
		}
	});
	//生成一个store。key值为react-todos
	var model = new app.TodoModel('react-todos');

	function render() {
		ReactDOM.render(
			<TodoApp model={model}/>,
			document.getElementsByClassName('todoapp')[0]
		);
	}
	//3、设置监听函数，store的state一旦发生变化render()函数重新渲染【相当于执行render()函数】
	model.subscribe(render);
	render();
})();