import React from 'react';
import ReactDOM from 'react-dom';

class Tiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [[0, 1, 2], [3, 4, 5]],
    }
  }

  changeTiles(row, column) {
    let tilesCopy = this.state.tiles
    let temp = tilesCopy[row][column];

    tilesCopy[row][column] = tilesCopy[row][column + 1];
    tilesCopy[row][column + 1] = temp;
    temp = null;

    this.setState({
      tiles: tilesCopy,
    });
  }

  render() {
    return(
      <div className="tiles">
        <h1>{this.state.tiles[0]}</h1>
        <h1>{this.state.tiles[1]}</h1>
        <button onClick={() => this.changeTiles(0, 0)}>eh</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Tiles></Tiles>,
  document.getElementById('root')
);