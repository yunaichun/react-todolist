/*jshint quotmark:false */

var app = app || {};

(function () {
	'use strict';

	var TodoApp=React.createClass({
		getInitialState:function(){
			return{
				nowshowing:app.ALL_TODOS,
				editing:null,
				newTodo:''
			}
		},
		render:function(){
			return (
				<div>
				    <header className="header">
				        <h1>todos</h1>
				        <input className="new-todo" placeholder="what needs to be done?" value={this.state.newTodo} onKeyDown={this.handleNewTodoKeyDown} onChange={this.handleChange} autoFocus={true}/>
				    </header>
				</div>
			)
		}
	});
	function render(){
		React.render(<TodoApp model={model} />,document.getElementsByClassName('todoapp')[0])
	}
	render();
})();
