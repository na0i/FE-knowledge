import React, { Component } from 'react';
import {Grid, List, ListItem} from '@material-ui/core';
import { NavLink, Route } from 'react-router-dom';
import Lesson from './Lesson'
import lessonsData from '../static-data/lessonsData';

class Lessons extends Component {
  render(){
    const links = lessonsData.map(lesson => {
      return (
        <ListItem component='nav' key={lesson.id}>
          <NavLink to={'/lessons/' + lesson.id}>{lesson.name}</NavLink>
        </ListItem>
      )
    })

    return (
      <Grid container spacing={2}>
        <Grid item>
          <List>{links}</List>
        </Grid>
        <Grid item>
          {/* 전달해줄 파라미터값은 :뒤에 작성 */}
          {/* 꺼내는 방식은 props로 꺼내게 됨 */}
          <Route path='/lessons/:lessonId' component={Lesson}></Route>
        </Grid>
      </Grid>
    )
  }
}

export default Lessons;