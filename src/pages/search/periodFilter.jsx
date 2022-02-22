import React from 'react';
import styled from 'styled-components';

const periodFilter = ({years, onSelectedYear}) => {
  return(
    <PeriodFilter>
      <div className='mb-8 blue'>등재일</div>
      {years.map((year) => {
        if (year.id === 0 || year.id === 5){
          return(
            <div className='mb-8' key={year.id} onClick={() => onSelectedYear(year.id)}>{year.name}</div>)
          } else {
            return(
            <div className='mb-8' key={year.id} onClick={() => onSelectedYear(year.id)}>{year.name}년 부터</div>)
          }
        }
      )}
    </PeriodFilter>
  );
}

export default periodFilter;

const PeriodFilter = styled.div`
  text-align: right;
  margin: 5% 20% 0% 0%;
`