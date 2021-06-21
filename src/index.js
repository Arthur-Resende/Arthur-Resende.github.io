import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css'

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

  findDirection(tile) {
    const tiles = this.state.tiles
    const x = this.state.indexZero[0]
    const y = this.state.indexZero[1]

    if(tile === tiles[x][y-1])
      this.moveRight()
    else if(tile === tiles[x][y+1])
      this.moveLeft()
    else if(x===1 && tile===tiles[x-1][y])
      this.moveDown()
    else if(x===0 && tile===tiles[x+1][y])
      this.moveUp()
    else
      alert('nowere near zero')
  }

  render() {
    return(
      <div className="board">
        {this.state.tiles.map(row => (
          row.map(tile => (
            <button
              className="tile"
              id={'number' + tile}
              onClick={() => this.findDirection(tile)}
            >
              {tile}
            </button>
          ))
        ))}
        {/* <button onClick={() => this.moveLeft()}>{`<`}</button>
        <button onClick={() => this.moveUp()}>^</button>
        <button onClick={() => this.moveDown()}>v</button>
        <button onClick={() => this.moveRight()}>{'>'}</button> */}
      </div>
    );
  }
}

ReactDOM.render(
  <Tiles></Tiles>,
  document.getElementById('root')
);