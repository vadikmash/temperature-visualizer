import React = require('react')
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';


const Hint = ({
  mousePosition,
  comData,
  hoverPixel,
  offsets
}) => {
  const { posX, posY } = mousePosition
  const { x, y } = hoverPixel
  const { temperatures } = comData

  let temperature = null

  if (temperatures) {
    temperature = Math.round(temperatures[y][x] + offsets[y][x])
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


export default connect(
  mapStateToProps
)(Hint);
