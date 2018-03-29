import React from 'react';

import Input from '../../components/Input';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
        <form>
          <Input onChange={(e) => this.onChangeUpdateName(e)} type='text' placeholder='Enter name' value={this.state.name}  />
          <button
            className='btn-primary'
            onClick={this.props.newGame}
            >Start Game
          </button>
        </form>
        <h3>Join Existing Game</h3>
        <form>
          <Input onChange={(e) => this.onChangeUpdateGameId(e)} type='text' placeholder='Enter game id' value={this.state.gameId}  />
          <button
            onClick={(e) => { this.props.joinGame(e, this.state.gameId) }}
            >Join Game
          </button>
        </form>
      </div>
    );
  }
}

export default Home;
