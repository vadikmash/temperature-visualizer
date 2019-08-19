import React = require('react')


let canvas;

let size = 120

class Canvas extends React.Component {
  componentDidMount() {
    console.log('mount')
    var ctx = canvas.getContext("2d");
    ctx.rect(20, 20, 20 + size, size);
    ctx.stroke();
  }

  render() {

    return (
      <canvas
        ref={ node => canvas = node }
      >
      </canvas>
    )
  }
}

export default Canvas
