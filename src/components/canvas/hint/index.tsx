import React = require('react')
import { connect } from 'react-redux';
import {
  Card
} from '@material-ui/core';


const getPixelTemperature = (
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

    return Math.round(temperatures[y][x] + offsets[y][x])
  }
    return null
}

const Hint = ({
  mousePosition,
  pixelSize,
  comData,
  offsets,
  canvas
}) => {

  const temerature = getPixelTemperature(
    mousePosition, 
    pixelSize, 
    comData.data,
    offsets,
    canvas
  )

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
      { temerature
        ? `${temerature} °C`
        : 'visualization area'
      }
    </Card>
  );
}

const mapStateToProps = ({data}) => (
  {
    ...data
  }
)


export default connect(mapStateToProps)(Hint);
