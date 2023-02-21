import React, { Component } from "react"

class UpdateContents extends Component {
    constructor(props){
      super(props);
      // update를 위해서는 어디를 update할지에 대한 식별자가 필요
      this.state = {
        id: this.props.data.id,
        title: this.props.data.title,
        desc: this.props.data.desc,
      }
      // 계속 뒤에 bind(this)를 쓰기 귀찮을 때
      this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    inputFormHandler(e){
      // [e.target.name]
      // target의 name값을 찾음
      this.setState({[e.target.name]:e.target.value});
    }
    render() {
      // console.log(this.props.data);
      return (
        <div>
          <h2>Update</h2>
            <form action="/create_process" method="POST"
              onSubmit={function(e){
                e.preventDefault();
                this.props.onSubmit(
                  this.state.id,
                  this.state.title,
                  this.state.desc,
                );
              }.bind(this)}
            >
              {/* id 찾기를 위한 hidden input */}
              <input type="hidden" name="id" value={this.state.id}></input>
              <p>
                <input
                  type="text"
                  name="title"
                  placeholder="title"
                  // value값을 이렇게 하니까 오류 발생
                  // props는 read only인데
                  // 그것을 수정하려고 함으로써 생기는 문제
                  value={this.state.title}
                  // onChange={function(e){
                    // e.target.value로 한글자씩 받은것을 바로바로
                    // setState를 이용해 업데이트 시켜주기
                    // console.log(e.target.value);
                    // this.setState({title:e.target.value});
                  // }.bind(this)}
                  onChange={this.inputFormHandler}
                ></input>
              </p>
              <p>
                <textarea
                  name="desc"
                  placeholder="description"
                  value={this.state.desc}
                  onChange={this.inputFormHandler}
                ></textarea>
              </p>
              <p>
                <input type="submit"></input>
              </p>
            </form>
        </div>
      );
    }
  }

export default UpdateContents;