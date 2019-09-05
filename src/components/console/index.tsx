const React = require('react')
import { connect } from 'react-redux'

const styles = require('./index.css')
const Message = require('./message').default

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

  render = () => (
    <div 
      className={styles.console}
      ref={node => this.body = node}
    >
        {
          this.props.logMessages.map((message, indx) => (
            <Message message={message} key={indx}/>
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