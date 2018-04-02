import React from 'react';
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

export default Scoreboard;
