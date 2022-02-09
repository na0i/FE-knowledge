import React, { PureComponent } from 'react';

import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';

import { observer } from 'mobx-react';

@observer
class TodoListView extends PureComponent {
  render(){

    const { todos } = this.props;

    return (
      <TableContainer component={Paper} >
        <Table m={3}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Title</TableCell>
              <TableCell align='center'>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Array.isArray(todos) && todos.length ?
              todos.map( (todo) => (
              <TableRow key={todo.id} >
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.date}</TableCell>
              </TableRow> 
            ))
            :
            <TableRow>
              <TableCell>Empty</TableCell>
            </TableRow>
            }
            
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default TodoListView;