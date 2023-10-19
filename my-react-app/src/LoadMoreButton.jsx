import React from "react";

// classnames, function, 
const LoadMoreButton = ({ onClick }) => (
    <button onClick={onClick} className="btn-load">
      Load More
    </button>
  );
  
export default LoadMoreButton;