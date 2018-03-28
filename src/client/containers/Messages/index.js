import React from 'react';

import { subscribeToMessages, sendNewMessage } from '../../socket';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      messages: []
    };

    subscribeToMessages((err, msg) => {
      this.setState({
        messages: [...this.state.messages, msg] 
      });
    });
  }

  onClickSumbitMessage(e) {
    e.preventDefault();
    sendNewMessage(this.state.val);
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
      <div>
        <ul id='messages'>
          {this.state.messages.map(message => (
            <li>{message}</li>
          ))}
        </ul>
        <form action=''>
          <input 
            value={this.state.val}
            placeholder='Enter message'
            onChange={(e) => this.onChangeUpdateValue(e)}/>
          <button
            onClick={(e) => this.onClickSumbitMessage(e)}
            >Send
          </button>
        </form>
      </div>
    )
  }
}

export default Messages;
