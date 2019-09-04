const React = require('react')


import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'

const styles = require('./index.css')


class Console extends React.PureComponent {
  props: { logMessages: any; };
  body: HTMLDivElement;
  prevLength: number = 0;

  componentDidUpdate() {
    const { body, prevLength } = this
    const { logMessages } = this.props

    if (body && logMessages.length > prevLength) {
      body.scrollTo(0, body.scrollHeight)
      this.prevLength = logMessages.length
    } 
  }

  render() {
    const { logMessages } = this.props

    return (
      <div 
        className={styles.console}
        ref={node => this.body = node}
      >
        <main></main>
          {
            logMessages.map((message, indx) => (
              <Typography variant="body1" component="p" key={indx}>{message}</Typography>
            ))
          }
      </div>
    )
  }
}

const mapStateToProps = ({ data }) => (
  {
    ...data
  }
)


export default connect(mapStateToProps)(Console)