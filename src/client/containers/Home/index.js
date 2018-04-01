import React from 'react';

import { Message, Wrapper, BtnLink, Input} from '../../components';
import { newGame, joinGame } from '../../socket';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: '',
    }
  }

  onChangeUpdateGameId(e) {
    this.setState({
      gameId: e.target.value
    });
  }

  onClickJoinGame(e, gameId, name) {
    if (this.state.gameId.length > 0) {
      joinGame({ gameId: this.state.gameId, name: this.props.name })
    } else {
      e.preventDefault();
      alert('Please enter game id to join game');
    }
  }

  render() {
    return (
      <Wrapper>
        <Message>To start a new game click 'Begin':</Message>
          <BtnLink
            to='/game'
            onClick={(name) => newGame( {name: this.props.name} )}
          >Begin!
          </BtnLink>
        <Message>To join an existing game enter the game Id and click 'Join':</Message>
        <form>
          <Input 
            onChange={(e) => this.onChangeUpdateGameId(e)}
            type='text' placeholder='Enter game id'
            value={this.state.gameId}
          />
          <BtnLink
            to='/game'
            onClick={(e, gameId, name) => this.onClickJoinGame(e, this.state.gameId, this.props.name)}
            >Join!
          </BtnLink>
        </form>
      </Wrapper>
    );
  }
}

export default Home;
