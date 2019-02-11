import React from 'react';
import Board from './board.js';

/**
 * Tic-tac-toe game.
 */
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      isAscending: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        coordinates: indexToCoordinates(i),
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      console.debug(step);
      console.debug(move);
      const desc = move ?
        'Go to move #' + move + ': (' + step.coordinates.row + ', ' + step.coordinates.col + ')':
        'Go to game start';
      const itemClass = move === this.state.stepNumber ? 'move-selected' : '';
      return (
        <li key={move} className={itemClass}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner.player;
    } else if (isBoardFull(current.squares)) {
      status = 'Draw!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    } 

    const isReversed = !this.state.isAscending;
    if (isReversed) {
      moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningSquares={winner && winner.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.sortMoves()}>Sort</button>
          <ol reversed={isReversed}>{moves}</ol>
        </div>
      </div>
    );
  }

  sortMoves() {
    this.setState({
      isAscending: !this.state.isAscending
    });
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        squares: lines[i],
      };
    }
  }
  return null;
}

function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      return false;
    }
  }
  return true;
}

function indexToCoordinates(index) {
  return {
    row: Math.floor(index / 3) + 1,
    col: index % 3 + 1,
  }
}

export default Game;
