import React, { Component } from 'react';
import { Container, Grid } from '@material-ui/core';
import Books from './static_data/Books';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';

class App extends Component {
  constructor(props){
    // this 객체가 할당되게 하기 위해 super 생성자 지정이 필수적
    super(props);

    this.state = {
      books: Books,
      selectedBook : Books[0],
    }
  }

  onSearchTitle(title){
    let updateList = Books; // 기존값은 Books 데이터
    // filter해서 -1이 아니라면 true 값
    updateList = updateList.filter( book => {
      return book.title.toLowerCase().search(title.toLowerCase()) !== -1;
    });

    this.setState({
      books: updateList,
    });
  }

  onSelectedBook(book){
    this.setState({
      selectedBook : book,
    });
  }

  render(){
    return(
      <Container>
        <SearchBar onSearchTitle={ this.onSearchTitle.bind(this) }></SearchBar>
        <Grid container spacing={2}>
          <Grid item>
            <BookList onSelectedBook={this.onSelectedBook.bind(this)} books={ this.state.books }></BookList>
          </Grid>
          <Grid item>
            <BookDetail book={ this.state.selectedBook }></BookDetail>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default App;
