import React from 'react'
import { connect } from 'react-redux';

import {
  Typography,
  Slider
} from '@material-ui/core';

import { setRange } from '../../../actions/data';

const styles = require('./index.css')


const RangeSlider = ({ 
  range,
  onSetRange
}) => (
  <div>
    <Typography id="range-slider" gutterBottom>
      Temperature range
    </Typography>
    <Slider
      value={range}
      onChange={(e, newRange) => onSetRange(newRange)}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      min={-40}
      max={85}
    />
  </div>
)


const mapStateToProps = ({ data }) => (
  {
    ...data
  }
)

const mapDispatchToProps = dispatch => (
  {
    onSetRange: range => dispatch(setRange(range))
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RangeSlider)