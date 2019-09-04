import React from 'react'
import { connect } from 'react-redux';

import {
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';

import {
  updatePort
} from '../../../actions/data';

const styles = require('./index.css')


const PortSelector = ({ 
  portName,
  avaliablePorts
}) => (
  <div>
    <Typography id="port-dropdown" gutterBottom>
      Select port
    </Typography>
    <Select
      value={portName}
      onChange={e => { 
        updatePort(e.target.value)
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
  </div>
)


const mapStateToProps = ({ data }) => (
  {
    ...data
  }
)


export default connect(
  mapStateToProps
)(PortSelector)