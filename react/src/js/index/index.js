//import baseStyle from '../../style/common/base.css';
//import indexStyle from '../../style/index/index.css';
/**
 * [TodoModel 模型对象]
 */
var app = app || {};
(function () {
	'use strict';
	var Utils = app.Utils;

	app.TodoModel = function (key) {
		this.key = key;
		this.todos = Utils.store(key);
		this.onChanges = [];
	};
	/**
	 * [subscribe 将组件传入进来]
	 * @param  {[type]} onChange [description]
	 * @return {[type]}          [description]
	 */
	app.TodoModel.prototype.subscribe = function (onChange) {
		this.onChanges.push(onChange);
	};
	/**
	 * [inform 执行组件]
	 * @return {[type]} [description]
	 */
	app.TodoModel.prototype.inform = function () {
		Utils.store(this.key, this.todos);
		this.onChanges.forEach(function (cb) { 
			cb();
		});
	};

	/**
	 * [addTodo 添加一个todo条目]
	 * @param {[string]} title [title：标题，id：自动生成，completed：默认false]
	 */
	app.TodoModel.prototype.addTodo = function (title) {
		this.todos = this.todos.concat({
			//产生一个唯一的id
			id: Utils.uuid(),
			//标题
			title: title,
			//是否完成，默认false
			completed: false
		});
		//渲染组件
		this.inform();
	};
	/**
	 * [save 修改一个todo条目的title：：失去焦点事件+Enter事件]
	 * @param  {[object]} todoToSave [需要修改的todo条目]
	 * @param  {[string]} text       [修改后的标题]
	 */
	app.TodoModel.prototype.save = function (todoToSave, text) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
		});
		//渲染组件
		this.inform();
	};

	/**
	 * [toggle toggle一个todo条目的completed状态]
	 * @param  {[object]} todoToToggle [传入一个需要改变状态的todo条目]
	 */
	app.TodoModel.prototype.toggle = function (todoToToggle) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToToggle ?
				todo :
				Utils.extend({}, todo, {completed: !todo.completed});
		});
		//渲染组件
		this.inform();
	};
	/**
	 * [toggleAll toggle所有todo条目的completed状态]
	 * @param  {[boolean]} checked [true or false]
	 */
	app.TodoModel.prototype.toggleAll = function (checked) {
		this.todos = this.todos.map(function (todo) {
			return Utils.extend({}, todo, {completed: checked});
		});
		//渲染组件
		this.inform();
	};

	/**
	 * [destroy 移除一个todo条目]
	 * @param  {[object]} todo [过滤掉的todo条目]
	 */
	app.TodoModel.prototype.destroy = function (todo) {
		this.todos = this.todos.filter(function (candidate) {
			return candidate !== todo;
		});
		//渲染组件
		this.inform();
	};
	/**
	 * [clearCompleted 清除completed状态为true的todo条目]
	 */
	app.TodoModel.prototype.clearCompleted = function () {
		this.todos = this.todos.filter(function (todo) {
			return !todo.completed;
		});
		//渲染组件
		this.inform();
	};
})();
