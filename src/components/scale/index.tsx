import React from 'react'
import { connect } from 'react-redux';

const styles = require('./index.css')

const drawPalette = (canvas, visualizer) => {
  if (canvas) {
    const ctx = canvas.getContext('2d')
    for (let i = 0; i < 256; ++i) {
      ctx.beginPath()
      ctx.fillStyle = visualizer(i, 0, 255)
      ctx.rect(0, 255 - i, 30, 1)
      ctx.fill()
    }
  }
}


const Hint = ({
  visualizingFunction,
  range
}) => {


  return (
    <div className={styles.wrapper}>

      <div className={styles.scaleNumbers}>
        <div>{ range[1] }</div>
        <div>{ (range[0] + range[1]) / 2 }</div>
        <div>{ range[0] }</div>
      </div>

      <div className={styles.scaleLines}>
        <div className={styles.largeLine}></div>
        { Array(9).fill(0).map((l, idx) => (<div className={styles.smallLine} key={idx}></div>)) }
        <div className={styles.largeLine}></div>
        { Array(9).fill(0).map((l, idx) => (<div className={styles.smallLine} key={idx + 9}></div>)) }
        <div className={styles.largeLine}></div>
      </div>

      <canvas
        height="256"
        width="30"
        className={styles.palette}  
        ref={ canvas => drawPalette(canvas, visualizingFunction) }
      >
      </canvas>
    </div>
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
