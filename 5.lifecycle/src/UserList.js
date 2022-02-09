import React, { Component } from 'react';
import {Button, List, ListItemText} from '@material-ui/core';
import axios from 'axios';

class UserList extends Component {

  constructor(props){
    super(props);

    this.state = {
      users: [{
        id: '',
        name: '',
      }],

      title: '',
    }
  }

  loadUsers(){
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      this.setState({
        users: response.data
      });
    });
  }

  // nextProps: app에서 prop으로 받은 title
  // prevState: state의 title
  // nextProps와 prevProps가 다르다면 prop해서 받은 것으로 동기화
  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.title !== prevState.title){
      return {title: nextProps.title}
    } else {
      return null;
    }
  }

  componentDidMount(){
    this.loadUsers();
  }
  

  render(){
    const usersList = this.state.users.map( user => {
      // primary: data, key: 반복문의 key 필요
      return <ListItemText primary={user.name} key={user.id}></ListItemText>
    })
    return (
      <div>
        {/* <Button
          onClick={this.loadUsers.bind(this)}
          variant='contained' color='primary'>Load</Button> */}
        <h1>{this.state.title}</h1>
        <List>
          {usersList}
        </List>
      </div>
    )
  }
}
export default UserList;