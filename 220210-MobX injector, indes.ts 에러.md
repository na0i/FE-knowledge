### 220210
#### Error: MobX injector: Store 'TodoStore' is not available! Make sure it is provided by some Provider

<br>

![image](https://user-images.githubusercontent.com/77482972/153315530-092a6dd1-2435-41e5-b3e8-346754878887.png)

<br>

이러한 에러메세지와 함께<br>
index.ts의 63번째 줄이 문제라고 했지만<br>
inject를 사용하면서 오타가 있던 것이 문제였다.

<br>

```
import React, { Component } from 'react';
import TodoListView from '../views/TodoListView';
import {inject, observer} from 'mobx-react';

@inject('TodoStore')
@observer
class TodoListContainer extends Component {
  render(){

    const { todos } = this.props.todoStore;

    return (
      <TodoListView todos={ todos }/>
    )
  }
}

export default TodoListContainer;
```


**@inject('TodoStore')**<br>
가 아니라
**@inject('todoStore')**<br>
였다!

inject 뒤에 store 파일이름이 아닌 index.js에서 내려준 이름으로 사용해야 에러가 발생하지 않는다.