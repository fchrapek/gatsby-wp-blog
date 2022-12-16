import React from 'react';
import styled from 'styled-components';
import { breakpoint } from "../styles/BreakPoints";

const LogoStyles = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-color: var(--c-mint-200);

  @media ${breakpoint.md} { 
    width: 16rem;
    height: 16rem;
  }
`;

export default function Logo() {
  return (
    <LogoStyles className="logo">
    </LogoStyles>
  );
}
