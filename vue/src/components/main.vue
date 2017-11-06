<template>
  <div class="main">
      <section class="todoapp" v-cloak>
          <!--每条记录input输入框-->
        <header class="header">
          <h1>todos</h1>
          <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" v-on:keyup.enter="addTodo(newTodo)">
        </header>
        <!--输入生成的列表项-->
        <section class="main" v-show="todos.length">
          <input class="toggle-all" type="checkbox" v-model="allDone">

          <ul class="todo-list">
            <li  class="todo" v-for="todo in filterTodos" v-bind:class="{completed: todo.completed, editing: todo == editedTodo}" >
              <div class="view">
                <input class="toggle" type="checkbox"  v-model="todo.completed">

                <label v-on:dblclick="editTodo(todo)">{{todo.title}}</label>
                <button class="destroy" v-on:click="deleteTodo(todo)"></button>
              </div>
              <input class="edit" type="text" v-model="todo.title" v-on:blur="doneEdit(todo)" v-on:keyup.enter="doneEdit(todo)" v-on:keyup.esc="cancelEdit(todo)" v-focus="todo==editedTodo">
            </li>
          </ul>
      </section>
      <footer class="footer" v-show="todos.length">
          <!--未完成=所有-已完成-->
        <span class="todo-count">
          <strong v-text="remaining"></strong> {{getStrItem('item', remaining)}} left
        </span>
        <!--功能项：所有，未完成，已完成-->
        <ul class="filters">
          <li><a href="#/" v-bind:class="{selected: visibility=='all'}" v-on:click="getAll()">All</a></li>
          <li><a href="#/active" v-bind:class="{selected: visibility=='active'}" v-on:click="getActive()">Active</a></li>
          <li><a href="#/completed" v-bind:class="{selected: visibility=='completed'}" v-on:click="getCompleted()">Completed</a></li>
        </ul>
        <!--清空已完成-->
        <button class="clear-completed" v-show="todos.length>remaining" v-on:click="removeCompleted()">
          Clear completed
        </button>

      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Written by <a href="https://github.com/ncyu1044173619/todoList">Naichun Yu</a></p>
      <p>Refer to <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
</template>

<script>
import todoStorage from '../store.js';
import '../../static/css/base.css';
import '../../static/css/index.css';

export default {
    name:"main",
    data() {
      return {
          todos: todoStorage.fetch(),//v-for数据库初始渲染
          newTodo: "",//v-model绑定新添加数据
          editedTodo:null,
          visibility:"all",
        }
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
}
</script>
