import React = require('react')
import { connect } from 'react-redux'

const styles = require('./index.css')
const Hint = require('./hint').default

import { 
  setCanvas,
  findAvailablePorts,
  showHint,
  hideHint,
} from '../../actions/data'


let canvas
class Canvas extends React.PureComponent {
  componentDidMount() {
    const { 
      onSetCanvas,
      onShowHint,
      onHideHint,
      onCancelHighlights
     }: any = this.props
    onSetCanvas(canvas)
    findAvailablePorts()
    setInterval(findAvailablePorts, 1500)

    canvas.addEventListener('mousemove', onShowHint)
    canvas.addEventListener('mouseleave', onHideHint)
  }

  render() {
    const { hintIsVisible }:any = this.props

    return (
      <>
      <canvas
        height="192"
        width="768"
        className={styles.canvas}
        ref={ node => canvas = node }
      >
      </canvas>
      { hintIsVisible ? <Hint /> : null }
      </>
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
    onSetCanvas: canvas => dispatch(setCanvas(canvas)),
    onShowHint: event => dispatch(showHint(event)),
    onHideHint: () => dispatch(hideHint()),
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas)
