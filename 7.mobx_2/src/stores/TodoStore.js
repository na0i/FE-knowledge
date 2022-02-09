import {action, computed, makeObservable, observable} from 'mobx';

class TodoStore {

  // data 변경 반영을 위해 필수적
  constructor(){
    makeObservable(this);
  }

  @observable
  _todo = {}

  @observable
  _todos = []

  get todo(){
    return this._todo;
  }

  get todos(){
    return this._todos;
  }

  @action
  setTodoProps(name, value){
    // ... 문법 예시 코드
    // let prevState = {
    //   name: 'na0i',
    //   age: 26,
    // };

    // let state = {
    //   ...prevState,
    //   age: 27,
    // }
    // 기존 객체를 복사함 + 새로운 값 할당
    // props나 state 처럼 이전 정보를 이용하는 경우 유용하게 사용
    this._todo = {
      ...this._todo,
      [name] : value,
    }
  }

  @action
  addTodo(todo){
    this._todos.push(todo);
  }
}

export default new TodoStore();