(function(exports){

	exports.app=new Vue({
		el:".todoapp",
		data:{
			todos: todoStorage.fetch(),//v-for数据库初始渲染
			newTodo: "",//v-model绑定新添加数据
			editedTodo:null,
			visibility:"all",
		},
		//数据源只要发生改变就会触发数据库的重新保存操作
		watch:{
			//todos有变化的时候就会保存至数据库
			todos:{
				handler:function(val,oldvalue){
					//val是push进来的对象
					todoStorage.save(val);
				},
				//todos是一个数组，存入的是对象，对象中任一个键的值变化都视作整体变化
				deep:true
			}
		},
		methods:{
			//keyup.enter新增
			addTodo:function(newTodo){
				//newTodo暂存数据
				//var value=this.newTodo&&this.newTodo.trim();
				var value=newTodo&&newTodo.trim();
				if(!value){
					return;
				}
				this.todos.push({title:value,completed:false});
				//每次回车后input域清空
				this.newTodo="";
			},
			//click事件删除
			deleteTodo:function(todo){
				var index=this.todos.indexOf(todo);
				this.todos.splice(index,1);
			},
			//dblclick双击编辑
			editTodo:function(todo){
				this.editedTodo=todo;
				//保存编辑前的文字
				this.beforeEdit=todo.title;
			},
			//blur、keyup.enter完成编辑
			doneEdit:function(todo){
				//必须得先双击
				if(!this.editedTodo){
					return;
				}
				this.editedTodo=null;
				todo.title=todo.title.trim();
				if(!todo.title){
					this.deleteTodo(todo);
				}
			},
			//key.esc取消编辑
			cancelEdit:function(todo){
				this.editedTodo=null;
				todo.title = this.beforeEdit;
			},
			//click事件删除已完成
			removeCompleted:function(){
				this.todos=this.todos.filter(function(todo){
					return !todo.completed;
				});
			},

			//{{}}直接调用
			getStrItem:function(item,count){
				return item + (count==1?"":"s");
			},

			//all
			getAll:function(){
				this.visibility="all";
			},
			//active
			getActive:function(){
				this.visibility="active";
			},
			//completed
			getCompleted:function(){
				this.visibility="completed";
			}
		},
		directives:{
			focus:function(el,binding){
				//binding.value=  "todo=editedTodo" 
				//指示双击编辑哪一个哪一个就聚焦
				if(binding.value){
					el.focus();
				}
			}
		},
		filters:{
			capitalize: function (value) {
		      if (!value){
		      	return;
		      }
		      value = value.toString();
		      return value.charAt(0).toUpperCase() + value.slice(1);
		    }
		},
		computed:{
			//v-text获取
			remaining:function(){
				var filterTodo=this.todos.filter(function(todo){
					return !todo.completed;
				});
				var length=filterTodo.length;
				return length;
			},
			//v-model获取
			allDone:{
				//每一次操作都会触发get
				get:function(){
					console.log("get",this.remaining === 0);
					return this.remaining === 0;
				},
				//v-model绑定到checkbox上
				//先触发set，再触发get【第一次触发事件会将此次get的值传递给setet】
				set:function(value){
					console.log("set",value);
					this.todos.forEach(function(todo){
						todo.completed = value;
					});
				}
			},
			//路由切换不同数据
			filterTodos:function(){
				if(this.visibility=="all"){
					return this.todos;
				}else if(this.visibility=="active"){
					return this.todos.filter(function(todo){
						return !todo.completed;
					});
				}else{
					return this.todos.filter(function(todo){
						return todo.completed;
					});
				}
			}
		}
	});
})(window);