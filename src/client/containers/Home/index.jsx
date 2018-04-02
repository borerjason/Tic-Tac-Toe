import React from 'react';
import PropTypes from 'prop-types';

import { Message, Wrapper, BtnLink, Input } from '../../components';
import { newGame, joinGame } from '../../socket';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: '',
    };
  }

  onChangeUpdateGameId(e) {
    this.setState({
      gameId: e.target.value,
    });
  }

  onClickJoinGame(e, gameId, name) {
    if (this.state.gameId.length > 0) {
      joinGame({ gameId, name });
    } else {
      e.preventDefault();
    }
  }

  render() {
    return (
      <Wrapper>
        {/* <Message>To start a new game click 'Begin':</Message> */}
        <BtnLink
          to="/game"
          onClick={() => newGame({ name: this.props.name })}
        >Start a new game!
        </BtnLink>
        <Message>To join an existing game enter the game Id and click 'Join':</Message>
        <form>
          <Input
            onChange={e => this.onChangeUpdateGameId(e)}
            type="text"
            placeholder="Enter game id"
            value={this.state.gameId}
          />
          <BtnLink
            to="/game"
            onClick={e => this.onClickJoinGame(e, this.state.gameId, this.props.name)}
          >Join!
          </BtnLink>
        </form>
      </Wrapper>
    );
  }
}

Home.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Home;
