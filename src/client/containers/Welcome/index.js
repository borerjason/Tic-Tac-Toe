import React from 'react';

import Input from '../../components/Input';
import LinkBtn from '../../components/Link';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }

  onChangeUpdateName(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }

  render() {
    return (
      <form>
        <Input
          onChange={(e) => this.onChangeUpdateName(e)}
          type='text'
          placeholder='Enter name'
          value={this.state.name}
        />
        <LinkBtn  
           /* className='btn-primary' */
           to='/home'
           onClick={() => this.props.updateName(this.state.name)}
        >Start
        </LinkBtn>
      </form>
      )
    }
  }

  export default Welcome;