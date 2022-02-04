import React, { Component } from "react";
import BookList from "./components/BookList";

import Books from "./static-data/Books";

class App extends Component{
  render () {
    return(
      <BookList books={ Books } />
    )
  }
}

export default App;



// 클래스 기반의 컴포넌트는 리액트 컴포넌트를 상속
// 또한, 렌더 메소드를 반드시 재정의하고
// 렌더 메소드 내 리턴 구문이 반드시 위치해야한다.
// 리턴 구문에서 반환하는 것은 리액트 엘리먼트이다.