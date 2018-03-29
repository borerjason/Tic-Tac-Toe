import React from 'react';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  onChangeUpdateName(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }

  render() {
    <div>
      <form>
        <input onChange={(e) => this.onChangeUpdateName(e)} type='text' placeholder='Enter name' value=''  />
      </form>
    </div>
  }
}