import React from 'react';
import ReactDOM from 'react-dom';

class Tiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [[0, 1, 2], [3, 4, 5]],
      indexZero: [0, 0],
    }
  }

  moveLeft() {
    let tiles = this.state.tiles;
    const i = this.state.indexZero[0];
    const j = this.state.indexZero[1];
    
    if(j===2) return;

    tiles[i][j] = tiles[i][j+1];
    tiles[i][j+1] = 0;
    this.setState({
      tiles: tiles,
      indexZero: [i, j+1],
    });
  }

  moveRight() {
    let tiles = this.state.tiles;
    const i = this.state.indexZero[0];
    const j = this.state.indexZero[1];

    if(j===0) return;

    tiles[i][j] = tiles[i][j-1];
    tiles[i][j-1] = 0;
    this.setState({
      tiles: tiles,
      indexZero: [i, j-1],
    });
  }

  moveUp() {
    let tiles = this.state.tiles;
    const i = this.state.indexZero[0];
    const j = this.state.indexZero[1];

    if(i===1) return;

    tiles[i][j] = tiles[i+1][j];
    tiles[i+1][j] = 0;
    this.setState({
      tiles: tiles,
      indexZero: [i+1, j],
    });
  }

  moveDown() {
    let tiles = this.state.tiles;
    const i = this.state.indexZero[0];
    const j = this.state.indexZero[1];

    if(i===0) return;

    tiles[i][j] = tiles[i-1][j];
    tiles[i-1][j] = 0;
    this.setState({
      tiles: tiles,
      indexZero: [i-1, j],
    });
  }

  // changeTiles(r, c) {
  //   let tilesCopy = this.state.tiles
  //   let temp = tilesCopy[r][c];

  //   tilesCopy[r][c] = tilesCopy[r][c + 1];
  //   tilesCopy[r][c + 1] = temp;
  //   temp = null;

  //   this.setState({
  //     tiles: tilesCopy,
  //   });
  // }

  render() {
    return(
      <div className="tiles">
        <h1>{this.state.tiles[0]}</h1>
        <h1>{this.state.tiles[1]}</h1>
        <button onClick={() => this.moveLeft()}>{`<`}</button>
        <button onClick={() => this.moveUp()}>^</button>
        <button onClick={() => this.moveDown()}>v</button>
        <button onClick={() => this.moveRight()}>{'>'}</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Tiles></Tiles>,
  document.getElementById('root')
);