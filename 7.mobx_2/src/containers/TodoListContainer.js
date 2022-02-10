import React, { Component } from 'react';
import TodoListView from '../views/TodoListView';
import {inject, observer} from 'mobx-react';
import autobind from 'autobind-decorator';

@inject('todoStore')
@autobind
@observer
class TodoListContainer extends Component {
  
  onSelectedTodo(todo){
    this.props.todoStore.selectedTodo(todo);
  }
  
  render(){
    // todos를 재할당 할 것이므로 const가 아닌 let을 사용
    let { todos, searchText } = this.props.todoStore;
    
    todos = todos.filter((todo) => todo.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

    return (
      <TodoListView
        todos={ todos }
        onSelectedTodo = { this.onSelectedTodo }
      />
    )
  }
}

export default TodoListContainer;