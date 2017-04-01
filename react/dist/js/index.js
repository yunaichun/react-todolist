webpackJsonp([0],{

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
__webpack_require__(83);
__webpack_require__(82);
module.exports = __webpack_require__(81);


/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* 
import baseStyle from '../../style/common/base.css';
import indexStyle from '../../style/index/index.css';
*/
alert(1);

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*jshint quotmark:false */

var app = app || {};

(function () {
	'use strict';

	var TodoApp = React.createClass({
		displayName: 'TodoApp',

		getInitialState: function getInitialState() {
			return {
				nowshowing: app.ALL_TODOS,
				editing: null,
				newTodo: ''
			};
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'header',
					{ className: 'header' },
					React.createElement(
						'h1',
						null,
						'todos'
					),
					React.createElement('input', { className: 'new-todo', placeholder: 'what needs to be done?', value: this.state.newTodo, onKeyDown: this.handleNewTodoKeyDown, onChange: this.handleChange, autoFocus: true })
				)
			);
		}
	});
	function render() {
		React.render(React.createElement(TodoApp, { model: model }), document.getElementsByClassName('todoapp')[0]);
	}
	render();
})();

/***/ }),

/***/ 82:
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: F:\\wwwroot\\WORKED\\JS框架\\todoList\\react\\src\\js\\index\\components\\footer.jsx: Unexpected token, expected , (10:47)\n\n   8 | \tapp.TodoFooter=React.createClass({\n   9 | \t\trender:function(){\n> 10 | \t\t\tvar activeTodoWord=app.Utils.pluralize({this.props.count,'item'});\n     | \t\t\t                                            ^\n  11 | \t\t\tvar clearButton=null;\n  12 | \t\t\tif(this.props.completedCount>0){\n  13 | \t\t\t\tclearButton=(\n");

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: F:\\wwwroot\\WORKED\\JS框架\\todoList\\react\\src\\js\\index\\components\\todoItem.jsx: Unexpected token, expected , (92:16)\n\n  90 | \t\t\t*/\n  91 | \t\t    return {\n> 92 | \t\t    \tnextProps.todo !== this.props.todo ||\n     | \t\t    \t         ^\n  93 | \t\t    \tnextProps.editing !== this.props.editing ||\n  94 | \t\t    \tnextState.editText !== this.state.editText\n  95 | \t\t    }\n");

/***/ })

},[183]);
//# sourceMappingURL=index.js.map