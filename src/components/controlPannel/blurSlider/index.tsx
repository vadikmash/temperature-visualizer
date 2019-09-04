const React = require('react')


import { connect } from 'react-redux';

import {
  Typography,
  Slider,
  Input
} from '@material-ui/core';



import { setBlur } from '../../../actions/data';
import { style } from '@material-ui/system';

const styles = require('./index.css')


const BlurSlider = ({ 
  blur,
  onSetBlur
}) => (
  <div>
    <Typography id="port-dropdown" gutterBottom className={styles.lol} style={{background: 'black'}}>
      Set blurrr@!!
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
  </div>
)


const mapStateToProps = ({ data }) => (
  {
    ...data
  }
)

const mapDispatchToProps = dispatch => (
  {
    onSetBlur: blur => dispatch(setBlur((blur > 100 ? 100 : blur) < 0 ? 0 : (blur > 100 ? 100 : blur)))
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlurSlider)