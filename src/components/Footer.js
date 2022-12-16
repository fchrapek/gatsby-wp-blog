import React from 'react';
import styled from 'styled-components';

const FooterStyles = styled.footer`
  margin-top: 4rem;
  text-align: center;
`

export default function Footer() {
  return (
    <FooterStyles>
      <p>Happy Spiders &copy; {new Date().getFullYear()}</p>
    </FooterStyles>
  );
}
