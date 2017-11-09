import React from 'react';

export default class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    //保证事件可以获取到this.props属性
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  //回车事件
  handleKeyUp(e) {
    if (e.which === 13) {
      if (!this.state.value) { //没有输入直接回车情况
          return;
      }
      //直接调用action_creators.js的方法
      this.props.addTodo(this.state.value);
      this.setState({
        value: ''
      });
    }
  }
  //受控组件
  handleChange(event) {
    this.setState({
      value: event.target.value.trim()
    });
  }
  render() {
    console.log(this.props);
    return (
      <div className="header">
        <h1>todos</h1>
        <input 
          type='text' 
          className="new-todo" 
          autoFocus="autofocus"
          placeholder="What needs to be done?"
          value={this.state.value}
          onChange={this.handleChange} 
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
}
