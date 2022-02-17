import React from "react";

const RecentPaperListItem = (paper) => {
  return(
  <div>
    <span>{paper.title}</span>
    <span>{paper.author} {paper.releaseYear}</span>

  </div>);
};

export default RecentPaperListItem;