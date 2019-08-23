import React = require('react')
import { connect } from 'react-redux'

const styles = require('./index.css')


const Console = () => {

  return  (
    <div className={styles.console}>console</div>
  )
}


export default connect()(Console)