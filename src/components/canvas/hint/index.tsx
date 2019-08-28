import React = require('react')
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';


const Hint = ({
  mousePosition,
  comData,
  hoverPixel,
  offsets,
  displayMode,
  hoverPannel,
  pannels
}) => {
  const { posX, posY } = mousePosition


  const { x, y } = hoverPixel
  const { temperatures } = comData

  let temperature = null

  if (displayMode === 'pixel') {
    if (temperatures) {
      temperature = Math.round(temperatures[y][x] + offsets[y][x])
    }
  }

  if (hoverPannel && displayMode === 'pannel') {
    if (temperatures) {
      temperature = pannels[hoverPannel].reduce((accum, pixel) => {
        const [x, y] = pixel
        return accum + Math.round(temperatures[y][x] + offsets[y][x])
      }, 0) / pannels[hoverPannel].length
    }
  }

  return (
    <Card
      style={{
        position: 'fixed',
        zIndex: 10,
        left: posX,
        top: posY,
        transform: 'translateY(-100%)',
        padding: 5
      }}
    >
      { temperature
        ? hoverPannel 
          ? `${hoverPannel}:   ${temperature} °C`
          : `${temperature} °C`
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


export default connect(
  mapStateToProps
)(Hint);
