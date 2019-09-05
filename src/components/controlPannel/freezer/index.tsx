const React = require('react')
import { connect } from 'react-redux'

import {
  Typography,
  Button,
} from '@material-ui/core'

import {
  toggleFreeze
} from '../../../actions/data'

const styles = require('./index.css')



const Freezer = ({ 
  isFreezed,
  onToggleFreeze
}) => (
  <div className={styles.wrapper}>
    <Typography>
      State freezer
    </Typography>
    <div className={styles.button}>
      <Button
        className={styles.button}
        color="secondary"
        variant="contained"
        onClick={onToggleFreeze}
      >
        {
          isFreezed
          ? 'Unfreeze'
          : 'Freeze'
        }
      </Button>
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
    onToggleFreeze: () => dispatch(toggleFreeze()),
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Freezer)