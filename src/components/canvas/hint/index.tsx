import React = require('react')
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';

import { highlightPixel } from '../../../actions/data'


const getPixel = (
  mousePosition,
  pixelSize,
  data,
  offsets,
  canvas
) => {
  if (data) {
    const canvasPos = canvas.getBoundingClientRect()

    const relativePositionX = mousePosition.x - canvasPos.left
    const relativePositionY = mousePosition.y - canvasPos.top

    const x = Math.floor(relativePositionX / pixelSize)
    const y = Math.floor(relativePositionY / pixelSize)

    const temperatures = String(data).split('~').map(arr => (
      JSON.parse(arr)
    ))

    return  {
      temperature: Math.round(temperatures[y][x] + offsets[y][x]),
      xIndex: x,
      yIndex: y
    }
  }
    return {
      temperature: null,
    }
}

const Hint = ({
  mousePosition,
  pixelSize,
  comData,
  offsets,
  canvas,
}) => {

  const pixel = getPixel(
    mousePosition, 
    pixelSize, 
    comData.data,
    offsets,
    canvas
  )

  const { temperature, xIndex, yIndex } = pixel

  // onHighlightPixel(xIndex, yIndex)

  const { x, y } = mousePosition

  return (
    <Card
      style={{
        position: 'fixed',
        zIndex: 10,
        left: x,
        top: y,
        transform: 'translateY(-100%)',
        padding: 5
      }}
    >
      { temperature
        ? `${temperature} °C`
        : 'visualization area'
      }
    </Card>
  );
}

const mapStateToProps = ({ data }) => (
  {
    ...data
  }
)

const mapDispatchToProps = dispatch => (
  {
    onHighlightPixel: (x, y) => dispatch(highlightPixel(x, y))
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hint);
