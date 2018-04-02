import React from 'react';
import { TableHead, TableBody, TableHeader, TableDim } from './Table';

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
        <TableHead>
          <tr>
            <TableHeader>{this.props.name}</TableHeader>
            <TableHeader>{this.props.opponent}</TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          <tr>
            <TableDim>{this.props.userWins}</TableDim>
            <TableDim>{this.props.opponentWins}</TableDim>
          </tr>
        </TableBody>
      </table>
    );
  }
}

export default Scoreboard;
