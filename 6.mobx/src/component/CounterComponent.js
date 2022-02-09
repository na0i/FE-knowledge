import React, { Component } from 'react';
import { Button, Box } from '@material-ui/core';

import { inject, observer } from 'mobx-react';

// provider로 제공되는 store 중에서 counterStore를 props에 injection(주입)
@inject('counterStore')
@observer
class CounterComponent extends Component {

  render(){

    const { counterStore } = this.props;

    return(
      <div>
        <Button 
          // increment와 decrement 함수를 작성하고 실행시켜보니
          // console엔 count 변수가 잘 변하고 있는데 화면에는 아무런 변화가 없음
          // counterComponent가 observable한 data를 주시하고 있다는 API를 사용해주어야 함 = observer
          // 1. @observer를 추가해주고
          // 2. store에 makeObservable(this); 코드를 추가
          onClick={() => counterStore.decrement()}
          variant='contained' color='primary' size='large'> - </Button>        
        
        <Box component='span' m={5}> {counterStore.count} </Box>
        
        <Button 
          onClick={() => counterStore.increment()}
          variant='contained' color='primary' size='large'> + </Button>
      </div>
    )
  }
}

export default CounterComponent;