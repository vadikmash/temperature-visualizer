const React = require('react')


import { connect } from 'react-redux'

const styles = require('./index.css')

const Hint = require('./hint').default

import { 
  setCanvas,
  findAvailablePorts,
  showHint,
  hideHint,
  initWorkdir,
  loadConfig
} from '../../actions/data'


let canvas
class Canvas extends React.PureComponent {
  componentDidMount() {
    const { 
      onSetCanvas,
      onShowHint,
      onHideHint,
      onInitWorkdir
     }: any = this.props
    onSetCanvas(canvas)
    findAvailablePorts()
    setInterval(findAvailablePorts, 1500)

    onInitWorkdir(null)

    loadConfig()

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


const mapStateToProps = ({ data }) => (
  {
    ...data
  }
)

const mapDispatchToProps = dispatch => (
  {
    onSetCanvas: canvas => dispatch(setCanvas(canvas)),
    onShowHint: event => dispatch(showHint(event)),
    onHideHint: () => dispatch(hideHint()),
    onInitWorkdir: dir => dispatch(initWorkdir(dir))
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas)
