import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
// import Logo from './Logo';

const NavStyles = styled.nav`
  ul {
    margin: 0;
    padding: 0;
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          Tu moze bedzie nawigacja
        </li>
      </ul>
    </NavStyles>
  );
}
