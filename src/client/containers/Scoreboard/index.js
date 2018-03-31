import React from 'react';

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userWins: 0,
      opponentWins: 0,
    }
  }
  render () {
    return (
      <table>
        <thead>
          <tr>
            <th>{this.props.name}</th>
            <th>{this.props.opponent}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.props.userWins}</td>
            <td>{this.props.opponentWins}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Scoreboard;
