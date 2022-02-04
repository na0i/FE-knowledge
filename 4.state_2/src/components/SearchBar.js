import React, { Component } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import  SearchIcon from '@material-ui/icons/Search';

class SearchBar extends Component{
  render(){
    return(
      <TextField
        InputProps={
          {startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )}}
      >

      </TextField>
    )
  }
}

export default SearchBar;