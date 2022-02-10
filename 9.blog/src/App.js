import './App.css';
import React, { useState } from 'react';

function App() {

  // useState('남자 코트 추천'); // [a, b] 형태의 배열을 남긴다.
  // a: 데이터 그 자체
  // b: state(a 데이터)를 정정해주는 함수
  // [state 데이터, state 데이터 변경 함수]
  // state 변경은 b함수를 이용해야 한다.
  // state 변경 후 재렌더링이 일어난다.

  // ES6 destructuring
  // let [a, b] = [10, 100] 과 비슷한 문법
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [좋아요, 좋아요변경] = useState(0);
  // let [글제목2, 글제목변경2] = useState('남자 코트 추천2');
  
  let posts = '강남 고기 맛집';

  function 제목바꾸기(){
    // 글제목변경(['여자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
    let newArray = [...글제목];
    newArray[0] = '여자 코트 추천';
    글제목변경(newArray)
  }

  return (
    <div className="App">
      <div className='black-nav'>
        <div>개발 블로그</div>
      </div>
      <div className='list'>
        <h3>{ 글제목[0] } <span onClick={()=>{ 좋아요변경(좋아요 + 1) } }>👍</span> {좋아요} </h3>
        <p>2월 17일 발행</p>
        <hr></hr>
      </div>
      <div className='list'>
        <h3>{ 글제목[1] }</h3>
        <p>2월 17일 발행</p>
        <hr></hr>
      </div>
      <div className='list'>
        <h3>{ 글제목[2] }</h3>
        <p>2월 17일 발행</p>
        <hr></hr>
      </div>
      {/* 함수 뒤에 ()를 붙이면 too many re renders라는 오류 발생 */}
      {/* 함수 뒤에 () 붙이는 것은 바로 실행한다는 뜻이기 때문 */}
      <button onClick={ 제목바꾸기 }>숙제</button>
    </div>
  );
}

export default App;
