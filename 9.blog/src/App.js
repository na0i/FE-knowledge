import './App.css';
import React, { useState } from 'react';

function App() {

  // useState('남자 코트 추천'); // [a, b] 형태의 배열을 남긴다.
  // a: 데이터 그 자체
  // b: state(a 데이터)를 정정해주는 함수
  // [state 데이터, state 데이터 변경 함수]

  // ES6 destructuring
  // let [a, b] = [10, 100] 과 비슷한 문법
  let [글제목, 글제목변경] = useState('남자 코트 추천');
  let [글제목2, 글제목변경2] = useState('남자 코트 추천2');
  
  let posts = '강남 고기 맛집';

  return (
    <div className="App">
      <div className='black-nav'>
        <div>개발 블로그</div>
      </div>
      <div className='list'>
        <h3>{ 글제목 }</h3>
        <p>2월 17일 발행</p>
        <hr></hr>
      </div>
    </div>
  );
}

export default App;
