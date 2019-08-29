import React = require('react')
import { connect } from 'react-redux';

import {
  Input,
  MenuItem,
  Select,
  Slider,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

import {
  setPortName,
  setBlur,
  setRange,
  setVisualizer,
  comConnect,
  saveImage,
  logToFile,
  calibrate,
  setDisplayMode,
  openWorkdir
} from '../../actions/data';

const styles = require('./index.css')


const ControlPannel = ({ 
  portName,
  displayMode,
  visualizer,
  blur,
  range,
  avaliablePorts,
  pannels,
  onSetPortName,
  onSetVisualizer,
  onSetBlur,
  onSetRange,
  onComConnect,
  onCalibrate,
  onSetDisplayMode
}) => (
  <div className={styles.pannel}>
    <Typography id="port-dropdown" gutterBottom>
      Select port
    </Typography>
    <Select
      value={portName}
      onChange={e => { 
        onSetPortName(e.target.value)
        onComConnect()
      }}
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
      <MenuItem key="RGB" value="RGB">
        RGB
      </MenuItem>
      <MenuItem key="RB" value="RB">
        Red&Blue
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
    <div>
      <Button
        onClick={logToFile} 
        color="primary"
      >
        Log to file
      </Button>
      <Button
        color="secondary"
        onClick={saveImage}
      >
        Save image
      </Button>
      <Button
        color="secondary"
        onClick={openWorkdir}
      > 
        Open folder
      </Button>
      <br />
      <Button
        color="primary"
        onClick={onCalibrate}
      >
        Calibrate
      </Button>
    </div>
    <div>
      {
        pannels
        ? <RadioGroup
            aria-label="display mode"
            name="display"
            value={displayMode}
            onChange={onSetDisplayMode}
          >
            <FormControlLabel value="pixel" control={<Radio />} label="Pixel mode" />
            <FormControlLabel value="pannel" control={<Radio />} label="Pannel mode" />
          </RadioGroup>
        : null
      }
    </div>
  </div>
)

const mapStateToProps = ({data}) => (
  {
    ...data
  }
)

const mapDispatchToProps = dispatch => (
  {
    onSetPortName: port => dispatch(setPortName(port)),
    onSetBlur: blur => dispatch(setBlur((blur > 100 ? 100 : blur) < 0 ? 0 : (blur > 100 ? 100 : blur))),
    onSetRange: range => dispatch(setRange(range)),
    onSetVisualizer: visualizer => dispatch(setVisualizer(visualizer)),
    onComConnect: () => dispatch(comConnect()),
    onCalibrate: () => dispatch(calibrate()),
    onSetDisplayMode: event => dispatch(setDisplayMode(event.target.value))
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPannel)