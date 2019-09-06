const React = require('react')


import { connect } from 'react-redux';

import {
  Typography,
  Button,
  Fab
} from '@material-ui/core';

import { Stop, Pause, FiberManualRecord } from '@material-ui/icons'

import {
  startRecording,
  pauseRecording,
  resumeRecording,
  finishRecording
} from '../../../actions/data';

const styles = require('./index.css')



const Recorder = ({ 
  recording,
  pausedRecording,
  finishedRecording,
  onStartRecording,
  onPauseRecording,
  onResumeRecording,
  onFinishRecording,
  logToFile,
  saveImage,
  openWorkdir
}) => (
  <div>
    <Typography id="port-dropdown" gutterBottom>
      Recording
    </Typography>
    <div className={styles.saveAndLog}>
      <div className={styles.button}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => logToFile()} 
        >
          Log to file
        </Button>
      </div>
      <div className={styles.button}>
        <Button
          color="primary"
          variant="contained"
          onClick={saveImage}
        >
          Save image
        </Button>
      </div>
    </div>
    <div className={styles.recorder}>
      {
        recording 
        ? !pausedRecording
          ?
          <>
            <Fab
              className={styles.recordButton}
              onClick={onPauseRecording}
            >
              <Pause />
            </Fab>
            <Fab
              className={styles.recordButton}
              onClick={onFinishRecording}
            >
              <Stop />
            </Fab>
          </>
          :   
          <>  
            <Fab
              className={styles.recordButton}
              onClick={onResumeRecording}
            >
              <FiberManualRecord />
            </Fab>
            <Fab
              className={styles.recordButton}
              onClick={onFinishRecording}
            >
              <Stop />
            </Fab>
          </>
        : 
        <Fab
          className={styles.recordButton}
          onClick={onStartRecording}
        >
          <FiberManualRecord />
        </Fab>
      }
    </div>
    <div className={styles.button}>
      <Button
        color="primary"
        variant="contained"
        onClick={openWorkdir}
      > 
        Open folder
      </Button>
    </div>
  </div>
)


const mapStateToProps = ({ recording }) => (
  {
    ...recording
  }
)

const mapDispatchToProps = dispatch => (
  {
    onStartRecording: () => dispatch(startRecording()),
    onPauseRecording: () => dispatch(pauseRecording()),
    onResumeRecording: () => dispatch(resumeRecording()),
    onFinishRecording: () => dispatch(finishRecording())
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recorder)