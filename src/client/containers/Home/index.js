import React from 'react';

import Input from '../../components/Input';
import BtnLink from './Link';
import LinkBtn from '../../components/Link';
import { newGame, joinGame } from '../../socket';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: '',
    }
  }

  onChangeUpdateName(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }

  onChangeUpdateGameId(e) {
    e.preventDefault();
    this.setState({
      gameId: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h3>Start New Game</h3>
          <LinkBtn
            to='/game'
            className='btn-primary'
            onClick={(name) => newGame( {name: this.props.name} )}
          >Start Game
          </LinkBtn>
        <h3>Join Existing Game</h3>
        <form>
          <Input 
            onChange={(e) => this.onChangeUpdateGameId(e)}
            type='text' placeholder='Enter game id'
            value={this.state.gameId}
          />
          <LinkBtn
            to='/game'
            className='btn-primary'
            onClick={(gameId, name) => { joinGame({ gameId: this.state.gameId, name: this.props.name} ) }}
            >Join Game
          </LinkBtn>
        </form>
      </div>
    );
  }
}

export default Home;
