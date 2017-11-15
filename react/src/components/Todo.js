import React from 'react';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editding: false,
      newText: this.props.todo.text
    };
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.focusTextInput = this.focusTextInput.bind(this);
  }
  //删除todo
  handleClick() {
    this.props.deleteTodo(this.props.todo);
  }
  //切换状态
  handleChange() {
    this.props.toggleCompleteTodo(this.props.todo);
  }
  //双击编辑
  handleDoubleClick() {
    this.setState({
      editding: true,
    });
    this.focusTextInput();
  }
  //esc、enter退出编辑
  handleKeyUp(event) {
    if (event.which === 27) { //esc
      this.setState({
        editding: false
      });
    }
    if (event.which === 13) { //enter
      if (!event.target.value.trim()) {
        return;
      }
      this.setState({
        editding: false
      });
      this.props.editTodo(this.props.todo, this.state.newText);
    }
  }
  //失去焦点退出编辑+保存
  handleBlur(event) {
    if (!event.target.value.trim()) {
      return;
    }
    alert(1);
    this.setState({
      editding: false,
    });
    this.props.editTodo(this.props.todo, this.state.newText);
  }
  //受控组件
  handleInputChange(event) {
    this.setState({
      newText: event.target.value.trim()
    });
  }
  //input聚集焦点，是通过事件完成的
  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }
  render() {
    const { completed, text } = this.props.todo;
    return (
      <li className={(completed ? 'completed' : '') + (this.state.editding ? 'editing' : '')}>
        <div className="view">
          <input 
            className="toggle" 
            type="checkbox" 
            checked={this.props.todo.completed}
            onChange={() => this.handleChange()}
          />
          <label 
            htmlFor={text} 
            onDoubleClick={this.handleDoubleClick}
          >{text}</label>
          <button className="destroy" onClick={() => this.handleClick()} />
        </div>
        <input 
          className="edit" 
          type="text" 
          ref={(input) => { this.textInput = input; }}
          value={this.state.newText}
          onChange={this.handleInputChange}
          onKeyUp={this.handleKeyUp}
          onBlur={this.handleBlur}
        />
      </li>
    );
  }
}
