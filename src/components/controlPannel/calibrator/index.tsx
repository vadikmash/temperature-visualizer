const React = require('react')
import { connect } from 'react-redux'

import {
  Typography,
  Button,
} from '@material-ui/core'

import {
  setOffsets
} from '../../../actions/data'

const styles = require('./index.css')



const Calibrator = ({ 
  onCalibrate,
  onResetCalibtarion
}) => (
  <div className={styles.wrapper}>
    <Typography>
      Calibration
    </Typography>
    <div className={styles.buttonPannel}>
      <div className={styles.button}>
        <Button
          className={styles.button}
          color="secondary"
          variant="contained"
          onClick={onCalibrate}
        >
          Calibrate
        </Button>
      </div>
      <div className={styles.button}>
        <Button
          className={styles.button}
          color="secondary"
          variant="contained"
          onClick={onResetCalibtarion}
        >
          Reset
        </Button>
      </div>
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
    onCalibrate: () => dispatch(setOffsets('calibrate')),
    onResetCalibtarion: () => dispatch(setOffsets('reset'))
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calibrator)