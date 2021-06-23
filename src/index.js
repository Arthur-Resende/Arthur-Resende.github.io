import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css'

class Tiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.size,
      tiles: Array.from(
        {length: (this.props.size**2)}, (v, k) => {
          if(k!==this.props.size**2-1){return k + 1} else {return 0}
        }),
      indexZero: this.props.size**2-1,
      winner: false,
    }
  }

  didItWin() {
    const tiles = this.state.tiles;
    const winningOrder = Array.from(
      {length: (this.props.size**2)}, (v, k) => {
        if(k!==this.props.size**2-1){return k + 1} else {return 0}
      });

    for(let i=0; i<tiles.length; i++) {
      if(tiles[i] !== winningOrder[i]) {
        return false;
      }
    }

    alert('you won');
  }

  move(position) {
    let tiles = this.state.tiles;
    const indexZero = this.state.indexZero;

    switch(position) {
      case 'r':
        tiles[indexZero] = tiles[indexZero + 1];
        tiles[indexZero + 1] = 0;
        this.setState({
          tiles: tiles,
          indexZero: indexZero + 1,
        });
        break;
      
      case 'l':
        tiles[indexZero] = tiles[indexZero - 1];
        tiles[indexZero - 1] = 0;
        this.setState({
          tiles: tiles,
          indexZero: indexZero - 1,
        });
        break;

      case 'u':
        tiles[indexZero] = tiles[indexZero - this.state.size];
        tiles[indexZero - this.state.size] = 0;
        this.setState({
          tiles: tiles,
          indexZero: indexZero - this.state.size,
        });
        break;

      case 'd':
        tiles[indexZero] = tiles[indexZero + this.state.size];
        tiles[indexZero + this.state.size] = 0;
        this.setState({
          tiles: tiles,
          indexZero: indexZero + this.state.size,
        });
        break;
      
      default:
        break;
    }
  }

  findDirection(tile) {
    const tiles = this.state.tiles
    const indexZero = this.state.indexZero

    if(tile === tiles[indexZero - 1])
      this.move('l')
    else if(tile === tiles[indexZero + 1])
      this.move('r')
    else if(tile===tiles[indexZero - this.state.size])
      this.move('u')
    else if(tile===tiles[indexZero + this.state.size])
      this.move('d')
    else
      return
  }

  render() {
    return(
      <div>
        {this.state.tiles.map((tile) => (
          <button
            className="tile"
            id={'number' + tile}
            onClick={() => {this.findDirection(tile); this.didItWin()}}
          >
            {tile}
          </button>
        ))}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeOfGame: 4,
    }
  }

  render() {
    return (
      <div className="board">
        <Tiles size={this.state.sizeOfGame}></Tiles>
        {this.state.sizeOfGame}
      </div>
    );
  }
}

ReactDOM.render(
  <Board></Board>,
  document.getElementById('root')
);