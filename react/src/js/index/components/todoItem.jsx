/**
 * [li 列表组件]
 */
var app=app||{};
(function(){
	'use strict';
	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;
	app.TodoItem=React.createClass({
		getInintialState:function(){
			if(this.props.editing){
				return {
					editText:this.props.todo.title
				}
			}
		},
		render:function(){
			<li className={classNames({
					completed: this.props.todo.completed,
					editing: this.props.editing
				})}>
				<div className="view">
					<input className="toggle" type="checkbox" checked={this.props.todo.completed} onChange={this.props.onTogle} />
					<label onDoubleClick={this.handleEdit}>
						{this.props.todo.title}
					</label>
					<button className="destory" onClick={this.props.onDestory} />
				</div>
				<input ref="editField" className="edit" value={this.state.editText} onBlur={this.handleSubmit} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
			</li>
		},
		/**
		 * [handleChange change事件：改变状态]
		 */
		handleChange:function(event){
			if(this.props.editing){
				this.setState({editText:event.target.value});
			}
		},
		/**
		 * [handleSubmit blur事件：改变状态+保存数据]
		 */
		handleSubmit:function(event){
			var val=this.state.editText.trim();
			//有数据：失去焦点
			if(val){
				this.setState({editText:val});
				this.props.onSave(val);
			}
			//无数据：失去焦点
			else{
				this.props.onDestory();
			}
		},
		/**
		 * [handleKeyDown enter事件：改变状态+保存数据，esc事件：改变状态+取消保存]
		 */
		handleKeyDown:function(event){
			//esc事件
			if(event.which===ESCAPE_KEY){
				this.setState({editText:this.pros.todo.title});
				this.props.onCancel(event);
			}
			//enter事件
			else if(event.which===ENTER_KEY){
				this.handleSubmit(event);
			}
		},
		/**
		 * [handleEdit doubleClick事件：改变状态+编辑事件]
		 */
		handleEdit:function(){
			this.setState({editText:this.props.todo.title});
			this.props.onEdit();
		},
		/**
		 * [componentWillReceiveProps 事件：组件属性改变]
		 */
		componentWillReceiveProps:function(nextProps){
			console.log(nextProps);
		},
		/**
		 * [shouldComponentUpdate 事件：组件属性/状态改变【决定要不要渲染】]
		 */
		shouldComponentUpdate:function(nextProps,nextState){
			console.log(nextProps,nextState);
			/* 
			//true的话就渲染
			return true;
			*/
		    return {
		    	nextProps.todo !== this.props.todo ||
		    	nextProps.editing !== this.props.editing ||
		    	nextState.editText !== this.state.editText
		    }
		},
		/**
		 * [componentWillUpdate 事件：决定了渲染，render之前]
		 */
		componentWillUpdate:function(nextProps,nextState){
			console.log(nextProps,nextState);
		},
		/**
		 * [componentDidUpdate 事件：决定了渲染，render之后]
		 */
		componentDidUpdate:function(prevProps,prevState){
			console.log(prevProps,prevState);
			if(!prevProps.editing && this.props.editing){
				//获取真实DOM
				console.log(ReactDOM.findDOMNode(this));
				var node=React.findDOMNode(this.refs.editField);
				node.focus();
				//不选中文本
				//http://blog.csdn.net/foralienzhou/article/details/52437929
				node.setSelectionRange(node.value.length,node.value.length);
			}
		}
	});
})();