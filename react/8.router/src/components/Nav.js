import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom';

class Nav extends Component {
  render(){
    return (
      <nav className='navtop'>
        <h2>Namoosori</h2>
        <ul className='nav-links'>
          {/* Link와 NavLink는 기능이 비슷하다. 하지만 */}
          {/* Link가 아니라 NavLink를 사용하게 되면 */}
          {/* 관리자 도구에 현재 위치해 있는 페이지가 class='active'라고 표현이 된다. */}
          <li><NavLink exact to='/'>Main</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
          <li><NavLink to='/lessons'>Lessons</NavLink></li>
        </ul>
      </nav>
    )
  }
}

export default Nav;