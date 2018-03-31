import styled from 'styled-components'
import { Link } from 'react-router-dom';

const LinkBtn = styled(Link)`
  font-family: Garamond;
  font-size: 18px;
  color: white;
  margin: 10px;
  padding: 8px 15px 8px 15px;
  text-decoration: none;
  background-color: blue;
  border-radius: 5px;

  &hover {
    text-decoration: none;
  } 
`;

export default LinkBtn;
