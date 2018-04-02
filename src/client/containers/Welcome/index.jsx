import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../components/Input';
import BtnLink from '../../components/BtnLink';
import { Wrapper, Message } from '../../components';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  onChangeUpdateName(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value,
    });
  }

  render() {
    return (
      <Wrapper>
        <Message>To begin, enter your name below!</Message>
        <form>
          <Input
            onChange={e => this.onChangeUpdateName(e)}
            type="text"
            placeholder="Enter name"
            value={this.state.name}
          />
          <BtnLink
            to="/home"
            onClick={() => this.props.updateName(this.state.name)}
          >Start
          </BtnLink>
        </form>
      </Wrapper>
    );
  }
}

Welcome.propTypes = {
  updateName: PropTypes.func.isRequired,
};

export default Welcome;
