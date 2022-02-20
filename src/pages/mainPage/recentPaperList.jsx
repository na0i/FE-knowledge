import React, { useEffect, useState } from "react";
import axios from "axios";
import RecentPaperListItem from "./recentPaperListItem";

const RecentPaperList = () => {
  let [recentPaperList, setRecentPaperList] = useState('');

  function getRecentPaperList(){
    axios({
      url: 'https://mocki.io/v1/802aed96-04da-47c8-b0f0-8464cf84650e',
      method: 'GET',
    })
    .then((res) => {
      setRecentPaperList(res.data.map(paper => {
        return (
          <RecentPaperListItem
            key = {paper.id}
            {...paper}
          />
        )
      }));
    })
  }

  useEffect(()=>{
    getRecentPaperList();
  }, [])

  return(
    <div>
      {recentPaperList}
    </div>
  );
};

export default RecentPaperList;