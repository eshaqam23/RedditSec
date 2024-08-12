import React, { useState } from 'react';

function Scores(props) {
  const [data, setData] = useState(props.data);

  // Handle incrementing the score
  const handleIncrement = (id) => {
    setData(prevData =>
      prevData.map(post => {
        if (post.id === id) {
          if (post.isIncremented) {
            return { ...post, score: post.score - 1, isIncremented: false };
          } else if (post.isDecremented) {
            return { ...post, score: post.score + 2, isIncremented: true, isDecremented: false };
          } else {
            return { ...post, score: post.score + 1, isIncremented: true };
          }
        }
        return post;
      })
    );
  };

  // Handle decrementing the score
  const handleDecrement = (id) => {
    setData(prevData =>
      prevData.map(post => {
        if (post.id === id) {
          if (post.isIncremented) {
            return { ...post, score: post.score - 2, isIncremented: false, isDecremented: true };
          } else if (post.isDecremented) {
            return { ...post, score: post.score + 1, isDecremented: false };
          } else {
            return { ...post, score: post.score - 1, isDecremented: true };
          }
        }
        return post;
      })
    );
  };

  // Get the current post based on the identification
  const currentPost = data.find(post => post.id === props.identification);

  // If the current post does not exist, return null
  if (!currentPost) return null;

  return (
    <div className="scoreSymbols">
      <button
        style={{ color: currentPost.isIncremented ? 'green' : 'black' }}
        onClick={() => handleIncrement(currentPost.id)}
      >
        <i className="material-icons">arrow_upward</i>
      </button>
      <p className="score">{currentPost.score}</p>
      <button
        style={{ color: currentPost.isDecremented ? 'red' : 'black' }}
        onClick={() => handleDecrement(currentPost.id)}
      >
        <i className="material-icons">arrow_downward</i>
      </button>
    </div>
  );
}

export default Scores;