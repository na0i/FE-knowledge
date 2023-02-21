import {action, computed, makeObservable, observable, toJS} from 'mobx';

class TodoStore {

  // data 변경 반영을 위해 필수적
  constructor(){
    makeObservable(this);
  }

  @observable
  _todo = {};

  @observable
  _todos = [];

  @observable
  _searchText = '';

  get todo(){
    return this._todo;
  }

  //get 메소드에서 옵저버블 데이터에 대한 특정 연산이 진행될 때는 computed를 사용해준다.
  @computed
  get todos(){
    return this._todos;
    // 일반 자바스크립트 객체로 변경하기
    // return toJS(this._todos);
  }

  get searchText(){
    return this._searchText;
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
  setSearchText(searchText){
    this._searchText = searchText;
  }

  @action
  addTodo(todo){
    this._todos.push(todo);
  }

  @action
  selectedTodo(todo){
    this._todo = todo;
  }

  @action
  updateTodo(){
    let foundTodo = this._todos.find((todo) => todo.id === this._todo.id);
    foundTodo.title = this._todo.title;
    foundTodo.date = this._todo.date;

    this._todo = {};
  }
  
  @action
  removeTodo(){
    let index = this._todos.findIndex( todo => todo.id === this._todo.id );
    if (index > -1){
      this._todos.splice(index, 1)
    }

    this._todo = {};
  }
}

export default new TodoStore();