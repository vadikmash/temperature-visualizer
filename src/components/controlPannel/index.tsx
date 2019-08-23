import React = require('react')
import { Input, MenuItem, Select, Slider, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

import { setPort, setBlur, setRange, setVisualizer } from '../../actions/data';




const styles = require('./index.css')


const ControlPannel = ({ 
  port,
  visualizer,
  blur,
  range,
  avaliablePorts,
  onSetPort,
  onSetVisualizer,
  onSetBlur,
  onSetRange
}) => (
  <div className={styles.pannel}>
    <Typography id="port-dropdown" gutterBottom>
      Select port
    </Typography>
    <Select
      value={port}
      onChange={(e) => onSetPort(e.target.value)}
    >
      { 
        avaliablePorts
        ? avaliablePorts.map(port => (
            <MenuItem 
            value={port.comName}
            key={port.comName}>
              {port.comName}
            </MenuItem>
          )
        ) 
        : null
      }
    </Select>
    <Typography id="port-dropdown" gutterBottom>
      Select visualizer
    </Typography>
    <Select
      value={visualizer}
      onChange={(e) => onSetVisualizer(e.target.value)}
    >
      <MenuItem key="BW" value="BW">
        Black&White
      </MenuItem>
      <MenuItem key="R" value="R">
        Red
      </MenuItem>
      <MenuItem key="G" value="G">
        Green
      </MenuItem>
      <MenuItem key="B" value="B">
        Blue
      </MenuItem>
    </Select>
    <Typography id="range-slider" gutterBottom>
      Temperature range
    </Typography>
    <Slider
      value={range}
      onChange={(e, newRange) => onSetRange(newRange)}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
    />
    <Typography id="port-dropdown" gutterBottom>
      Set blur
    </Typography>
    <Slider
      value={typeof blur === 'number' ? blur : 0}
      onChange={(e, newBlur) => onSetBlur(newBlur)}
      aria-labelledby="input-slider"
    />
    <Input
      // className={classes.input}
      value={blur}
      margin="dense"
      onChange={
        (e) => onSetBlur(e.target.value === '' ? '' : +e.target.value)
      }
      inputProps={{
        step: 10,
        min: 0,
        max: 100,
        type: 'number',
        'aria-labelledby': 'input-slider',
      }}
    />
  </div>
)

const mapStateToProps = ({data}) => (
  {
    ...data
  }
)

const mapDispatchToProps = dispatch => (
  {
    onSetPort: port => dispatch(setPort(port)),
    onSetBlur: blur => dispatch(setBlur((blur > 100 ? 100 : blur) < 0 ? 0 : (blur > 100 ? 100 : blur))),
    onSetRange: range => dispatch(setRange(range)),
    onSetVisualizer: visualizer => dispatch(setVisualizer(visualizer))
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPannel)