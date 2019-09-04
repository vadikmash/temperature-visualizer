import React from 'react'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'

// const styles = require('./index.css')


const Console = ({ logMessages }) => {

  return  (
    <div className={'console'}>
      {
        logMessages.map((message, indx) => (
          <Typography variant="body1" component="p" key={indx}>{message}</Typography>
        ))
      }
    </div>
  )
}

const mapStateToProps = ({ data }) => (
  {
    ...data
  }
)


export default connect(mapStateToProps)(Console)