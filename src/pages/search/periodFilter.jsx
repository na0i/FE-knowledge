import React from 'react';
import styled from 'styled-components';

const PeriodFilter = ({years, onSelectedYear}) => {
  return(
    <PeriodDiv>
      <div className='mt-16 mb-16 blue'>등재일</div>
      {years.map((year) => {
        if (year.id === 0){
          return(<div className='mb-8' key={year.id} onClick={() => onSelectedYear(year)}>전체보기</div>)
        } else if (year.id === 5){
          return(<div className='mb-8' key={year.id} onClick={() => onSelectedYear(year)}>{year.name}</div>)
        } else {
          return(<div className='mb-8' key={year.id} onClick={() => onSelectedYear(year)}>{year.name}년 부터</div>)
        }
      }
      )}
    </PeriodDiv>
  );
}

export default PeriodFilter;

const PeriodDiv = styled.div`
  text-align: right;
  margin: 5% 20% 0% 0%;
`