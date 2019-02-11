import React from 'react';
import Square from './square.js';

/**
 * Board that contains 3x3 squares.
 */
class Board extends React.Component {
  renderSquare(i) {
    let squareClass = 'square';
    if (
      this.props.winningSquares &&
      (
        this.props.winningSquares[0] === i ||
        this.props.winningSquares[1] === i ||
        this.props.winningSquares[2] === i
      )
    ) {
      squareClass += ' highlighted';
    }
    return (
    <Square
      key={i}
      buttonClass={squareClass}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />
    );
  }
  
  createBoard(numRows, numCols) {
    const rows = [];
    let index = 0;
    for (let i = 0; i < numRows; i++) {
      const cols = [];
      for (let j = 0; j < numCols; j++) {
        cols.push(this.renderSquare(index++));
      }
      rows.push(<div key={i} className="board-row">{cols}</div>);
    }
    return rows;
  }
  
  render() {
    return <div>{this.createBoard(3, 3)}</div>;
  }
}

export default Board;
