import React, { Component } from "react"

class TOC extends Component {
    // shouldComponentUpdate
    // render 함수보다 빠르게 실행됨
    // return 값이 false일 때 render 실행 x
    // return 값이 true일 때 render 실행 ㅇ
    // 새로 바뀐 값에 접근이 가능
    shouldComponentUpdate(newProps, newState){
      // console.log('여기',
      //   newProps.data, // 바뀐값
      //   this.props.data // 현재값
      // );
      if (this.props.data === newProps.data){
        return false
      }
      return true
    }

    render() {
      const data = this.props.data;
      var lists = []
      var i = 0;
      while (i < data.length){
        lists.push(
        <li key={data[i].id}>
          <a
            href={"/content/"+ data[i].id}
            data-id = {data[i].id}
            // event에서 target을 console에 찍어보면
            // 이벤트가 발생한 tag를 가리킴(여기서는 a태그)
            // 그 중 dataset에 접근하면 여기서의 data-id에 접근할수 있음
            // 다른 이름으로 쓰면 안되네..? 이유는 모르겠다
            onClick={function(e){
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}
          >{data[i].title}: {data[i].desc}
          </a>
        </li>)
        i += 1;
      }
      return (
        <div>
          { lists }
        </div>
      )
    }
  }

export default TOC