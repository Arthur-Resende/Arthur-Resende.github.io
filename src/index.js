import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import '../src/index.css'

class Tiles extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      size: this.props.size,
      tiles: Array.from(
        { length: (this.props.size ** 2) }, (v, k) => {
          if (k !== this.props.size ** 2 - 1) { return k + 1 } else { return 0 }
        }),
      indexZero: this.props.size ** 2 - 1,
      winner: false
    }
  }

  didItWin () {
    const tiles = this.state.tiles
    const winningOrder = Array.from(
      { length: (this.props.size ** 2) }, (v, k) => {
        if (k !== this.props.size ** 2 - 1) { return k + 1 } else { return 0 }
      })

    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] !== winningOrder[i]) {
        return false
      }
    }

    alert('you won')
  }

  move (position) {
    const tiles = this.state.tiles
    const indexZero = this.state.indexZero

    tiles[indexZero] = tiles[position]
    tiles[position] = 0
    this.setState({
      tiles: tiles,
      indexZero: position
    })
  }

  findDirection (tile) {
    const tiles = this.state.tiles
    const indexZero = this.state.indexZero

    switch (tile) {
      case tiles[indexZero - 1]:
        this.move(indexZero - 1)
        break

      case tiles[indexZero + 1]:
        this.move(indexZero + 1)
        break

      case tiles[indexZero - this.state.size]:
        this.move(indexZero - this.state.size)
        break

      case tiles[indexZero + this.state.size]:
        this.move(indexZero + this.state.size)
        break

      default:
        break
    }
  }

  render () {
    return (
      <div>
        {this.state.tiles.map((tile) => (
          <button
            key={tile}
            className = "tile"
            id = { 'number' + tile }
            onClick={ () => { this.findDirection(tile); this.didItWin() } }
          >
            {tile}
          </button>
        ))}
      </div>
    )
  }
}

Tiles.propTypes = {
  size: PropTypes.number.isRequired
}

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sizeOfGame: 4
    }
  }

  render () {
    return (
      <div className="board">
        <Tiles size={this.state.sizeOfGame}></Tiles>
        {this.state.sizeOfGame}
      </div>
    )
  }
}

ReactDOM.render(
  <Board></Board>,
  document.getElementById('root')
)
