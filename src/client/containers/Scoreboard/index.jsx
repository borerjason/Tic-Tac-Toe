import React from 'react';
import PropTypes from 'prop-types';

import { TableHead, TableBody, TableHeader, TableDim } from './Table';

const Scoreboard = props => (
  <table>
    <TableHead>
      <tr>
        <TableHeader>{props.name}</TableHeader>
        <TableHeader>{props.opponent}</TableHeader>
      </tr>
    </TableHead>
    <TableBody>
      <tr>
        <TableDim>{props.userWins}</TableDim>
        <TableDim>{props.opponentWins}</TableDim>
      </tr>
    </TableBody>
  </table>
);

Scoreboard.propTypes = {
  name: PropTypes.string.isRequired,
  opponent: PropTypes.string.isRequired,
  userWins: PropTypes.number.isRequired,
  opponentWins: PropTypes.number.isRequired,
};

export default Scoreboard;
