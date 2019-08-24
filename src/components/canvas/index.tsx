import React = require('react')
import { connect } from 'react-redux'
const styles = require('./index.css')


import { 
  setCanvas,
  findAvailablePorts
} from '../../actions/data'


let canvas
class Canvas extends React.PureComponent {
  componentDidMount() {
    const { onSetCanvas }: any = this.props
    onSetCanvas(canvas)
    findAvailablePorts()
    setInterval(findAvailablePorts, 1500)
  }

  render() {

    return (
      <canvas
        height="192"
        width="768"
        className={styles.canvas}
        ref={ node => canvas = node }
      >
      </canvas>
    )
  }
}


const mapStateToProps = ({data}) => (
  {
    ...data
  }
)

const mapDispatchToProps = dispatch => (
  {
    onSetCanvas: canvas => dispatch(setCanvas(canvas))
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas)
