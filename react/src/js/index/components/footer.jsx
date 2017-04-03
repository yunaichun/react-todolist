/**
 * [TodoFooter 底部路由切换组件【属于view层】]
 */
var app = app || {};

(function () {
	'use strict';

	app.TodoFooter = React.createClass({
		render: function () {
			var activeTodoWord = app.Utils.pluralize(this.props.count, 'item');
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = (
					<button
						className="clear-completed"
						onClick={this.props.onClearCompleted}>
						Clear completed
					</button>
				);
			}

			var nowShowing = this.props.nowShowing;
			return (
				<footer className="footer">
					<span className="todo-count">
						<strong>{this.props.count}</strong> {activeTodoWord} left
					</span>
					<ul className="filters">
						<li>
							<a
								href="#/"
								className={nowShowing===app.ALL_TTODOS?"selected":" "}>
									All
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/active"
								className={nowShowing===app.ACTIVE_TTODOS?"selected":" "}>
									Active
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/completed"
								className={nowShowing===app.COMPLETED_TTODOS?"selected":" "}>
									Completed
							</a>
						</li>
					</ul>
					{clearButton}
				</footer>
			);
		}
	});
})();

