/**
 * [footer 编辑组件]
 */
var app=app||{};
(function(){
	'use strict';

	app.TodoFooter=React.createClass({
		render:function(){
			var activeTodoWord=app.Utils.pluralize({this.props.count,'item'});
			var clearButton=null;
			if(this.props.completedCount>0){
				clearButton=(
					<button className="clear-completed" oncLick={this.props.onclearCompleted}> Clear completed </button>
				);
			}
			//有return，且是复合组件：用括号()
			return (
				<footer className="footer">
				    <span className="todo-count">
				        <strong>{this.props.count}</strong>{activeTodoWord} left
				    </span>
				    <ul className="filters">
				        <li>
					        <a href="#/" className={classNames({selected:nowshowing===app.ALL_TTODOS})}>ALL</a>
				        </li>
				        <li>
					        <a href="#/active" className={classNames({selected:nowshowing===app.ACTIVE_TTODOS})}>Active</a>
				        </li>
				        <li>
					        <a href="#/completed" className={classNames({selected:nowshowing===app.COMPLETED_TTODOS})}>Completed</a>
				        </li>
				    </ul>
				</footer>
			)
		}
	});
})();
