import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core'

const styles = {
  image: {
    width: 128,
    height: 164,
  },
  textArea: {
    width: 390,
  },
}
// console.log(this.props);

class BookListItem extends Component {
  render(){
    const { book, classes } = this.props;
    return(
      <Paper>
        <Grid container spacing={2}>
          <Grid item>
            <img className={classes.image} src={book.imgUrl}></img>
          </Grid>
          <Grid item className={classes.textArea}>
            <Typography component='h5' variant='h5'>
              {book.title}
            </Typography>
            <Typography gutterBottom>
              {book.author}
            </Typography>
            <Typography color='textSecondary'>
              {book.introduce}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

// BookListItem에 props로 이 styles 객체를 받을 수 있음
export default withStyles(styles) (BookListItem);