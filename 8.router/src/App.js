import './App.css';
import React, { Component } from 'react';
import Nav from './components/Nav';
import About from './components/About'
import Main from './components/Main'
import Lessons from './components/Lessons'
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/about' component={About} />
          <Route path='/lessons' component={Lessons} />
          {/* 상위 조건에 해당하지 않는 컴포넌트들은 not found로 이동 */}
          <Route component={()=> <h1>NOT FOUND</h1>}></Route>
        </Switch>
      </div>
    );
  } 
}

export default App;
