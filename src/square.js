import React from 'react';

/**
 * Square that appears on a board.
 */
function Square(props) {
  return (
    <button className={props.buttonClass} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
