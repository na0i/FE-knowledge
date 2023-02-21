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
  
  for (let i=0; i < data.length; i++) {
      let todoItem = new TodoItem(data[i].id, data[i].task, data[i].complete);
      todoItem.printDetails();
  }
  ```

<br>

- typescript일 경우

  ```typescript
  class TodoItem {
  	constructor(public id: number, public task: string, public complete: boolean) {
          this.id = id;
          this.task = task;
          this.complete = complete;
      }
      
      printDetails(): void {
          console.log(${this.id} ${this.task} ${this.complete})
      }
  }
  
  const data = [
      {id: 1, task: '장보기', complete: true},
      {id: 2, task: '공부하기', complete: false},
  ]
  
  for (let i=0; i < data.length; i++) {
      let todoItem = new TodoItem(data[i].id, data[i].task, data[i].complete);
      todoItem.printDetails();
  }
  ```

  - 프로퍼티 정의도 타입 지정 필요
  - 파라미터 정의도 타입 지정 필요
  - 접근지정자: public, private, protected
    - private: 일부 클래스에서 직접적인 접근이 되지 않음
    - public: 모두가 접근할 수 있음
  - 메서드에서 리턴값이 존재하지 않을 때 void라고 명시

<br>

### Functions

- 가변인자 지원 X
- 파라미터에 정의되어 있는대로 전달 인자를 보내주어야 함수 호출이 일어남
- 가변인자 효과를 내기 위해서는 함수 오버로딩을 사용