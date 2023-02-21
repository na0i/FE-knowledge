import React, { Component } from "react";
import { Container, List, ListItem } from '@material-ui/core'
import BookListItem from "./BookListItem";

class BookList extends Component {
  render(){
    const books = this.props.books;
    const bookItems = books.map( book => {
      return (
        // 리스트 반복문을 돌릴 때 unique key값을 부여해야 에러가 생기지 않는다.
        <ListItem key={book.ISBN}>
          <BookListItem book={book}></BookListItem>
        </ListItem>
      )
    })

    return(
      <Container maxWidth='sm'>
        <List>
          {bookItems}
        </List>
      </Container>
    )
  }
}

// BookList 컴포넌트를 외부에서 사용할 수 있도록 함
export default BookList;

// props를 받는 두가지 방법
// 1.
// const books = this.props.books;
// 2. 구조 분해 할당 문법(es6 문법)
// const { books } = this.props;