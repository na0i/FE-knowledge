import './App.css';
// 컴포넌트 등록
import React, { Component } from 'react';
import ReadContents from './Components/ReadContents';
import CreateContents from './Components/CreateContents';
import UpdateContents from './Components/UpdateContents';
import Control from './Components/Control';
import Subject from './Components/Subject';
import TOC from './Components/TOC';

// react의 컴포넌트라는 class를 상속해
// app이라는 새로운 클래스를 만들고
// 이 app은 render라는 함수를 가지고 있다.
class App extends Component {

  // 렌더 함수보다 먼저 실행이 되며
  // 해당 컴포넌트를 초기화 시켜주는 코드
  constructor(props){
    super(props);

    // 리액트는 state 값이 바뀔 때마다
    // 해당 state를 가지고 있는 컴포넌트의 render 함수가 재호출됨
    // render 함수 하위의 컴포넌트까지 싹 재호출(props도 마찬가지)
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      welcome: {title: 'welcome', sub: 'hi react!'},
      subject: {name: 'na0i', age:'27'},
      contents: [
        {id: 1, title: 'SOLVER', desc: '솔버 프로젝트'},
        {id: 2, title: 'IRIONEORA', desc: '이리오너라 프로젝트'},
        {id: 3, title: 'ASL', desc: 'Alice in SQLand 프로젝트'},
      ]
    }
    // state로 사용하지 않는 이유
    // ui와 관련없기 때문: 불필요한 렌더링을 줄임
    this.max_content_id = this.state.contents.length;
  }
  getReadContent(){
    var i = 0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data
      }
      i += 1
    }
  }
  getContent(){
    // console.log(this)
    // render 함수 내에서 this는 그 render 함수가 속해있는 컴포넌트 자신을 가리킨다.
    // 이벤트 함수 속 this는 undefined
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.sub;
      _article = <ReadContents title={_title} sub={_desc}></ReadContents>
    } else if (this.state.mode === 'read'){
      var _contents = this.getReadContent();
      _article = <ReadContents title={_contents.title} sub={_contents.desc}></ReadContents>
    } else if (this.state.mode === 'create') {
      _article = <CreateContents onSubmit={function(_title, _desc){
        // state.contents에 추가하기
        console.log(_title, _desc)
        this.max_content_id += 1;
        // 첫번째 방법
        // push(원본에 추가)보다는 concat(복제 후 추가)을 추천한다.
        // why?
        // 리액트는 변경되는 부분이 생기면 그부분의 render를 새로함
        // contents의 배열을 변경함으로써 관계없는 TOC 컴포넌트도 재렌더됨
        // this.state.contents.push(
        //   {id: this.max_content_id, title:_title, desc:_desc}
        // )

        // 두번째 방법
        // var _contents = this.state.contents.concat(
        //   {id: this.max_content_id, title:_title, desc:_desc}
        // )

        // 마지막 방법
        var _content = Array.from(this.state.contents);
        _content.push({id: this.max_content_id, title:_title, desc:_desc})
        this.setState({
          contents: _content,
          mode: 'read',
          selected_content_id: this.max_content_id,
        })
      }.bind(this)}></CreateContents>
    } else if (this.state.mode === 'update') {
      // update: 복제 후 수정해서 그것으로 대체해주기
      _contents = this.getReadContent();
      _article = <UpdateContents data={_contents} onSubmit={
        function(_id, _title, _desc){
        // 배열 복제: 배열이름.from(원본);
        var _content = Array.from(this.state.contents);
        var i = 0;
        while(i< _content.length){
          if (_content[i].id === _id){
            _content[i] = {id:_id, title:_title, desc:_desc}
            break;
          }
          i += 1
        }
        // mode도 read로 다시 바꿔주기
        this.setState({
          contents: _content,
          mode: 'read'
        })
      }.bind(this)}></UpdateContents>
    }
    return _article;
  }

  render() {

    return(
      <div className="App">
        {/* 속성값 내려주기와 유사하게 */}
        {/* 함수 내려주기 */}
        <Subject
          title={this.state.subject.name}
          desc={this.state.subject.age}
          onChangePage={function(){
            this.setState({mode: 'welcome'});
          }.bind(this)}
        >
        </Subject>
        {/* <div> */}
          {/* 이렇게 했더니 a 태그를 클릭할 때마다 reload 되는 문제 발생 */}
          {/* function의 첫번째 인자로 event 함수가 있고 */}
          {/* 이 중 'preventDefault: a태그의 기본적 동작을 막는다' 를 이용해 */}
          {/* 새로고침을 막겠다. */}
          {/* <h1><a href="/" onClick={function(){
            alert('hi!');
          }}>{this.state.profile.name}</a></h1> */}
          {/* <h1><a href="/" onClick={function(e){
            console.log(e);
            e.preventDefault();
            아래와 같이 짰더니 error가 남
            this를 찾을 수 없기 때문: event 함수 안에서의 this는 컴포넌트를 가리키지 않고
            아무 값도 세팅되어 있지 않다.
            this.state.mode = 'welcome';
            해결방법은 bind를 이용하기: 아래와 같이 함수 끝나는 직후에 bind를 붙여준다
            그러면 이 함수 안에서의 this는 해당 컴포넌트가 된다.
            this.state.mode = 'welcome';
          }.bind(this)}>{this.state.profile.name}</a></h1>
          그런데 작동이 되지 않음
          react는 코드를 이렇게 짜면 state 값 변동을 눈치채지 못함
          setState를 이용하기: 동적으로 state를 변경하는 것
            this.setState({
              mode: 'read'
            });
          }.bind(this)}>{this.state.profile.name}</a></h1> */}
          {/* // <h3>{this.state.profile.age}</h3>
        // </div> */}
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id: Number(id),
            });
          }.bind(this)}
          data={this.state.contents}></TOC>
        <Control
          onChangeMode={function(_mode){
            if (_mode ==='delete'){
              if(window.confirm('really?')){
                var _content = Array.from(this.state.contents);
                var i = 0;
                while( i< _content.length){
                  if(_content[i].id === this.state.selected_content_id){
                    _content.splice(i, 1)
                    break;
                  }
                  i += 1;
                }
                this.setState({
                  mode: 'welcome',
                  contents: _content,
                });
                alert('deleted!');
              }
            } else {
              this.setState({
                mode: _mode
              })
            }
          }.bind(this)}
        ></Control>
        {/* <ReadContents title={_title} sub={_desc}></ReadContents> */}

        {/* 컴포넌트 뭐보여줄지 정하기 위해 컴포넌트를 변수로 이용 */}
        {/* {_article} */}

        {/* 함수 return 값 이용 */}
        {this.getContent()}
      </div>
    )
  }
}

export default App;


// function App() {
//   return (
//     <div className="App">
      // <header className="App-header">
      //   <img src={logo} className="App-logo" alt="logo" />
      //   <p>
      //     Edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <a
      //     className="App-link"
      //     href="https://reactjs.org"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Learn React
      //   </a>
      // </header>
//     </div>
//   );
// }