import React, { Component } from "react"

class CreateContents extends Component {
    render() {
      return (
        <div>
          <h2>Create</h2>
            <form action="/create_process" method="POST"
              onSubmit={function(e){
                e.preventDefault();
                // alert('submit!')
                // debugger;

                // 이곳의 인자로 title, desc를 주어야하는데
                // 그것을 어떻게 하면 좋을지 고려해보자.
                // e.target.title.value와 e.target.desc.value를 console에 찍어보았더니 가능
                this.props.onSubmit(
                  e.target.title.value,
                  e.target.desc.value
                );
              }.bind(this)}
            >
              <p>
                <input type="text" name="title" placeholder="title"></input>
              </p>
              <p>
                <textarea name="desc" placeholder="description"></textarea>
              </p>
              <p>
                <input type="submit"></input>
              </p>
            </form>
        </div>
      );
    }
  }

export default CreateContents
