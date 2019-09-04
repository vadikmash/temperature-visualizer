const React = require('react')


import { connect } from 'react-redux';

import {
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';

import { setVisualizer } from '../../../actions/data';

const styles = require('./index.css')



const VisualizerSelector = ({ 
  visualizer,
  onSetVisualizer
}) => (
  <div>
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
      <MenuItem key="RGB" value="RGB">
        RGB
      </MenuItem>
      <MenuItem key="RB" value="RB">
        Red&Blue
      </MenuItem>
    </Select>
  </div>
)

const mapStateToProps = ({ data }) => (
  {
    ...data
  }
)

const mapDispatchToProps = dispatch => (
  {
    onSetVisualizer: visualizer => dispatch(setVisualizer(visualizer))
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizerSelector)