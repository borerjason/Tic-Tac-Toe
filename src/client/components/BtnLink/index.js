import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BtnLink = styled(Link)`
  width: 80px;
  height: 40px;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  text-decoration: none;
  background-color: #25b3b6;
  padding: 8px 15px 8px 15px;
  
  &:focus {
    outline: none;
    text-decoration: none;
    background-color: #2bd5d8;
  }

  &:hover {
    color: #ffffff; 
    text-decoration: none;
    background-color: #2bd5d8;
  }
`;

export default BtnLink;