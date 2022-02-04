import React, { Component } from 'react';

class Control extends Component {
    render() {
      return (
        <ul>
          <li><a href='/create' onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('create');
          }.bind(this)}>create</a></li>
          <li><a href='/update' onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('update');
          }.bind(this)}>update</a></li>          
          <li><input type="button" value="delete" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('delete');
          }.bind(this)}></input></li> 
       </ul>
      );
    }
  }

// 외부에서 아래 명시한 컴포넌트를 사용할 수 있도록 함
export default Control;