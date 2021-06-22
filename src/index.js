import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css'

class Tiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]],
      indexZero: [3, 3],
      winner: false,
    }
  }

  didItWin() {
    const tiles = this.state.tiles;
    const winningOrder = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];

    for(let i=0; i<4; i++) {
      for(let j=0; j<4; j++) {
        if(tiles[i][j] !== winningOrder[i][j]) {
          return false;
        }
      }
    }

    return true;
  }

  moveLeft() {
    let tiles = this.state.tiles;
    const i = this.state.indexZero[0];
    const j = this.state.indexZero[1];
    
    if(j===3) return;

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

    if(i===3) return;

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
    else if(x >= 1 && tile===tiles[x-1][y])
      this.moveDown()
    else if(x <= 3 && tile===tiles[x+1][y])
      this.moveUp()
    else
      alert('nowere near zero')

    if(this.didItWin() === true) {
      alert('voce ganhou')
    }
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
        <div>
          {this.state.indexZero[0]},
          {this.state.indexZero[1]}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Tiles></Tiles>,
  document.getElementById('root')
);