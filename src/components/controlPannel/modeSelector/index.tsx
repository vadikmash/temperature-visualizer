import React from 'react'
import { connect } from 'react-redux';

import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

import { setDisplayMode } from '../../../actions/data';

const styles = require('./index.css')


const ModeSelector = ({ 
  pannels, 
  displayMode,
  onSetDisplayMode
}) => (
  <div>
    <Typography id="port-dropdown" gutterBottom>
      Display mode
    </Typography>
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


const mapStateToProps = ({ data }) => (
  {
    ...data
  }
)

const mapDispatchToProps = dispatch => (
  {
    onSetDisplayMode: e => dispatch(setDisplayMode(e.target.value))
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModeSelector)