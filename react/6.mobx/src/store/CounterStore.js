import { observable, action, makeObservable } from 'mobx';

class CounterStore {
  // count라는 data를 state라고 명시해주기 위해
  // observable 함수에 파라미터로 넣어준다.
  // count는 observable에서 바라보는 data가 된다.
  // observable({
  //   _count = 5
  // });

  constructor(){
    makeObservable(this);
  }

  // store 객체를 만듦
  @observable
  // 관례적으로 private한 data나 method는 앞에 _를 붙여서 표시
  _count = 5

  // get 메소드를 통해 외부에 제공
  // get 메소드라고 해서 count()로 접근하지 않고 count로 접근
  // 실제로 이 count를 사용하는 쪽에서는 변수에 접근하는 것처럼 사용할 수 있도록 명명함
  get count(){
    return this._count;
  }

  // observable한 data를 변경시키는 것은 action
  @action
  increment(){
    this._count ++;
  }
  
  @action
  decrement(){
    this._count --;
  }
}

// 생성해서 리턴
export default new CounterStore();