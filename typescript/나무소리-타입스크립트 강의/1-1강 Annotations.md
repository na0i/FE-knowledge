## 1-2강 Annotations

### Defining the Data Model

- javascript일 경우

  ```javascript
  class TodoItem {
      constructor(id, task, complete) {
          this.id = id;
          this.task = task;
          this.complete = complete;
      }
      
      printDetails() {
          console.log(${this.id} ${this.task} ${this.complete})
      }
  }
  
  const data = [
      {id: 1, task: '장보기', complete: true},
      {id: 2, task: '공부하기', complete: false},
  ]
  
  let todoItem = new TodoItem(data[0].id, data[0].task, data[0].complete)
  ```

<br>

- typescript일 경우

  ```
  
  ```

  