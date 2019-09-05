const React = require('react')
import { Typography } from '@material-ui/core'

const styles = require('./index.css')


class Message extends React.PureComponent {
  time: string
  props: { message: string }

  componentWillMount() {
    this.time = new Date().toLocaleTimeString()
  }

  render = () => (
    <div className={styles.wrapper}>
      <Typography variant="body1" component="p">{this.props.message}</Typography>
      <Typography variant="caption" component="p">{this.time}</Typography>
    </div>
  )
}


export default Message