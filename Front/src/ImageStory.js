import React from "react";

function ImageStory({ src }) {
  return <image src={`http://localhost:4000/images/${src}`} />;
}

export default ImageStory;
