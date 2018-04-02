import React from 'react';
import PropTypes from 'prop-types';

import MsgBody from './MessageBody';
import { subscribeToMessages, sendNewMessage } from '../../socket';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      messages: [],
    };

    subscribeToMessages((err, msg) => {
      this.setState({
        messages: [...this.state.messages, msg],
      });
    });
  }

  onClickSumbitMessage(e) {
    const message = `${this.props.name}: ${this.state.val}`;
    const { gameId } = this.props;
    e.preventDefault();
    sendNewMessage({ message, gameId });
    this.setState({
      val: '',
    });
  }

  onChangeUpdateValue(e) {
    this.setState({
      val: e.target.value,
    });
  }

  render() {
    return (
      <MsgBody>
        <div>
          {this.state.messages.map(message => (
            <p
              key={message}
            >
              {message}
            </p>
          ))}
        </div>
        <form>
          <input
            value={this.state.val}
            placeholder="Enter message"
            onChange={e => this.onChangeUpdateValue(e)}
          />
          <button
            onClick={e => this.onClickSumbitMessage(e)}
          >Send
          </button>
        </form>
      </MsgBody>
    );
  }
}

Messages.propTypes = {
  name: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
};

export default Messages;
