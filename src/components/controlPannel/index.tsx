const React = require('react')


import { connect } from 'react-redux'

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
} from '@material-ui/core'

import Recorder from './recorder'
import PortSelector from './portSelector'
import VisualizerSelector from './visualizerSelector'
import RangeSlider from './rangeSlider'
import BlurSlider from './blurSlider'
import ModeSelector from './modeSelector'
import Calibrator from './calibrator'
import Freezer from './freezer'


import {
  saveImage,
  logToFile,
  setDisplayMode,
  openWorkdir
} from '../../actions/data'

const styles = require('./index.css')



const ControlPannel = () => (
  <div className={styles.pannel}>
    <PortSelector />
    <VisualizerSelector />
    <RangeSlider />
    <BlurSlider />
    <Calibrator />
    <ModeSelector />
    <Freezer />
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => logToFile()} 
      >
        Log to file
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={saveImage}
      >
        Save image
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={openWorkdir}
      > 
        Open folder
      </Button>
    </div>
    <Recorder />    
  </div>
)

const mapStateToProps = ({data}) => (
  {
    ...data
  }
)

const mapDispatchToProps = dispatch => (
  {
    onSetDisplayMode: event => dispatch(setDisplayMode(event.target.value))
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPannel)